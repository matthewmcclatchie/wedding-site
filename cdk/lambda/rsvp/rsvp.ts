import { APIGatewayProxyHandler } from "aws-lambda"
import { GoogleSpreadsheet } from "google-spreadsheet"

const ALLOWED_ORIGINS = [
  "http://localhost:3000",
  "https://d15bylhfejzrvc.cloudfront.net",
  "https://stephandmattswedding.co.uk",
]
const DOCUMENT_ID = "1zuAheoPzuwHer7MixlwCQy00ngz48Wfjar07vVbhCqs"
const SHEET_ID = "1532144707"

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
