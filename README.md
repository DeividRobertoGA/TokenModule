# Token Module

Esse modulo permite a criação e verificação do tokens web com o node

### `REQUER EXPRESS`

Passo 1. Instale o `jsonwebtoken` e o `dotenv`</br>
```sh
yarm install jsonwebtoken dotenv
//or
npm install jsonwebtoken dotenv
```
Passo 2. Preencha o ENV com as configurações do token
```shell
TOKEN_SECRET=#Senha de descriptografia do token (OPCIONAL)
TOKEN_EXPIRE=#Tempo de expiração. (Padrão: 18000)
```
Passo 3. Configurar dados presentes no token, por padrão é somente o id do usuário.
```javascript
# token.config.js
//Criando o TOKEN
const createJWT = (/*Coloque os dados que você que no token*/) => { const token = jwt.sign({/*Coloque os dados que você que no token*/}, secretToken, {expiresIn: process.env.TOKEN_EXPIRE || 18000}); };
```
Passo 4. Configurar a descriptografia dos dados.
```javascript
# token.config.js
//Verificar o TOKEN
const verifyJWT = (req, res, next) => {
    const authToken = req.headers.authorrization;

    if (!authToken) { return res.status(401).json({message: "Token não enviado"}) };

    const [srt, token] = authToken.split(" ");

    jwt.verify(token, secretToken, (err, decoded) => {
        if (err) {
            return res.status(401).json({message: "Token não valido"});
        } else {
            req./*nomeDescripitografado*/ = decoded./*itemDoToken*/;

            next();
        }
    })
}
```
Utilizando para `criar o token`.
```javascript
import {createJWT} from /*Lugar onde está o arquivo token.config.js*/

jwt.createJWT(/*dados do token*/)
```

Utilizando para `verificar o token`.
```javascript
import {verifyJWT} from /*Lugar onde está o arquivo token.config.js*/

route.get(ROUTE, verifyJWT, CONTROLLER);
```