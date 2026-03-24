import { Router } from "express";
import { geminiWidgetRoutes } from "./GeminiWidgetRoute.js";

const routes = Router()

routes.use("/clipmaker", geminiWidgetRoutes)

export { routes }