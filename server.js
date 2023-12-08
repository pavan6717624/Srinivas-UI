//Install express server
const express = require('express');
const path = require('path');







var forceSsl = require('force-ssl-heroku');
var compression = require('compression');

const app = express();
app.use(compression());
app.use(forceSsl);


// Serve only the static files form the dist directory
app.use(express.static('./dist/heidiginew'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/heidiginew/'}),
);

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
