module.exports = (sequelize, Sequelize) => {
  const Brand = sequelize.define(
    "brand",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      logo: {
        type: Sequelize.TEXT,
      },
      backgroundImage: {
        type: Sequelize.TEXT,
      },
      popular: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      sponsored: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      description: {
        type: Sequelize.TEXT,
      },
    },
    {
      timestamps: true,
    }
  );

  return Brand;
};
