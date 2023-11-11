const PlaylistController = require('../controllers/playlist-controller');
 
module.exports = app => {
    app.get('/api/playlists', PlaylistController.findAllPlaylists);
    app.get('/api/playlists/:id', PlaylistController.findOneSinglePlaylist);
    app.patch('/api/playlists/:id', PlaylistController.updateExistingPlaylist);
    app.post('/api/playlists', PlaylistController.createNewPlaylist);
    app.delete('/api/playlists/:id', PlaylistController.deleteAnExistingPlaylist);
}