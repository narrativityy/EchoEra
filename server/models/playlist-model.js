const mongoose = require('mongoose');

const PlaylistSchema = new mongoose.Schema({
    user: {
        type: Object,
        required: true,
    },
    songs: {
        type: Array,
        required: true,
    },
}, {timestamps: true});
 
const Playlist = mongoose.model('Playlist', PlaylistSchema);
 
module.exports = Playlist;