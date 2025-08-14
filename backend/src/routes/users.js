const express = require("express")
const User = require('../models/users')
const auth = require('../Auth')

const router = new express.Router()

router.post('/users', async (req, res) => {
    try{
        const user = new User(req.body)
        await user.save()
        res.status(201).send(user)
    } catch (err) {
        if (err.name === "ValidationError") {
         return res.status(400).json({ error: err.message });
        }
        if (err.code === 11000) { // Duplicate key error in Mongo
        return res.status(409).json({ error: "Email already registered" });
        }
        console.error(err);
        res.status(500).json({ error: "Server error" });
  }
})
router.get('/users/all', async (req,res) => {
    try {
        const users = await User.find()
        res.send(users)
    } catch (err) {
        res.status(500).send({message: err.message})
    }
} )
router.patch('/users/:id', auth,  async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'age', 'email']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if(!isValidOperation){
            return res.status(400).send({error:'Invalid Updates!'})
    }

    try {
        updates.forEach((update)=>{
            req.user[update] = req.body[update];
        })
    } catch (err) {
        res.status(400).send({massage:err.message})
    }
})
router.delete('/users/:id', auth,  async (req, res) => {
    try {
        await User.deleteOne({_id:req.params.id})
        res.status(202).send('deleted successfully!')
    } catch (err) {
        res.status(500).send({message:err.message})
    }
})

module.exports = router