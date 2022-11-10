const express = require('express')
const router = express.Router()
const db = require('../database')

router.get('/', async(req, res) => {
    try {
        const result = 'SELECT * FROM käyttäjä ORDER BY id ASC'
        const { rows } = await db.query(result)
        res.send(rows)
    } catch (error) {
        console.log('Käyttäjähaussa virhe'. error)
    }
})

router.post('/', async(req, res) => {
    try {
        const { nimi, email, onkoadmin } = req.body
        const values = [ nimi, email, onkoadmin ]
        const text = 'INSERT INTO käyttäjä (nimi, email, onkoadmin) VALUES ($1, $2, $3)'
        await db.query(text, values)
        res.send("pelittää")
    } catch (error) {
        console.log("Virhe käyttäjää lisätessä", error.stack)
    }
})

router.delete('/:id', async(req, res) => {
    try {
        const text = 'DELETE FROM käyttäjä WHERE id=($1)'
        const values = [req.params.id]
        await db.query(text, values)
        res.send(`Käyttäjä ID:llä ${req.params.id} poistettu`)
    } catch (error) {
        console.log("Virhe käyttäjää poistettaessa")
    }
})

router.put('/:id', async(req, res) => {
    try {
        const {uusiNimi, uusiEmail, uusiAdmin} = req.body
        const text = 'UPDATE käyttäjä SET nimi = ($1), email = ($2), onkoadmin = ($3) WHERE id = ($4)'
        console.log(uusiNimi)
        await db.query(text, [uusiNimi, uusiEmail, uusiAdmin, req.params.id])
        res.send(`Käyttäjän tiedot ID:llä ${req.params.id} päivitettiin`)
    } catch (error) {
        console.log("Virhe tietojen päivittämisessä", error.stack)
    }

})

module.exports = router