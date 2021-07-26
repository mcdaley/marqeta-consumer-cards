//-----------------------------------------------------------------------------
// src/config/app-config.ts
//-----------------------------------------------------------------------------
import './config'

///////////////////////////////////////////////////////////////////////////////
// TODO: 07/26/2021
//  - ADD SUPPORT FOR DEFAULT VALUES
//  - ADD ERROR HANDLING FOR INVALID NUMBERS AND BOOLEANS
//  - SEE IF I CAN REFACTOR TO MOVE THE ENV VARIABLES INTO A DIFFERENT
//    CLASS, SO THE CONFIG OBJECT IS MORE REUSABLE AND THE setString,
//    setNumber, and setBoolean METHODS CAN BE TESTED.
///////////////////////////////////////////////////////////////////////////////

/**
 * @class AppConfig
 * 
 * Singleton class to load and store the apps configuration and verifies that
 * all the required and default parameters are set.
 */
export default class AppConfig {
  public  static instance: AppConfig

  // Environmental variables
  public  NODE_ENV      : string
  public  PORT          : number
  public  MONGODB_URI   : string
  public  APP_NAME      : string
  public  APP_TOKEN     : string
  public  ADMIN_TOKEN   : string
  
  /**
   * Set the environment variables
   */
  private constructor() {
    this.NODE_ENV     = this.setString(process.env.NODE_ENV)
    this.PORT         = this.setNumber(process.env.PORT)
    this.MONGODB_URI  = this.setString(process.env.MONGODB_URI)
    this.APP_NAME     = this.setString(process.env.APP_NAME)
    this.APP_TOKEN    = this.setString(process.env.APP_TOKEN)
    this.ADMIN_TOKEN  = this.setString(process.env.ADMIN_TOKEN)
  }

  /**
   * If the application's configuration has not been initialize then load
   * the environment variables and return the instance. Otherwise, return 
   * the previously initialized AppConfig instance.
   * 
   * @returns {AppConfig} - The application configuration
   */
  public static getInstance() {
    if (!AppConfig.instance) {
      AppConfig.instance = new AppConfig()
    }
    return AppConfig.instance
  }

  /**
   * Returns the value of the environment variable or exits the application
   * if the environment variable is not set.
   * 
   * @param   {string}  envVariable 
   * @returns {string}  Returns the value of the configuration paramter
   */
  private setVariable(envVariable: string | undefined) : string {
    // Exit if environment variable is not defined.
    if(!envVariable) {
      console.log(`[error] Failed to define variable`)
      console.log(`[error] Exiting...`)
      process.exit(-1)
    }

    // Return the value of the environment variable
    return <string>envVariable
  }

  /**
   * Returns the value of the environment variable or exits the application
   * if the environment variable is not set.
   * 
   * @param   {string}  envVariable 
   * @returns {string}  Returns the value of the configuration paramter
   */
   private setString(envVariable: string | undefined) : string {
    // Exit if environment variable is not defined.
    if(!envVariable) {
      console.log(`[error] Failed to define variable`)
      console.log(`[error] Exiting...`)
      process.exit(-1)
    }

    // Return the value of the environment variable
    return <string>envVariable
  }

  /**
   * 
   * @param envVariable 
   * @returns 
   */
  private setNumber(envVariable: string | undefined) : number {
    // Exit if environment variable is not defined.
    if(!envVariable) {
      console.log(`[error] Failed to define variable`)
      console.log(`[error] Exiting...`)
      process.exit(-1)
    }

    const  response = Number(<string>envVariable)
    return response
  }

  /**
   * 
   * @param envVariable 
   * @returns 
   */
  private setBoolean(envVariable: string | undefined) : boolean {
    // Exit if environment variable is not defined.
    if(!envVariable) {
      console.log(`[error] Failed to define variable`)
      console.log(`[error] Exiting...`)
      process.exit(-1)
    }

    let response: boolean = false

    if(envVariable.match(/true/i)) {
      response = true
    }
    else if(envVariable.match(/false/i)) {
      response = false
    }

    return response
  }
}