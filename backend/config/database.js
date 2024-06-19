import { Sequelize } from "sequelize";


const db = new Sequelize("qFPVp1VCsAWYmj4H", "vV9e3ORVpZ2G3LLk", "272OQY5AHUhfcnwK", {
    host: "educalab.id",
    port: "3307",
    dialect: "mysql"
});


// const db = new Sequelize("qFPVp1VCsAWYmj4H", "vV9e3ORVpZ2G3LLk", "272OQY5AHUhfcnwK", {
//     host: "educalab.id",
//     port: "3307",
//     dialect: "mysql"
// });

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
