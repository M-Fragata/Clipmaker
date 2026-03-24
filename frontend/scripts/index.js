import { sendGemini } from "./sendGemini.js"
import { waitForTranscription } from "./waitForTranscription.js"

const cloudName = "drkymypjb"
const uploadPreset = "upload_nlw"


document.querySelector('#upload_widget').addEventListener('click', () => {
    myWidget.open()
})

const myWidget = cloudinary.createUploadWidget({
    cloudName: cloudName,
    uploadPreset: uploadPreset
}, async (error, result) => {
    if (!error && result && result.event === "success") {

        const data = result.info

        console.log('Done! Here is the image info: ', data);

        const url = await waitForTranscription(data, cloudName)

        if (!url) return alert("URL not found")

        const viralMoment = await sendGemini(url)
        const viralMomentURL = `https://res.cloudinary.com/${cloudName}/${data.resource_type
            }/upload/${viralMoment.viralMoment}/${data.public_id}.mp4`

        console.log(viralMomentURL)

    }
}
)
