//-----------------------------------------------------------------------------
// index.ts
//-----------------------------------------------------------------------------
import './config/config'
import express, { Application }   from 'express'
import { Server }                 from 'node:http'

import logger                     from './config/winston'
import MongoDAO                   from './config/mongo-dao'
import users                      from './routes/v1/user.routes'
import cardProducts               from './routes/v1/card-product.routes'

/**
 * Shutdown the express server.
 */
function handleShutdownGracefully() {
  server.close(() => {
    logger.info(`Shutting down the express server`)
    process.exit(0)
  })
}

/**
 * main()
 */
 const app: Application  = express()

 app.use(express.json())

 // Routes
app.use(`/api`, users)
app.use(`/api`, cardProducts)

// Connect to MongoDB and start the Express server
let   server: Server
const mongoClient = new MongoDAO()
mongoClient.connect()
  .then( () => {
    // Start the server after connecting to the DB
    const PORT: number | string = process.env.PORT || 4000
    server = app.listen(PORT, () => {
      logger.info(`TS-Mongo-Express app running on port ${PORT}`)
    })
  })
  .catch( (error) => {
    // Exit the app if cannot connect to DB
    logger.error(`Failed to connect to MongoDB`)
    logger.error(`Exiting the app...`)
    process.exit(-1)
  })

///////////////////////////////////////////////////////////////////////////////
// TODO: 07/23/2010
//  - TURNED OFF BECAUSE IT WASN'T WORKING.
///////////////////////////////////////////////////////////////////////////////
// Gracefully shutdown the express server
//* process.on("SIGINT",  handleShutdownGracefully)
//* process.on("SIGTERM", handleShutdownGracefully)
//* process.on("SIGHUP",  handleShutdownGracefully)

// Export the app
export { app }