const ratingDescriptions = ["huono", "kohtuullista", "hyvä"];

interface ExerciseSummary {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: 1 | 2 | 3;
  ratingDescription: string;
  target: number;
  average: number;
}

interface Rating {
  rating: 1 | 2 | 3;
  ratingDescription: string;
}

const rate = (averageExerciseHours: number, targetHours: number): Rating => {
  let rating: 1 | 2 | 3;
  const difference = Math.abs(targetHours - averageExerciseHours);
  if (difference > 0.5) {
    rating = 1;
  } else if (difference > 0.2) {
    rating = 2;
  } else {
    rating = 3;
  } 

  return {
    rating: rating,
    ratingDescription: ratingDescriptions[rating - 1]
  };
};

const calculateExercises = (dailyHours: Array<number>, targetHours: number): ExerciseSummary => {
  const trainingHours = dailyHours.reduce((a,c) => c + a);
  const averageExerciseHours = trainingHours / dailyHours.length;  
  const {rating, ratingDescription} = rate(averageExerciseHours, targetHours);

  return {
    periodLength: dailyHours.length,
    trainingDays: dailyHours.reduce((a, c) => {if (c > 0) a++; return a;}),
    success: averageExerciseHours >= targetHours,
    rating: rating,
    ratingDescription: ratingDescription,
    target: targetHours,
    average: averageExerciseHours
  };
};

const parseArguments = (dailyHours: Array<number>, target: number) => {
  if(dailyHours == null || target == null) {
    throw new Error('Parameters missing');
  }
  if (isNaN(target)) {
    throw new Error('Provided values were not numbers!');
  }
  dailyHours.forEach(argument => {
    if (isNaN(argument)) {
      throw new Error('Provided values were not numbers!');
    }  
  });  

  return {
    dailyHours: dailyHours.map(hour => Number(hour)),
    target: Number(target)
  };
};

/*
const parseArguments = (args: Array<string>) => {
  if (args.length < 4) {
    throw new Error('Not enough arguments');
  }
  const [ target, ...dailyHours ] = args.slice(2, args.length);

  return validateArguments(dailyHours.map(hour => Number(hour)), target);
};

try {
  const { dailyHours, target } = parseArguments(process.argv);
  console.log(calculateExercises(dailyHours, target));
} catch (e) {
  console.log('There was an error: ', e.message);
}
*/   
export default { calculateExercises, parseArguments };