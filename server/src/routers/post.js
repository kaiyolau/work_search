const express = require('express')
const multer = require('multer')
const sharp = require('sharp')
const Post = require('../models/post')
const auth = require('../middleware/auth')
const User = require('../models/user')
const router = new express.Router()
const request = require('request');


const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload an image'))
        }
        cb(undefined, true)
    }
})

router.post('/posts', auth, upload.single('picture'), async (req, res) => {
    try {
        let buffer = null
        if (req.file) {
            buffer = await sharp(req.file.buffer).resize({ width: 500, height: 800 }).png().toBuffer()
        }
        const address = req.body.location;
        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.GEOCODE_API_KEY}`;

        request(url, { json: true }, (err, response, body) => {
            if (err) {
                return res.status(500).send(err);
            }

            if (body.status === 'ZERO_RESULTS') {
                return res.status(404).send({ message: 'No results found' });
            }

            const location = body.results[0].geometry.location;
            const lat = location.lat;
            const lng = location.lng;

            const post = new Post({
                latitude: lat,
                longitude: lng,
                ...req.body,
                author: req.user._id,
                picture: buffer
            })

            post.save().then(() => {
                res.status(201)
                res.send(post)
            }).catch((e) => {
                res.status(500).send(e)
            })
        });




    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/posts',  async (req, res) => {
    try {
        const posts = await Post.find({}).sort({createdAt:'desc'})
        res.set('Content-Type', 'image/jpg')
        res.status(201).send(posts)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.get('/posts/:id', async (req, res) => {
    const _id = req.params.id
    const post = await Post.find({ _id })
    try {
        if (!post) {
            return res.status(404).send()
        }
        res.set('Content-Type', 'image/png')
        res.status(201).send(post)
    } catch (error) {
        res.status(500).send(error)
    }
})

//list all applications in the employer dashboard
router.get('/posts/:postingId/apps', async (req, res) => {
    const _id = req.params.postingId
    try {
        await Post.findById(_id)
        .populate('apps')
        .exec((err, post ) => {
            if (err) {
                console.error(err)
                res.send(err)
            } else {
                res.send(post.apps).status(201)
            }

        })
    } catch (e) {
        res.status(500).send(e)
        console.error(e)
    }
})



router.patch('/posts/:id/update', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['jobtitle', 'company', 'location', 'numberOfRecruiter','skill', 'description','companyWebsite','expired','expiredDate','picture','id','wage', 'sponsorship']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    let post = await Post.findById(req.params.id)
    try {
        updates.forEach((update) => post[update] = req.body[update])
        await post.save()
        res.status(201).send(post)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.delete('/posts/:id', auth, async (req, res) => {
    try {
        const post = await Post.findOneAndDelete({ _id: req.params.id, author: req.user._id })
        if (!post) {
            res.status(404).send()
        }
        res.status(201).send('the post has been deleted successfully')
    } catch (e) {
        res.status(500).send(e)
    }
})




module.exports = router
