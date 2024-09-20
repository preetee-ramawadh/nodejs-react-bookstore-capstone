module.exports = (sequelize, DataTypes) => {
  const Books = sequelize.define("Books", {
    book_id: {
      // type: DataTypes.UUID,
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "authors",
        key: "author_id",
      },
    },
    genre_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "genres",
        key: "genre_id",
      },
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    publication_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    image_url: {
      type: DataTypes.TEXT,
      defaultValue: "/images/books/imageunavailable.jpg",
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

  //Book.belongsTo(sequelize.models.Author, { foreignKey: "author_id" });
  //Book.belongsTo(sequelize.models.Genre, { foreignKey: "genre_id" });

  return Books;
};
