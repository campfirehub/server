import "dotenv/config";

export default {
  server: {
    port: 3000,
    cors: {
      origin: "*",
    },
  },
  database: {
    connection_string: process.env.MONGO_CONNECTION_STR,
  },
  auth: {
    jwt_secret: process.env.JWT_SECRET,
    expiresIn: "2h",
  },
};
