const Playlist = require('../models/playlist-model');
const axios = require('axios')
 
module.exports.findAllPlaylists = (req, res) => {
    Playlist.find()
        .then((allDaPlaylists) => {
            res.json(allDaPlaylists)
        })
        .catch((err) => {
            res.json(err)
        });
}
 
module.exports.findOneSinglePlaylist = (req, res) => {
    Playlist.findOne({ _id: req.params.id })
        .then(oneSinglePlaylist => {
            res.json(oneSinglePlaylist)
        })
        .catch((err) => {
            res.json(err)
        });}
 
module.exports.createNewPlaylist = (req, res) => {
    Playlist.create(req.body)
        .then(newlyCreatedPlaylist => {
            res.json(newlyCreatedPlaylist)
        })
        .catch((err) => {
            res.status(400).json(err)
        });}
 
module.exports.updateExistingPlaylist = (req, res) => {
    Playlist.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true, runValidators: true }
    )
        .then(updatedPlaylist => {
            res.json(updatedPlaylist)
        })
        .catch((err) => {
            res.json(err)
        });}
 
module.exports.deleteAnExistingPlaylist = (req, res) => {
    Playlist.deleteOne({ _id: req.params.id })
        .then(result => {
            res.json(result)
        })
        .catch((err) => {
            res.json(err)
        });}

module.exports.getYoutubeLink = (req, res) => {
    const query = req.params.query
    axios.get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=AIzaSyDgHmpN1FF8F0Iw9jO9gyVgZiIxxt-meEg`)
        .then(result => {
            res.json(result.data)
        })
        .catch((err) => {
            res.status(400).json(err)
        });}