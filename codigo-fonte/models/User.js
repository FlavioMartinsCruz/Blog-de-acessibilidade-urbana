const { type } = require("os")
const db = require ("./db")
const { isAlphanumeric, containsUppercase, containsLowercase, containsSpecialCharacters, containsNumbers, isLowercase, isFQDN} = require("validator");
const { isAscii } = require("buffer");



// Criando tabela Usuarios
    const User = db.sequelize.define("User", {
        userName: {
            type: db.Sequelize.STRING,
            allowNull: false,
            unique: true,
            primaryKey: true
        },
        email: {
            type: db.Sequelize.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: {
                  msg: "O email fornecido não é valido"  
                },
                isLowercase: true,
                isAscii: true
            }
        },
        password: {
            type: db.Sequelize.STRING,
            allowNull: false,
            validate: {
                isPasswordComplex(value) {
                    if (
                      !value.match(/[A-Z]/) ||
                      !value.match(/[a-z]/) ||
                      !value.match(/[0-9]/) ||
                      !value.match(/[^a-zA-Z0-9\s]/)
                    ) {
                      throw new Error("A senha não atende aos requisitos mínimos de segurança");
                    }
                  },
            }
        }
    });
    

    // User.sync({force:true})

    module.exports = User