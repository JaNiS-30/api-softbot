const express = require('express')
const axios = require('axios')
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.listen(process.env.PORT || 3000, () => console.log('Servidor rodando'))

app.get('/bills/:value', async (req, res) => {

    let url = `https://compass-soft-bot.herokuapp.com/api/bills?bills=${req.params.value}`

    const response = await axios.get(url)

    let doc = new jsPDF();

    doc.text(response.data)

    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader('Content-Disposition', 'inline;filename=Boleto.pdf')

    res.status(200).send(doc)
})

