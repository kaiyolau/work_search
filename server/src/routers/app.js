const express = require('express')
const multer = require('multer')
const App = require('../models/app')
const Post = require('../models/post')
const auth = require('../middleware/auth')
const sharp = require('sharp')
const router = new express.Router()
const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png|pdf)$/)) {
            return cb(new Error('Please upload an image'))
        }
      // built-in third-arg is callback that take the Error and, boollen of passing the image
        cb(undefined, true)
    }
})


// , upload.single('resume')
router.post('/posts/:postingId/apps', auth, async (req, res) => {
    const _id = req.params.postingId
    // console.log('req.body', req.body)
    // console.log('req.file.buffer', req.file.buffer)
    try {
        // const buffer = await sharp(req.file.buffer).resize({ width: 800, height: 1000 }).png().toBuffer()
        const app = new App({
            ...req.body,
            recruiter: req.user._id,
            job: _id
            // resume: buffer
        })

        await app.save()
        res.status(201).send(app)
    } catch (e) {
        res.status(400).send(e)
    }
}, (error, req, res, next) => {
    res.status(500).send({ error: error.message })
})


//only function in the admin dashboard
router.delete('/apps', async (req, res) => {
    try {
        await App.remove({})
        res.status(201).send('everthing is deleted suscessfully')
    } catch (e) {
        res.status(500).send('something going wrong with deletion in app')
    }
})

module.exports = router
