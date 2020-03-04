const mongoose = require('mongoose');
const { Schema } = mongoose;

const userItunesQueriesSchema = new Schema({
    queries: [{
        type: String,
        maxlength: [200, 'Query is too long']
    }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required']
    },
});

module.exports = mongoose.model('UserItunesQueriesSchema', userItunesQueriesSchema);