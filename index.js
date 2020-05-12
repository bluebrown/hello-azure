const port = 8080;
const express = require('express');
const http = require('http');
const app = express();
const server = http.Server(app);
server.listen(port, () => console.log('listenting on port', port));
app.use(express.json());

app.use('/static', express.static('public'));

app.get('/endpoint', (req, res) => {
  res.send('hello, azure')
});
