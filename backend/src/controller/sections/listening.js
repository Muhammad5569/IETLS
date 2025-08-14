const User = require('../../models/users')
const Test = require('../../models/testModel')
const Listening = require('../../models/section/listening')
const ListeningAttempt = require('../../models/attempt/listening')

exports.createListeningTest = async (req,res) => {

    
    try {
        const testExists = await Test.findById(req.body.testId);
        if (!testExists) {
            return res.status(404).send({message: 'Test not found'});
        }
        const listeningTest = new Listening(req.body);
        await listeningTest.save()
        res.status(201).send(listeningTest)
    } catch (error) {
        res.status(400).send({message: error.message})
    }
}
exports.getListeningTest = async (req, res) => {
    try {
        const listeningTest = await Listening.findById(req.params.id);
        if (!listeningTest) {
            return res.status(404).send({message: 'Listening test not found'});
        }
        res.send(listeningTest);
    } catch (error) {
        res.status(500).send({message: error.message});
    }
}
exports.getAllListeningTests = async (req, res) => {
    try {
        const listeningTests = await Listening.find({});
        res.status(200).send(listeningTests);
    } catch (error) {
        res.status(500).send({message: error.message});
    }
}
exports.updateListeningTest = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['title', 'description', 'version', 'duration', 'sections'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({message: 'Invalid updates!'});
    }

    try {
        const listeningTest = await Listening.findById(req.params.id);
        if (!listeningTest) {
            return res.status(404).send({message: 'Listening test not found'});
        }

        updates.forEach((update) => listeningTest[update] = req.body[update]);
        await listeningTest.save();
        res.send(listeningTest);
    } catch (error) {
        res.status(400).send({message: error.message});
    }
}
exports.deleteListeningTest = async (req, res) => {
    try {
        const listeningTest = await Listening.findByIdAndDelete(req.params.id);
        if (!listeningTest) {
            return res.status(404).send({message: 'Listening test not found'});
        }
        res.send(listeningTest);
    } catch (error) {
        res.status(500).send({message: error.message});
    }
}   

