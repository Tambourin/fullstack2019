/*
interface PersonalData {
  height: number;
  weight: number;
}

const parseBmiArguments = (args: Array<string>): PersonalData => {
  if (args.length !== 4) {
    throw new Error('Wrong number of arguments!');
  }
  if (isNaN(Number(args[2])) || isNaN(Number(args[3]))) {
    throw new Error('Provided values were not numbers!');
  }

  return {
    height: Number(args[2]),
    weight: Number(args[3])
  };
};
*/
const calculateBMI = (height: number, mass: number): string => {
  const heightInMeters = height / 100;  
  const bmi = mass / (heightInMeters * heightInMeters);
  
  if (bmi < 18.5) {
    return 'Low';
  }
  if (bmi >= 18.5 && bmi <= 25) {
    return 'Normal';
  }
  if (bmi > 25) {
    return 'High';
  }
  throw new Error('Bad arguments!');
};
/*
try {
  const { height, weight } = parseBmiArguments(process.argv);
  console.log(calculateBMI(height, weight));
} catch (e) {
  console.log('There was an error: ', e.message);
}
*/
export default { calculateBMI };

