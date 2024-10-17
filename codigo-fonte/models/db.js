require("dotenv").config({ path: "./config.env" })
const Sequelize = require("sequelize")

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env. DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: "mysql"
})   

// Exportando os mudulos de banco de dados
    module.exports = {
        Sequelize : Sequelize,
        sequelize: sequelize
    }