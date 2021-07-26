//-----------------------------------------------------------------------------
// ./src/config/winston.js
//-----------------------------------------------------------------------------
import AppConfig  from './app-config'
const  appConfig  = AppConfig.getInstance()

import appRoot              from 'app-root-path'
import winston, { format }  from 'winston'

const { combine, timestamp, label, printf } = format
const loggerAppFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${level}] [${label}]: ${message}`;
});

// Configure loggin options
var options = {
  file: {
    level:            'debug',
    filename:         `${appRoot}/logs/${appConfig.NODE_ENV}.log`,
    handleExceptions: true,
    json:             true,
    maxsize:          5242880, // 5MB
    maxFiles:         5,
    colorize:         false,
    format:           combine(
      label({ label: appConfig.APP_NAME }),
      timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
      }),
      winston.format.splat(),
      winston.format.json(),
      loggerAppFormat,
    ),
  },
  console: {
    level:            'debug',
    handleExceptions: true,
    json:             false,
    colorize:         true,
    format:           combine(
      label({ label: appConfig.APP_NAME }),
      timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
      }),
      winston.format.colorize(),
      winston.format.splat(),
      winston.format.json(),
      loggerAppFormat,
    )
  },
}

const logger = winston.createLogger({
  transports: [
    new winston.transports.File(options.file),
    //* new winston.transports.Console(options.console)
  ],
  exitOnError: false, // do not exit on handled exceptions
});

// If in development mode then add the console output.
if (appConfig.NODE_ENV === 'development') {
  logger.add(new winston.transports.Console(options.console))
}

// create a stream object with a 'write' function that will be used by `morgan`
//* logger.stream = {
//*   write: function(message, encoding) {
//*     // use the 'info' log level so the output will be picked up by both transports (file and console)
//*     logger.info(message);
//*   },
//* };

export default logger