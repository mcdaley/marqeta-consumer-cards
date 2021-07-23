//-----------------------------------------------------------------------------
// src/routes/v1/user.routes.ts
//-----------------------------------------------------------------------------
import { Router, Request, Response }      from 'express'

import logger                             from '../../config/winston'

const router = Router()

/**
 * @route GET /api/v1/users
 */
router.get(`/v1/users`, (req: Request, res: Response) => {
  logger.info(`POST /api/v1/users`)

  const response = {
    message: `Dude, fetched a list of all the users`
  }
  res.status(200).send(response)
})

// Export the organizations routes
export default router