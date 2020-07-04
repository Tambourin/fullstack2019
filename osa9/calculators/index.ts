import express from 'express';
import bodyParser from 'body-parser';
import bmiCalculator from './bmiCalculator';
import exerciseCalculator from './exerciseCalculator';

const app = express();
app.use(bodyParser.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.post('/exercises', (req,res) => {
  try {
    const { dailyHours, target } = 
      exerciseCalculator.parseArguments(req.body.daily_exercises, req.body.target);
    const exerciseSummary = 
      exerciseCalculator.calculateExercises(dailyHours, target);
    res.send(exerciseSummary);
  } catch (e) {
    res.send({ error: e.message });
  }  
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;
  try {
    const bmi = bmiCalculator.calculateBMI(height, weight);
    res.send({
      weight: weight,
      height: height,
      bmi: bmi
    });
  } catch (e) {
    res.send({ error: e.message });
  }  
});

app.listen(3000, () => {
  console.log('server running');  
});