import { google } from "googleapis"
import key from '../../../keyDriver.json'

interface ConnectDriver {
  pdfName?: string,
}

export async function connectDriver({ pdfName }: ConnectDriver) {
  try {
    const auth = new google.auth.JWT(
      key.client_email,
      undefined,
      key.private_key,
      ['https://www.googleapis.com/auth/drive'],
      undefined
    )

    await auth.authorize()

    const driverService = google.drive({
      version: 'v3',
      auth
    })

    const fileMetaData = {
      name: `${pdfName}`,
      parents: ["15xagA2YJAxm5I-zC7WhipR38iKsfb9vJ"]
    }

    return {
      driverService,
      fileMetaData,
    }
  } catch (error) {
    console.log(error)
  }
}