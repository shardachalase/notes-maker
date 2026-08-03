import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    tags: {
        type: Array,
        default: []
    },
    attachments: [{
        url: String,
        filename: String,
        mimetype: String
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});
const note = mongoose.model('note', noteSchema);
export default note;