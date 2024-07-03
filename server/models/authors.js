//const Books = require("./books");

module.exports = (sequelize, DataTypes) => {
  const Authors = sequelize.define("Authors", {
    author_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    biography: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });

  // Define associations
  Authors.associate = (models) => {
    // One-to-many relationship with Books
    Authors.hasMany(models.Books, {
      foreignKey: "author_id", // This will add author_id as a foreign key in Books table
      onDelete: "CASCADE", // Optional: Cascade delete if an author is deleted
      // onUpdate: 'CASCADE' // If author_id is updated, update profile
    });
  };

  return Authors;
};