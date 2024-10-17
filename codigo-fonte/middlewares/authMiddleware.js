require("dotenv").config({ path: "./config.env" });
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const authToken = req.cookies.token

    if(!authToken){
        return res.status(401).send({message: "Token não fornecido"})
    }

    jwt.verify(authToken, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            console.error("Erro ao verificar o token:", err);
            return res.status(403).send({ message: "Token inválido" });
        }
        req.user = user;
        next();
    })

    
};  

module.exports = authMiddleware;