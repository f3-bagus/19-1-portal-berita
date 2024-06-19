import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Users from "./UserModels.js";
import News from "./NewsModels.js";
const { DataTypes } = Sequelize;

const Comments = db.define(
  "comments",
  {
    comment_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    comment_text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

Users.hasMany(Comments, { foreignKey: "user_id" });
Comments.belongsTo(Users, { foreignKey: "user_id" });

News.hasMany(Comments, { foreignKey: "news_id" });
export default Comments;
