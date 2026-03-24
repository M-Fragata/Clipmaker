import { GoogleGenerativeAI } from "@google/generative-ai";


export class GeminiWidgetController {
    async create(req, res) {
        
        try {
            
            const { imageURL, apikey } = req.body
            
            const GEMINI_API_KEY = apikey || process.env.GEMINI_KEY
            
            if(!GEMINI_API_KEY) {
                return res.status(400).json({ error: "API key is required" })
            }

            const ai = new GoogleGenerativeAI(GEMINI_API_KEY)

            const model = ai.getGenerativeModel({ model: "gemini-3-flash-preview" })

            const prompt = `
                Role: You are a professional video editor specializing in viral content.
                Task: Analyze the transcription below and identify the most engaging, funny, or surprising segment.
                Constraints:
                1. Duration: Minimum 30 seconds, Maximum 60 seconds.
                2. Format: Return ONLY the start and end string for Cloudinary. Format: so_<start_seconds>,eo_<end_seconds>
                3. Examples: "so_10,eo_20" or "so_12.5,eo_45.2"
                4. CRITICAL: Do not use markdown, do not use quotes, do not explain. Return ONLY the raw string.

                Transcription:
                ${imageURL}
            `
                
    
            const result = await model.generateContent([prompt])
    
            const response = result.response
            const text = response.text()

            return res.status(201).json({success: true, viralMoment: text})

        } catch (error) {
            console.error("Erro no Gemini:", error);
            return res.status(500).json({ error: "Falha ao processar com a IA" });
        }

    }
}