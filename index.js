import express from 'express'
import mongoose from 'mongoose';
const app = express()
import cors from "cors"
const port = 3000
app.use(express.json())

app.use(cors())

const personSchema = new mongoose.Schema({
    name: String,
    surname: String,
    age: Number
});

const personModel = mongoose.model('person', personSchema);


app.get('/', async (req, res) => {
    try {
        const persons = await personModel.find({})
        res.send(persons)
    } catch (error) {
        res.send(error.message)
    }
})

app.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const person = await personModel.findById(id)
        res.send(person)
    } catch (error) {
        res.send(error.message)
    }
})

app.post('/', async (req, res) => {
    try {
        const { name, surname, age } = req.body
        const newPersons = new personModel({ name, surname, age })
        await newPersons.save()
        res.send('Post yaradildi')
    } catch (error) {
        res.send(error.message)
    }
})

app.put('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { name, surname, age } = req.body
        const persons = await personModel.findByIdAndUpdate(id, { name, surname, age })
        res.send(persons)
    } catch (error) {
        res.send(error.message)
    }
})

app.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const person = await personModel.findByIdAndDelete(id)
        res.send(person)
    } catch (error) {
        res.send(error.message)
    }
})


mongoose.connect('mongodb+srv://arzu:arzu@cluster0.9p2kmwb.mongodb.net/')
    .then(() => console.log('Connected!'));


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})