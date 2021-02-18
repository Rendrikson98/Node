const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(express.json());

app.param('id', (req, res, next, val) => {
    const tour = tours.find(el => el.id == req.params.id)

    if (!tour) {
        return res.status(404).json({
            mensagem: `Can\'t found ID : ${val}`
        })
    }
    next();
})

//app.use(morgan('dev'))
const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));
app.get('/api/v1/tours', (req, res) => {
    return res.status(200).json({
        status: "sucess",
        total: tours.length,
        data: {
            tours
        }
    })
})


app.get('/api/v1/tours/:id', (req, res) => {
    res.status(200).json({
        status: "sucess",
        total: tours.length,
        data: {
            tour
        }
    })
})


app.post('/api/v1/tours', (req, res) => {
    const newID = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({ id: newID }, req.body)

    tours.push(newTour);
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
        res.status(201).json({
            mensagem: 'sucess',
            data: {
                tours: newTour
            }
        })
    })
})

app.listen(3000, () => {
    console.log('API is Running...')
})