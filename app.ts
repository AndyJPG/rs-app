import cors from "cors"
import express from "express"
import * as http from "http"
import VenuesRoutes from "./src/venues/venues.routes.config"

const app: express.Application = express()
const api: express.Application = express()
const server: http.Server = http.createServer(app)
const port = 4040

// Middleware to parse all incoming requests as JSON
app.use(express.json())

// Middleware to allow cross-origin requests
app.use(cors())

new VenuesRoutes(api)

// app mounted path
app.use("/venue-api", api)
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.status(500).send(err)
})

// Simple testing routes
const runningMessage = `Server running at http://localhost:${port}`
app.get("/", (req: express.Request, res: express.Response) => {
  res.status(200).send(runningMessage)
})

// Start server
server.listen(port, () => {
  console.log(runningMessage)
})