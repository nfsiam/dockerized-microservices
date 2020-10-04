const express = require('express');
const app = express();

app.get('/', function (req, res) {
    res.send('hello from siam')
});

app.listen(3000, () => console.log('Server running at 3000'));