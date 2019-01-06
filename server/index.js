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

app.listen(port, () => {
    console.log(`Server running on ${port}`);
});