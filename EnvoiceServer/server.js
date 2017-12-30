import express from 'express';

const app = express();

app.use(require('./routes'));

// Launch the server on the port 3010
const server = app.listen(3010, () => {
  const {address, port} = server.address();
  console.log(`Listening at http://${address}:${port}`);
});
