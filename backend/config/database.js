import { Sequelize } from "sequelize";

//Database CloudMysQl
// const db = new Sequelize("bvfaewkgltb4dxqyuow1", "u7vhfizt3tb9zusi", "ox4dxmDJtHNAnSbW8ogT", {
//     host: "bvfaewkgltb4dxqyuow1-mysql.services.clever-cloud.com",
//     port: "3306",
//     dialect: "mysql"
// });

//Database Gamelab
const db = new Sequelize("qFPVp1VCsAWYmj4H", "vV9e3ORVpZ2G3LLk", "272OQY5AHUhfcnwK", {
    host: "educalab.id",
    port: "3307",
    dialect: "mysql"
});

// const db = new Sequelize("berita_db", "root", "", {
//         host: "localhost",
//         dialect: "mysql"
//     });
    

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
