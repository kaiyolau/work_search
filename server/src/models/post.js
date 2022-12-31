const mongoose = require('mongoose')
const validator = require('validator')
const User = require('./user')

const postSchema = new mongoose.Schema({
    jobtitle: {
        type: String,
        required: true,
        trim: true
    },
    company: {
        type: String,
        required: true,
        uppercase: true,
        trim: true
    },
    location: {
        type: String,
        required: true,
        trim: true
    },
    numberOfRecruiter: {
        type: Number,
        min: 1
    },
    description: {
        type: String,
        required: true,
        minLength: 20,
        trim: true
    },
    companyWebsite: {
        type: String,
        validate(value) {
            if (!validator.isURL(value)) {
                throw new Error('Url is invalid')
            }
        }
    },
    expiredDate: {
        type: Date,
        default: Date.now,
        expires:2592000
    },
    // owner: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true,
    //     ref: 'User'
    // },
    picture: {
        type: Buffer
    },
    author: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }]
}, {
    timestamps: true
})

postSchema.virtual('apps', {
    ref: 'App',
    localField: '_id',
    foreignField: 'job'
    });


postSchema.methods.toJSON = function () {
    const post = this
    const postObject = post.toObject()
    const { __v, _id, ...object } = postObject
    postObject.id = _id;



    delete postObject.picture

    return postObject
}

// Delete post applications when post is removed
postSchema.pre('remove', async function (next) {
    const post = this
    await App.deleteMany({ jobPosting: post._id })
    next()
})

const Post = mongoose.model('Post', postSchema)

module.exports = Post
