export default () => ({
    url: process.env.URL,
    port: parseInt(process.env.PORT, 10) || 8080,
    secret: process.env.JWTKEY,
    expireIn: process.env.TOKEN_EXPIRATION,
    database: {
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10) || 5432,
      dbname: process.env.DB_NAME,
      dbuser: process.env.DB_USER,
      dbpassword: process.env.DB_PASSWARD,
      dbdialect: process.env.DB_DIALECT
    }
  });