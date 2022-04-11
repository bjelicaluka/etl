import * as config from 'config';

const isProduction: boolean = process.env.NODE_ENV === 'production';
export const CONFIGURATION = {
  PRODUCTION: isProduction,
  DEBUG: !isProduction,
}

export const DOC_PATH = process.env.DOC_PATH ? `/${process.env.DOC_PATH}` : '/explorer';

export const LOGGING = true;

export const REDIS_CONFIG = {
  ...config.redis,
  password: process.env.REDIS_PASSWORD || "",
  retry_strategy: (options) => {
    LOGGING && console.log("No connection to the Redis server. Attempting to recconect.");
    return Math.min(options.attempt * 100, 3000);
  },
};

export const API_INFO = {
  API_PROTOCOL: process.env.API_PROTOCOL || 'http',
  API_HOSTNAME: process.env.API_HOSTNAME || 'localhost',
  API_PORT: process.env.API_PORT || 80,
  API_PREFIX: process.env.API_PREFIX ? `/${process.env.API_PREFIX}` : '/'
}

export const DOC_INFO = {
  EXPOSE_SWAGGER_UI: process.env.EXPOSE_SWAGGER_UI === 'true',
  EXPOSE_API_DOCS: process.env.EXPOSE_API_DOCS === 'true',
}

export const AMQP_CONFIG = {
  ...config.amqp,
  username: process.env.AMQP_USERNAME,
  password: process.env.AMQP_PASSWORD,
}