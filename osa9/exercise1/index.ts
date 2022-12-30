import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { exerciseCalculate } from './exerciseCalculator';
const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/');

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight)) {
    res.status(400).send({ error: 'malformatted parameters' });
  } else {
    const bmi = calculateBmi(height, weight);
    res.send({ weight, height, bmi });
  }
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { hours, target } = req.body;

  if (!hours || !target) {
    res.status(400).send({ error: 'parameters missing' });
  }


  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  if (isNaN(target) || !hours.every((h: number) => !isNaN(h))) {
    res.status(400).send({ error: 'malformatted parameters' });
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const result = exerciseCalculate(hours, target);
  res.send(result);
});



const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});