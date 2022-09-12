const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { activitiesModel } = require('./activities');
const { factsModel } = require('./facts');


const app = express();
const PORT = 3000;

mongoose.connect('mongodb://localhost:27017/Hobbies')
    .then(res => {
        console.log('MongoDB connected')
    }).catch(err => {
        console.log(err)
    })

const activityRouter = express.Router();
const factsRouter = express.Router({ mergeParams: true })


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use('/activities', activityRouter);
app.use('/activities/:activityId/facts', factsRouter);


app.get('/', (req, res) => {
    res.send('Hello! From the server');
})

// ------ACTIVITIES-----
activityRouter.post('/', async (req, res) => {
    try {
        const result = await activitiesModel.create(req.body);
        res.send(result);
    } catch (error) {
        console.log(error);
    }
})

activityRouter.get('/', async (req, res) => {
    try {
        let result = await activitiesModel.find();
        res.send(result);

    } catch (error) {
        // console.log(error);
        res.send(error);

    }
})

activityRouter.get('/:activityId', async (req, res) => {
    let _activityId = req.params.activityId;
    try {
        let result = await activitiesModel.findById(_activityId)
        // console.log(result);
        res.send(result)
    } catch (error) {
        res.send(error)
    }
})

activityRouter.delete('/:activityId', async (req, res) => {
    let _activityId = req.params.activityId;
    // let _factId = req.params.factId;
    try {
        await activitiesModel.findByIdAndDelete(_activityId)
        await factsModel.deleteMany()
        res.send({ message: `Success` })

    }
    catch (error) {
        res.send(error)

    }
})

//----------Facts------------

factsRouter.post('/', async (req, res) => {
    let { activityId } = req.params;
    let { facts } = req.body;
    // console.log(req.body);
    // console.log(req.params);
    try {
        let result = await factsModel.create({ facts, activitiesId: activityId })
        res.send(result)
    } catch (error) {
        res.send(error)
    }

})

factsRouter.get('/', async (req, res) => {
    try {
        let result = await factsModel.find()
        res.send(result)
    } catch (error) {
        res.send(error)
    }
})

factsRouter.get('/:factId', async (req, res) => {
    let _factId = req.params.factId;
    // console.log(_factId);
    try {
        let result = await factsModel.findById(_factId);
        res.send(result);
    } catch (error) {
        res.send(error);
    }
})

factsRouter.delete('/:factId', async (req, res) => {
    let _factId = req.params.factId;
    let _activityId = req.params.activitiesId
    try {
        await factsModel.deleteOne({ activities: _activityId, _id: _factId })
        res.send({ message: `Success` });

    } catch (error) {
        res.send(error);
    }
})

factsRouter.put('/:factsId', async (req, res) => {

    let activityId = req.params.activitiesId;
    let factsId = req.params.factsId;
    let updatedFact = req.body.facts;

    try {
        await factsModel.findOneAndUpdate({ activities: activityId, _id: factsId }, { facts: updatedFact }, { new: true })
        res.send({ message: 'Sucess' })
    } catch (error) {
        res.send(error)
    }
})

app.listen(PORT, (err) => {
    if (err) {
        console.error("ERROR", err);
    } else {
        console.log(`Listenning to PORT: ${PORT}`)
    }
})