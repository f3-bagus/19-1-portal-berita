import { Sequelize } from "sequelize";
import db from "../config/database.js";
import News from "./NewsModels.js";
import Users from "./UserModels.js";
const { DataTypes } = Sequelize;

const SavedNews = db.define('saved_news', {
    saved_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    saved_at: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    freezeTableName: true
});


SavedNews.belongsTo(News, { foreignKey: 'news_id' });
Users.hasMany(SavedNews, { foreignKey: 'user_id' });
export default SavedNews;
//savednews model