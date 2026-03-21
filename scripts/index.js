const cloudName = "drkymypjb"
const uploadPreset = "upload_nlw"


const button = document.querySelector('#upload_widget')

button.addEventListener('click', () => {
    myWidget.open()
})

const myWidget = cloudinary.createUploadWidget({
    cloudName: cloudName,
    uploadPreset: uploadPreset
}, (error, result) => {
    if (!error && result && result.event === "success") {
        console.log('Done! Here is the image info: ', result.info);
    }
}
)
