const { toDefaultValue } = require("sequelize/lib/utils")
const db = require("./db")

const Post = db.sequelize.define("Post",{
    id: {
        type: db.Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    userName: {
        type: db.Sequelize.STRING,
        allowNull: false,

    },
    titulo: {
        type: db.Sequelize.STRING,
        allowNull: false,
    },
    conteudo: {
        type: db.Sequelize.TEXT,
        allowNull: false
    },
    data: {
        type: db.Sequelize.DATE,
        allowNull: false,
        defaultValue: db.Sequelize.literal("CURRENT_TIMESTAMP")
    }
} )

// Post.sync({force:true})

module.exports =  Post