import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Users from "./UserModels.js";

const { DataTypes } = Sequelize;

const News = db.define(
  "news",
  {
    news_id: {
      type: DataTypes.INTEGER(11),
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
      validate: {
        notEmpty: true,
      },
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 100],
      },
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    categories_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },

    image_url: {
      type: DataTypes.CHAR(255),
      allowNull: true, // Allow null if image_url is optional
      validate: {
        notEmpty: {
          msg: "Image URL cannot be empty", // Custom error message
        },
        isUrl: true, // Ensures the value is a valid URL
      },
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "draft",
      validate: {
        isIn: [["draft", "published", "deleted"]],
      },
    },
    author_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    freezeTableName: true,
  }
);

// Define associations
News.belongsTo(Users, { as: "author", foreignKey: "author_id" });
export default News;
//news model
