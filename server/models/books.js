module.exports = (sequelize, DataTypes) => {
  const Books = sequelize.define("Books", {
    book_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    publication_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });

  // Define associations
  Books.associate = (models) => {
    // One-to-One relationship with Books
    Books.belongsTo(models.Authors, {
      foreignKey: "author_id", // This will add author_id as a foreign key in Books table
      onDelete: "CASCADE", // Optional: Cascade delete if an author is deleted
      // onUpdate: 'CASCADE' // If author_id is updated, update profile
    });
    Books.belongsTo(models.Genres, {
      foreignKey: "genre_id", // This will add author_id as a foreign key in Books table
      onDelete: "CASCADE", // Optional: Cascade delete if an author is deleted
      // onUpdate: 'CASCADE' // If author_id is updated, update profile
    });
  };

  return Books;
};
