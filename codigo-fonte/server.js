require("dotenv").config({ path: "./config.env" })
const express = require("express")
const app = express()
const fs = require("fs")
const port = 3030
const handlebars = require("express-handlebars")
const bcrypt = require("bcrypt")
const path = require("path")
const User = require("./models/User")
const Post = require("./models/Post")
const jwt = require("jsonwebtoken")
const bodyParser = require("body-parser")
const authMiddleware = require("./middlewares/authMiddleware")
const cors = require("cors")
const corsOptions = {
    origin: 'http://localhost:3030',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
};
const coockieParser = require("cookie-parser")

app.use(cors(corsOptions))
app.use(express.static(path.join(__dirname, "public")))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(coockieParser())

app.engine('handlebars', handlebars.engine({defaultLayout: 'main',
            runtimeOptions: {
                allowProtoPropertiesByDefault: true,
                allowProtoMethodsByDefault: true
            }}
        ))
        app.set("view engine", __dirname + "public" + "views")

        app.set("views", path.join(__dirname, "public", "views"));


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "views", "home.html"))
})


app.get("/sign-up", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "views", "sign-up.html"))
})

app.post("/sign-up", async (req, res) => {
    const { userName, email, password } = req.body

    try {
        const existingEmail = await User.findOne({ where: { email } })
        const existingUserName = await User.findOne({ where: { userName } })

        if (existingEmail) {
            return res.status(400).json({ error: "O email ja está em uso." })
        }
        if (existingUserName) {
            return res.status(400).json({ error: "O nome de usuario ja está em uso." })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        await User.create({
            userName,
            email,
            password: hashedPassword
        })

        res.status(201).json({ message: "Usuario criado com sucesso" })
    } catch (error) {
        console.error("Erro: ", error)
        res.status(500).json({ error: "Erro ao criar usuario. Por favor, tente novamente" })
    }
})

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "views", "login.html"))
})

app.post("/login", async (req, res) => {
    const { email, password } = req.body

    try {

        //Verifica se o email é valido
        const user = await User.findOne({ where: { email } })

        if (!user) {
            console.log("Email informado não cadastrado")
            return res.status(404).json({ error: "Email informado não cadastrado" })

        }

        //Verifica se a senha  é compativel
        const isMatch = await bcrypt.compare(password, user.password)
        if (isMatch) {
            //Cria e assina um token JWT
            const token = jwt.sign({ userName: user.userName, email: user.email }, process.env.JWT_SECRET,)
            const verified = jwt.verify(token, process.env.JWT_SECRET);
            console.log(verified)

            res.cookie("token", token, { httpOnly: true, secure: true })
            //Retorna para o usuario o token
            return res.status(200).send({ message: "login bem-sucedido! ", token })

        } else {
            console.log("Senha incorreta.")
            return res.status(401).json({ error: "Senha incorreta." })
        }
    }
    catch (error) {
        console.log("Erro: ", error)
        res.status(500).json({ error: "Erro ao realizar login. Por favor, tente novamente" })
    }
})


app.get("/energy-clean", authMiddleware, async(req, res) => {
    const userName = req.user.userName

    try{

        fs.readFile(path.join(__dirname, "public", "views", "energy-posts.html"),"utf-8", (err, data) =>{
            if(err){
                console.log("Erro ao abrir arquivo HTML: ",err)
                res.status(500).send("Erro interno do servidor")
    
                return
            } 
            const htmlWithUserName = data.replace(/<%= userName %>/g, userName)
    
            res.status(200).send(htmlWithUserName)
        })
    } catch(error){
    console.log("Erro ao buscar postagens: " ,error)
    res.status(500).send("Erro interno do servidor")
}
});

app.post("/energy-clean", authMiddleware, async (req,res) =>{
    const {userName, titulo, conteudo} = req.body

    console.log("Dados recebidos: ", req.body)

    try{
        await Post.create({
            userName,
            titulo,
            conteudo
        })

        res.status(201).json({ message: "Postagem criada com sucesso" })
    } catch(error){
        console.error("Erro: ", error)
        res.status(500).json({ error: "Erro ao criar postagem. Por favor, tente novamente" })
    }
})

app.listen(port, function () {
    console.log(`Sevido inciando na porta http://localhost:${port}`)
})