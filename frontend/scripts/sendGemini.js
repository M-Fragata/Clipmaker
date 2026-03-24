const serverURL = "http://localhost:3333"

export async function sendGemini(url) {

    try {

        const response = await fetch(`${serverURL}/clipmaker`, {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ imageURL: url })
        })

        if (!response.ok) {
            throw new Error(`Erro no servidor: ${response.status}`)
        }

        const data = await response.json()
        console.log("Resposta do Gemini recebida:", data)
        
        return data

    } catch (error) {

        console.error("Erro detalhado:", error)
        alert("Falha ao buscar no Gemini. Verifique o console do servidor.")

    }
}