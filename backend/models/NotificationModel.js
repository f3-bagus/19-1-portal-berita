import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Users from "./UserModels.js";

const { DataTypes } = Sequelize;

const Notifications = db.define('notifications', {
    notification_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    notification_text: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    is_read: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    freezeTableName: true
});

Users.hasMany(Notifications, { foreignKey: 'user_id' });

export default Notifications;
//notification model