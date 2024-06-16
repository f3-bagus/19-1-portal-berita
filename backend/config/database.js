import { Sequelize } from "sequelize";

const db = new Sequelize("sql12713709", "ql12713709", "4q3rtyVSHv", {
    host: "sql12.freemysqlhosting.net",
    dialect: "mysql"
});

const connectDB = async () => {
    try {
        await db.authenticate();
        console.log("Koneksi Ke Database MySQL Berhasil.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
};

connectDB();

export default db;
