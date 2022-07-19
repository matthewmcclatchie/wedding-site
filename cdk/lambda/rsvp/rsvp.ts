import { SNS } from "aws-sdk"
import { APIGatewayProxyHandler, SNSMessage } from "aws-lambda"
import { GoogleSpreadsheet } from "google-spreadsheet"

const ALLOWED_ORIGINS = [
  "http://localhost:3000",
  "https://d15bylhfejzrvc.cloudfront.net",
  "https://stephandmattswedding.co.uk",
] as const
const REGION = "eu-west-2"
const DOCUMENT_ID = "1zuAheoPzuwHer7MixlwCQy00ngz48Wfjar07vVbhCqs"
const SHEET_ID = "1532144707"
const SNS_TOPIC_ARN =
  "arn:aws:sns:eu-west-2:139120963390:WeddingSiteStack-WeddingSiteRsvpTopic818B3EBA-17HRCQ1J9X069"

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

const publishToTopic = async (
  params: Pick<SNSMessage, "Subject" | "Message" | "TopicArn">
) => {
  const sns = new SNS({ apiVersion: "2010-03-31", region: REGION })
  const data = await sns.publish(params).promise()

  console.log("MessageID: " + data.MessageId)
}

const sendResponse = (origin: typeof ALLOWED_ORIGINS[number]) => {
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": origin,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message: "RSVP - Success" }),
  }
}

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    console.log("Start rsvpHandler lambda")
    const origin = ALLOWED_ORIGINS.find(
      (origin) => origin === event.headers.origin
    )

    if (!origin) {
      console.log(`Unauthorised origin of ${event.headers.origin}`)
      return {
        statusCode: 401,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify("Unauthorised request"),
      }
    }

    if (!process.env.CLIENT_EMAIL || !process.env.PRIVATE_KEY) {
      console.log("Missing API environment variables")
      return {
        statusCode: 400,
        headers: {
          "Access-Control-Allow-Origin": origin,
          "Content-Type": "application/json",
        },
        body: JSON.stringify("Missing API environment variables"),
      }
    }

    const { body } = event

    if (!body) {
      console.log("Missing request body")
      return {
        statusCode: 400,
        headers: {
          "Access-Control-Allow-Origin": origin,
          "Content-Type": "application/json",
        },
        body: JSON.stringify("Missing request body"),
      }
    }

    console.log("Instantiating GoogleSpreadsheet")
    const doc = new GoogleSpreadsheet(DOCUMENT_ID)

    console.log("Setting up GoogleSpreadsheet auth")
    await doc.useServiceAccountAuth({
      client_email: process.env.CLIENT_EMAIL!,
      private_key: process.env.PRIVATE_KEY!.replace(/\\n/g, "\n"),
    })

    console.log("Loading document info")
    await doc.loadInfo()

    const sheet = doc.sheetsById[SHEET_ID]

    const parsed = JSON.parse(body)

    console.log("Start adding entries to spreadsheet")
    for (const entry of parsed) {
      const { name, email, attending, song, meal, dietary } = entry
      console.table({
        name,
        email,
        attending,
        song,
        meal,
        dietary,
      })
      const requiredFields = { name, email }
      const emptyRequiredFields = getAnyEmptyRequiredFields(requiredFields)

      if (emptyRequiredFields.length) {
        console.log(
          `Missing ${emptyRequiredFields.join(", ")} from request body`
        )
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

      const now = new Date()

      await sheet.addRow({
        name,
        email,
        attending,
        song,
        meal,
        dietary,
        date: now.toISOString().slice(0, 10),
      })
    }

    console.log("Finished adding entries to spreadsheet")
    console.log("Define SNS parameters")

    const snsParams = {
      Subject: "Somebody has filled out the RSVP form!",
      Message: `${parsed[0].name} filled out the RSVP form and added ${
        parsed.length
      } ${parsed.length > 1 ? "entries" : "entry"}. `,
      TopicArn: SNS_TOPIC_ARN,
    }

    console.log("Publish to SNS")
    await publishToTopic(snsParams)

    console.log("Send lambda response")
    return sendResponse(origin)
  } catch (error) {
    throw new Error(JSON.stringify(error))
  }
}
