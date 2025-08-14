const express = require('express');
const Test = require('../models/testModel');
const router = new express.Router();

router.post('/tests', async (req, res) => {
    try {
        const test = new Test(req.body);
        await test.save();
        res.status(201).send(test);
    } catch (error) {
        res.status(400).send({message:error.message});
    }
});    
router.get('/tests', async (req, res) => {
    try {
        const tests = await Test.find({});
        res.status(200).send(tests);
    } catch (error) {
        res.status(500).send({message:error.message});
    }
});
router.get('/tests/:id', async (req, res) => {
    try {
        const test = await Test.findById(req.params.id);
        if (!test) {
            return res.status(404).send({message: 'Test not found'});
        }
        res.status(200).send(test);
    } catch (error) {
        res.status(500).send({message: error.message});
    }
});
router.patch('/tests/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['title', 'description', 'version', 'duration', 'sections', 'sectionsModel'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({message: 'Invalid updates!'});
    }

    try {
        const test = await Test.findById(req.params.id);
        if (!test) {
            return res.status(404).send({message: 'Test not found'});
        }

        updates.forEach((update) => test[update] = req.body[update]);
        await test.save();
        res.send(test);
    } catch (error) {
        res.status(400).send({message: error.message});
    }
});
router.delete('/tests/:id', async (req, res) => {
    try {
        const test = await Test.findByIdAndDelete(req.params.id);
        if (!test) {
            return res.status(404).send({message: 'Test not found'});
        }
        res.send(test);
    } catch (error) {
        res.status(500).send({message: error.message});
    }
});
router.post('/tests/:testId/listening',  async (req, res) => {
  try {
    const { testId } = req.params
    const { htmlContext, inputs } = req.body

    // 1. Check if Test exists
    const test = await Test.findById(testId)
    if (!test) {
      return res.status(404).json({ message: 'Test not found' })
    }

    // 2. Create Listening section
    const listening = new Listening({
      testId,
      htmlContext,
      inputs
    })
    await listening.save()

    // 3. Update Test to include new section reference
    await Test.findByIdAndUpdate(testId, {
      $push: {
        sections: listening._id
      },
      $set: {
        sectionsModel: 'Listening'
      }
    })

    // 4. Send response
    res.status(201).json({
      message: 'Listening section added successfully',
      listening
    })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})
module.exports = router;