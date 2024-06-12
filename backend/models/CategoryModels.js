import { Sequelize } from "sequelize";
import db from "../config/database.js";
import News from "./NewsModels.js";

const { DataTypes } = Sequelize;

const Categories = db.define('categories', {
    categories_id: {
        type: DataTypes.INTEGER(11),
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        validate: {
            notEmpty: true
        }
    },
    categories_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 100]
        }
    },
}, {
    freezeTableName: true,
});


Categories.hasMany(News, { foreignKey: 'categories_id' });
export default Categories;
//category model