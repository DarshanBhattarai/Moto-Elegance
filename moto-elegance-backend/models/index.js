const dbConfig = require("../config/db.config");
const Sequelize = require("sequelize");

console.log("Initializing database connection with config:", {
  database: dbConfig.DB,
  user: dbConfig.USER,
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  dialect: dbConfig.DIALECT,
});

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  dialect: dbConfig.DIALECT,
  pool: {
    max: 10, // Maximum number of connection in pool
    min: 0, // Minimum number of connection in pool
    acquire: 30000, // The maximum time, in milliseconds, that pool will try to get connection before throwing error
    idle: 10000, // The maximum time, in milliseconds, that a connection can be idle before being released
  },
  logging: (msg) => console.log(`[Database] ${msg}`),
  retry: {
    max: 3,
    match: [
      /SequelizeConnectionError/,
      /SequelizeConnectionRefusedError/,
      /SequelizeHostNotFoundError/,
      /SequelizeHostNotReachableError/,
      /SequelizeInvalidConnectionError/,
      /SequelizeConnectionTimedOutError/,
      /TimeoutError/,
      /ECONNRESET/,
      /ETIMEDOUT/,
    ],
  },
});

// Test the connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Database connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
    // Retry connection after 5 seconds
    setTimeout(() => {
      console.log("Retrying database connection...");
      sequelize
        .authenticate()
        .then(() => console.log("Database connection established after retry."))
        .catch((err) => console.error("Failed to connect after retry:", err));
    }, 5000);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Models
db.Car = require("./car.model.js")(sequelize, Sequelize);
db.Brand = require("./brand.model.js")(sequelize, Sequelize);
db.User = require("./user.model.js")(sequelize, Sequelize);
db.Review = require("./review.js")(sequelize, Sequelize);

// Associations
db.Brand.hasMany(db.Car, { as: "cars" });
db.Car.belongsTo(db.Brand, {
  foreignKey: "brandId",
  as: "brand",
});

// Review associations
db.User.hasMany(db.Review, { as: "reviews", foreignKey: "userId" });
db.Car.hasMany(db.Review, { as: "reviews", foreignKey: "carId" });
db.Review.belongsTo(db.User, { as: "user", foreignKey: "userId" });
db.Review.belongsTo(db.Car, { as: "car", foreignKey: "carId" });

module.exports = db;
