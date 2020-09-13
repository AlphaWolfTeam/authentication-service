import express from 'express'
import cors from 'cors'
import * as bodyParser from "body-parser"

const app = express()

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.all('*', (req, res) => res.send(`Hello ${JSON.stringify(req.body.currentUser)}`))

const PORT = 3000

app.listen(PORT, () => {console.log(`listening on ${PORT}`);})