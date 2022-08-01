const express = require('express')
const axios = require('axios')
const fs = require('fs');
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.listen(process.env.PORT || 3000, () => console.log('Servidor rodando'))

app.get('/projects/:id', async (req, res) => {

    let response = []

    let result = await fs.readFileSync("./projects.json", { encoding: "utf-8" })
    result = JSON.parse(result)

    result.projects.forEach(element => {
        if (element.idcliente == req.params.id) {
            response.push(element)
        }
    });

    res.status(200).send(response)
})

app.get('/login/:id/', async (req, res) => {

    let options = {
        headers: {
            'Authorization': req.headers.authorization,
            'Content-Type': 'application/json'
        }
    }

    let url = `https://api.hubapi.com/crm/v3/objects/contacts/${req.params.id}?properties=mobilephone,email,cpf_ou_cnpj,projeto,firstname,lastname,jobtitle`

    let response = await axios.get(url, options)

    res.status(200).send(response.data)
})
