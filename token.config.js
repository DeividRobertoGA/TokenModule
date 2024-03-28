//Importando as bibliotecas necessarias
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

//Configurando Bibliotecas
dotenv.config();

//Configurando Variaveis
const secretToken = process.env.TOKEN_SECRET || "REfOrMuGoLAHImP";

//Criando o TOKEN
const createJWT = (id) => { const token = jwt.sign({id}, secretToken, {expiresIn: process.env.TOKEN_EXPIRE || 18000}); };

export default createJWT;