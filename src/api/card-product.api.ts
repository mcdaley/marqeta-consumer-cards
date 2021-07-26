//-----------------------------------------------------------------------------
// src/api/card-product.api.ts
//-----------------------------------------------------------------------------
import AppConfig  from '../config/app-config'
const  appConfig  = AppConfig.getInstance()

import axios                        from 'axios'

import logger                       from '../config/winston'
import { base64EncodeCredentials }  from '../utils/utils'

/**
 * 
 */
class CardProductAPIs {
  public static baseUrl = `https://sandbox-api.marqeta.com/v3`

  public static buildHeader() {
    // Use the app and admin tokens to make the call.
    const base64AuthToken: string = base64EncodeCredentials(
      appConfig.APP_TOKEN, 
      appConfig.ADMIN_TOKEN
    )

    const header  = {
      'Content-Type':   `application/json`,
      'Accept':         `application/json`,
      'Authorization':  `Basic ${base64AuthToken}`,
    }

    return header
  }

  /**
   * Fetch list of all the card products.
   * @returns 
   */
  public static find() {
    logger.debug(`CardProductAPIs::find()`)

    return new Promise( async (resolve, reject) => {
      try {
        const url     = `${this.baseUrl}/cardproducts`
        const config  = {
          headers:  this.buildHeader()
        }
        logger.debug(`URL= %s, config= %o`, url, config)

        const response  = await axios.get(url, config)
        const { data }  = response

        logger.info(`Fetched card products, data= %o`, data)
        resolve(data)
      }
      catch(error) {
        logger.error(`Failed to fetch list of card products, error= %o`, error)
        reject(error)
      }
    })
  }
}

// Export CardProductsAPI
export default CardProductAPIs