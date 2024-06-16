import express from 'express';
import { calculateBmi } from './src/bmiCalculator';
import { calculateExercises } from './src/exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);
    if (isNaN(height) || isNaN(weight)) {
        res.json({ error: "malformatted parameters" });
    } else {
        const bmi = calculateBmi(height, weight);
        res.json({ weight, height, bmi });
    }
});

app.post('/exercises', (req, res) => {
    const { daily_exercises, target } = req.body;
    if (!daily_exercises || !target) {
        res.json({ error: "parameters missing" });
    } else if (!Array.isArray(daily_exercises) || isNaN(Number(target))) {
        res.json({ error: "malformatted parameters" });
    } else {
        res.json(calculateExercises(daily_exercises, Number(target)));
    }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});