import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;
const Users = db.define('users', {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    username: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 100]
        }
    },
    email: {
        type: DataTypes.STRING(110),
        allowNull: false,
        validate: {
            notEmpty: true,
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: true,
        validate: {
            notEmpty: false
        }
    },
    role: {
        values: ["admin", "user", "author"],
        type: DataTypes.STRING(225),
        allowNull: false,
        validate: {
            notEmpty: true,
            isIn: {
                args: [["admin", "user","author"]],
                msg: "Invalid role"
            }
        }
    },

    isGoogleUser: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    
    status: {
        type: DataTypes.STRING(225),
        allowNull: false,
        defaultValue: "active",
    }
}, {
    freezeTableName: true
});

export default Users
//user model