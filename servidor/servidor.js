const express = require("express");
const app = express();
const server = require("http").Server(app);
const port = 3100;

app.use(express.static("../cliente"));

server.listen(port, () => console.log(`Server listening on port ${port}!`));