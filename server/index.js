express = require('express');
bodyParser = require('body-parser');
cors = require('cors');
app = express();
const port = process.env.PORT || 3000;

// Routers
const posts = require('./routes/api/posts');

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use('/api/posts', posts);

// Handle Production
// Point to which public folder is our entry point
if (process.env.NODE_ENV === 'production') {
    // Use the public folder created via npm run build
    app.use(express.static(__dirname + '/public/'));

    // Handle Single Page Applications
    app.use(/.*/, (req, res) => {
        res.sendFile(__dirname + '/public/index.html');
    });
}

app.listen(port, () => {
    console.log(`Server running on ${port}`);
});