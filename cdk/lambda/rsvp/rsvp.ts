import * as AWS from "aws-sdk"
import { APIGatewayProxyHandler } from "aws-lambda"
import { GoogleSpreadsheet } from "google-spreadsheet"

AWS.config.update({ region: "eu-west-2" })

const ALLOWED_ORIGINS = [
  "http://localhost:3000",
  "https://d15bylhfejzrvc.cloudfront.net",
  "https://stephandmattswedding.co.uk",
]
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

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    const origin = ALLOWED_ORIGINS.find(
      (origin) => origin === event.headers.origin
    )

    if (!origin) {
      return {
        statusCode: 401,
        headers: {
          "Access-Control-Allow-Origin": origin ?? false,
          "Content-Type": "application/json",
        },
        body: JSON.stringify("Unauthorised request"),
      }
    }

    if (!process.env.CLIENT_EMAIL || !process.env.PRIVATE_KEY) {
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
      return {
        statusCode: 400,
        headers: {
          "Access-Control-Allow-Origin": origin,
          "Content-Type": "application/json",
        },
        body: JSON.stringify("Missing request body"),
      }
    }

    const doc = new GoogleSpreadsheet(DOCUMENT_ID)

    await doc.useServiceAccountAuth({
      client_email: process.env.CLIENT_EMAIL!,
      private_key: process.env.PRIVATE_KEY!.replace(/\\n/g, "\n"),
    })

    await doc.loadInfo()

    const sheet = doc.sheetsById[SHEET_ID]

    const parsed = JSON.parse(body)

    for (const entry of parsed) {
      const { name, email, attending, song, dietary, question } = entry
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

      await sheet.addRow({
        name,
        email,
      })
    }

    const snsParams = {
      Subject: "Somebody has filled out the RSVP form!",
      Message: `
        ${parsed[0].name} filled out the RSVP form.
        ${parsed.length} rows were added.
      `,
      TopicArn: SNS_TOPIC_ARN,
    }

    const publishPromise = new AWS.SNS({ apiVersion: "2010-03-31" })
      .publish(snsParams)
      .promise()

    publishPromise
      .then((data) => {
        console.log(
          `${snsParams.Message} sent to the topic ${snsParams.TopicArn}`
        )
        console.log("MessageID: " + data.MessageId)
      })
      .catch((err) => {
        console.error(err, err.stack)
      })

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": origin,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: "RSVP - Success", sheet: sheet.title }),
    }
  } catch (error) {
    throw new Error(JSON.stringify(error))
  }
}
