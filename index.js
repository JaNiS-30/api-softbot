const express = require('express')
const axios = require('axios')
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.listen(process.env.PORT || 3000, () => console.log('Servidor rodando'))

app.get('/bills', async (req, res) => {

    res.status(200).send("deu boa")

})

