const express = require('express')
const axios = require('axios')
const fs = require('fs')
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.listen(process.env.PORT || 3000, () => console.log('Servidor rodando'))

app.get('/projects/:id', async (req, res) => {

    let response = []

    let vazio = true

    let result = await fs.readFileSync("./projects.json", { encoding: "utf-8" })
    result = JSON.parse(result)

    result.projects.forEach(element => {
        if (element.idcliente == req.params.id) {
            response.push(element)
            vazio = false
        }
    });

    if (vazio) res.status(404).send("Não há projetos")
    else res.status(200).send(response)
})

app.get('/login/:id', async (req, res) => {

    let options = {
        headers: {
            'Authorization': req.headers.authorization,
            'Content-Type': 'application/json'
        }
    }

    let resp

    try {
        let url = `https://api.hubapi.com/crm/v3/objects/contacts/${req.params.id}?properties=mobilephone,email,cpf_ou_cnpj,projeto,firstname,lastname,jobtitle,company`
        resp = await axios.get(url, options)
    } catch (error) {
        res.status(404).send(`Ocorreu um erro: ${error.response.statusText}`)
    }
    
    if (resp !== undefined && resp.status === 200) res.status(200).send(resp.data)

})
