module.exports = (sequelize, DataTypes) => {
  const Genres = sequelize.define("Genres", {
    genre_id: {
      type: DataTypes.INTEGER,
      //defaultValue: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    genre_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  // Define associations
  Genres.associate = (models) => {
    // One-to-many relationship with Books
    Genres.hasMany(models.Books, {
      foreignKey: "genre_id", // This will add genre_id as a foreign key in Books table
      onDelete: "CASCADE", // Optional: Cascade delete if an genre is deleted
    });
  };
  return Genres;
};
