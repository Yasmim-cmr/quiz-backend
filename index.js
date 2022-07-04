const express = require('express');
const {body, validationResult} = require('express-validator');
const app = express();
const mongoose = require('mongoose');
const Person = require('./models/Person');
const cors = require('cors');
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}

app.use(cors(corsOptions));
app.use(
    express.urlencoded({
        extended: true
    }),
)
app.use(express.json());
app.post('/person',[
    body("cpf").isLength({min:11, max:11}).withMessage("CPF deve ter 11 caracteres"),
],
 async (req, res) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        const { name, cpf, teste, nota } = req.body;
        let person = new Person({
         name,
         teste,
         nota
     })
        try{
         await Person.create(person);
        res.status(200).send("Person created");
     
     
        }catch(err){
         res.status(500).json({err:error})
        }
    }

  
})
app.get('/', (req, res) => {
    res.json({message:'Hello World'});
})


const DB_USER = 'yasmimUser';
const DB_PASSWORD = '6V9xDjn82pm4AfZg';

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster0.1xqnv.mongodb.net/bancoApi?retryWrites=true&w=majority`).then(()=>{
    console.log('Connected to MongoDB');
    app.listen(3001)
}).catch((err)=>console.log(err));
