import { SES } from "aws-sdk"
import { APIGatewayProxyHandler } from "aws-lambda"

const ALLOWED_ORIGINS = [
  "http://localhost:3000",
  "https://d15bylhfejzrvc.cloudfront.net",
  "https://stephandmattswedding.co.uk",
] as const
const REGION = "eu-west-2"
const EMAIL_TO = "mattandstephgetwed@gmail.com"
const EMAIL_FROM = "hello@stephandmattswedding.co.uk"

const getAnyEmptyRequiredFields = (
  fields: Record<string, string>
): string[] => {
  const fieldEntries = Object.entries(fields)

  return fieldEntries.reduce<string[]>((acc, curr) => {
    const [key, value] = curr

    if (!value) {
      acc.push(key)
    }

    return acc
  }, [])
}

interface Email {
  name: string
  email: string
  message: string
}

const getTextContent = ({ name, email, message }: Email) => {
  return `
    Sent from: ${name} <${email}>
    
    Message: ${message}
  `
}

const sendEmailParams = ({ name, email, message }: Email) => {
  return {
    Destination: {
      ToAddresses: [EMAIL_TO],
    },
    Message: {
      Body: {
        Text: {
          Charset: "UTF-8",
          Data: getTextContent({ name, email, message }),
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: `New message from website`,
      },
    },
    Source: EMAIL_FROM,
  }
}

const sendEmail = async (
  { name, email, message }: Email,
  origin: typeof ALLOWED_ORIGINS[number]
) => {
  const ses = new SES({ region: REGION })
  await ses.sendEmail(sendEmailParams({ name, email, message })).promise()

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": origin,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message: "Email sent successfully 🎉🎉🎉" }),
  }
}

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    const origin = ALLOWED_ORIGINS.find(
      (origin) => origin === event.headers.origin
    )

    if (!origin) {
      return {
        statusCode: 401,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify("Unauthorised request"),
      }
    }

    const { body } = event

    if (!body) {
      return {
        statusCode: 400,
        headers: {
          "Access-Control-Allow-Origin": origin,
          "Content-Type": "application/json",
        },
        body: JSON.stringify("Missing request body"),
      }
    }

    const parsed = JSON.parse(body)

    const { name, email, message } = parsed

    const requiredFields = { name, email }
    const emptyRequiredFields = getAnyEmptyRequiredFields(requiredFields)

    if (emptyRequiredFields.length) {
      return {
        statusCode: 400,
        headers: {
          "Access-Control-Allow-Origin": origin,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          `Missing ${emptyRequiredFields.join(", ")} from request body`
        ),
      }
    }

    return await sendEmail({ name, email, message }, origin)
  } catch (error) {
    throw new Error(JSON.stringify(error))
  }
}
