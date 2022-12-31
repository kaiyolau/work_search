const express = require('express')
// const session = require('express-session');
const multer = require('multer')
const sharp = require('sharp')
const Post = require('../models/post')
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = new express.Router()



router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        const token = await user.generateAuthToken()
        // req.session.userId = user._id
        res.status(200).send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        // req.session.userId = user._id
        res.status(200).send({ user, token })
    } catch (e) {
        res.status(400).send('could not login from catch block in express')
    }
})

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        // req.session.userId = null;

        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        // req.session.userId = null;
        res.send()
    } catch (e) {
        res.status(500).send(e)
    }
})


router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})

//list all posting in the employer dashboard
router.get('/users/:userId/posts', auth, async (req, res) => {
    // const _id = req.params.userId
    try {
        req.user = await User.findById(req.user.id)
        .populate('posts')
        .exec((err, user ) => {
            if (err) {
                res.send(err)
            } else {
                res.send(user.posts).status(201)
            }

        })
    } catch (e) {
        res.status(500).send(e)
    }
})

router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        res.send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/users/me', auth, async (req, res) => {
    try {
        const user = await User.deleteOne(req.user._id)
        res.send('the current user has been deleted')
    } catch (e) {
        res.status(500).send(e)
    }
})
//multer is to set the validation of uploading image,
const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload an image'))
        }
        // built-in third-arg is callback that take the Error and, boollen of passing the image
        cb(undefined, true)
    }
})
//sharp is to re formatting image that you upload, after installing npm sharp, req.file will become built-in params we can access
//we save buffer size of image(which is binary code) to req.user(which is User model) in database
//upload.single() is mutler method
router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
    req.user.avatar = buffer
    await req.user.save()
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

router.delete('/users/me/avatar', auth, async (req, res) => {
    req.user.avatar = undefined
    await req.user.save()
    res.send()
})


//in postman default Content-Type attribute in header section was JSON, we can simply use res.set() to modify
//once we set the header, the server know to show image file instead of JSON document.
router.get('/users/:id/avatar', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)

        if (!user || !user.avatar) {
            throw new Error()
        }

        res.set('Content-Type', 'image/png')
        res.send(user.avatar)
    } catch (e) {
        res.status(404).send()
    }
})




module.exports = router
