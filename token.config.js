//Importando as bibliotecas necessarias
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

//Configurando Bibliotecas
dotenv.config();

//Configurando Variaveis
const secretToken = process.env.TOKEN_SECRET || "REfOrMuGoLAHImP";

//Criando o TOKEN
const createJWT = (id) => { const token = jwt.sign({id}, secretToken, {expiresIn: process.env.TOKEN_EXPIRE || 18000}); };

//Verificar o TOKEN
const verifyJWT = (req, res, next) => {
    const authToken = req.headers.authorrization;

    if (!authToken) { return res.status(401).json({message: "Token não enviado"}) };

    const [srt, token] = authToken.split(" ");

    jwt.verify(token, secretToken, (err, decoded) => {
        if (err) {
            return res.status(401).json({message: "Token não valido"});
        } else {
            req.user_id = decoded.id;

            next();
        }
    })
}


export {createJWT, verifyJWT};