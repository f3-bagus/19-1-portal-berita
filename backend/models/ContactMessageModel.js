import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Users from "./UserModels.js";
const { DataTypes } = Sequelize;

const ContactMessages = db.define('contact_messages', {
    message_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    subject: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    message_text: {
        type: DataTypes.TEXT,
        allowNull: false
    },

    status: {
        type: DataTypes.STRING(225),
        allowNull: false
    }
}, {
    freezeTableName: true
});
Users.hasMany(ContactMessages, { foreignKey: 'user_id' });
ContactMessages.belongsTo(Users, { foreignKey: 'user_id' });
export default ContactMessages;
//contactmessage model