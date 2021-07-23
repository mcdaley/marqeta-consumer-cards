//-----------------------------------------------------------------------------
// src/utils/utils.ts
//-----------------------------------------------------------------------------
import logger     from '../config/winston'

/**
 * Utility to combine the username and password into a base64 string that
 * is used for the basic HTTP Authorization.
 * @param   {string} username 
 * @param   {string} password 
 * @returns 
 */
export function base64EncodeCredentials(username: string, password: string): string {
  const  credentials       = `${username}:${password}`
  const  buffer            = Buffer.from(credentials, 'utf8')
  const  base64Credentials = buffer.toString('base64')

  return base64Credentials
}