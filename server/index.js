const server = require('./app');

server.listen(process.env.PORT != null ? process.env.PORT : 9000, () => {
  console.log(`Server started on port ${process.env.PORT}!`); // eslint-disable-line no-console
});
