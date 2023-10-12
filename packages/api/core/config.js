require('dotenv/config');

const connectionConfig = {
  host: process.env.MYSQLX_HOST,
  password: process.env.MYSQLX_PASSWORD,
  port: parseInt(process.env.MYSQLX_PORT, 10),
  schema: process.env.MYSQLX_SCHEMA,
  tls: { enabled: process.env.MYSQLX_TLS !== false },
  user: process.env.MYSQLX_USER
};

const collectionConfig = {
  collection: process.env.MYSQLX_COLLECTION,
};

module.exports = {
  connectionConfig,
  collectionConfig
};
