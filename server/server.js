const express = require("express");
const cors = require('cors')
const app = express();
require('dotenv').config();
const port = process.env.PORT;

require("./config/config");

app.use(express.json(), express.urlencoded({ extended: true }), cors());

const AllMyUserRoutes = require("./routes/user-routes");
AllMyUserRoutes(app);

const AllMyPlaylistRoutes = require("./routes/playlist-routes")
AllMyPlaylistRoutes(app)

app.listen(port, () => console.log(`Listening on port: ${port}`) );