//-----------------------------------------------------------------------------
// src/routes/v1/card-product.routes.ts
//-----------------------------------------------------------------------------
import { Router, Request, Response }      from 'express'

import logger                             from '../../config/winston'
import CardProductAPIs                    from '../../api/card-product.api'

const router = Router()

/**
 * @route GET /api/v1/card-products
 */
router.get(`/v1/card-products`, async (req: Request, res: Response) => {
  logger.info(`GET /api/v1/card-products`)

  try {
    const result = await CardProductAPIs.find()
    logger.debug(`List of card products= %o`, result)

    res.status(200).send(result)
  }
  catch(error) {
    logger.error(`Failed to fetch card products, error= %o`, error)
    res.status(400).send({message: `Oops, something wen wrong`})
  }  
})

// Export the organizations routes
export default router