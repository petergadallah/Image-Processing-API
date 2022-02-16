//importing
import express from 'express';
import routes from './routes';

//setting up the server
const app = express();
const port = 8080;
function listening(): void {
  console.log(`This server works at port${port}`);
}
app.listen(port, listening);

//adding an endpoint which is /images
app.get('/images', routes);

export default app;
