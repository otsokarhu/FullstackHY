import express from 'express';
import cors from 'cors';
const app = express();
// eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-call
app.use(express.json(), cors());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.get("/");

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});