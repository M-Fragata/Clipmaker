import { Router } from "express";
import { GeminiWidgetController } from "../controller/GeminiWidgetController.js"

const geminiWidgetRoutes = Router()

const geminiWidgetController = new GeminiWidgetController

geminiWidgetRoutes.post("/", geminiWidgetController.create)

export { geminiWidgetRoutes }