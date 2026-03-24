export async function waitForTranscription(resultado, cloudName) {

    const maxAttempts = 30
    const delay = 2000

    let URL = ""

    for (let attepmpt = 1; attepmpt <= maxAttempts; attepmpt++) {
        const url = `https://res.cloudinary.com/${cloudName}/${resultado.resource_type
            }/upload/v${Date.now()}/${resultado.public_id}`

        try {

            console.log(`Tentativa ${attepmpt}/${maxAttempts}`)

            const response = await fetch(url)

            if (response.ok) {
                console.log(`Transcrição encontrada! ${url}`)
                return URL = url
            }

        } catch (error) {
            console.log(`Tentativa ${attepmpt} falhou:`, error.message)
        }


        if (attepmpt < maxAttempts) {
            await new Promise(resolve => setTimeout(resolve, delay))
        }

    }

    console.log('Transcription not found')

}