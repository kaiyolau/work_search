const mongoose = require('mongoose')

const appSchema = new mongoose.Schema({
    comment: {
        type: String
    },
    resume: {
        type: Buffer,
        // required: true
    },
    coverLetter: {
        type: String
    },
    recruiter: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    job: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Post'
    }
}, {
    timestamps: true
})

const App = mongoose.model('App', appSchema)

module.exports = App
