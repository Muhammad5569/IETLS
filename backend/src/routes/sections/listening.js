const express = require('express')
const {
    createListeningTest, 
    getListeningTest, 
    getAllListeningTests, 
    updateListeningTest, 
    deleteListeningTest,
    addListeningSection
} = require('../../controller/sections/listening')

const router = new express.Router()

router.post('/listening', createListeningTest)
router.get('/listening/:id', getListeningTest)
router.get('/listening', getAllListeningTests)
router.patch('/listening/:id', updateListeningTest)
router.delete('/listening/:id', deleteListeningTest)

module.exports = router
