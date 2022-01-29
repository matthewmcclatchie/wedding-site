import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda"

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  return new Promise((resolve, reject) => {
    resolve({
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify("RSVP - Success"),
    })
  })
}
