import express from 'express';
import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';

const app = express();
app.use(express.json())

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const height = Number(req.query.height?.toString());
    const weight = Number(req.query.weight?.toString());

    if(!height || !weight){
        res.status(401).json({ error: "malformatted parameters" });
    }
    const bmi = calculateBmi(height, weight);
    
    const response = {
        weight,
        height,
        bmi,
    };
    res.send(response);
});

app.post('/exercises', (req ,res) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const body = req.body;
    if(!body.daily_exercises || !body.target){
        res.status(401).json({ error: "parameters missing" });
    }
    if(isNaN(Number(body.target))){
        res.status(401).json({ error: "malformatted parameters" });
    }
    for (let index = 0; index < body.daily_exercises.length; index++) {
        if (isNaN(Number(body.daily_exercises[index]))) {
            res.status(401).json({ error: "malforamtted parameters"});
        }
    }

    const result = calculateExercises(body.daily_exercises, body.target);
    res.send(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});