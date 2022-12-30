interface BmiValues {
  height: number;
  weight: number;
}

type Result = string;

const parseValues = (args: Array<string>): BmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

export const calculateBmi = (height: number, weight: number): Result => {
  if (height === 0 || weight === 0) throw new Error('height or weight cannot be 0');
  if (height < 0 || weight < 0) throw new Error('height or weight cannot be negative');
  const bmi = weight / Math.pow(height / 100, 2);

  if (bmi < 18.5) {
    return 'underweight';
  }
  else if (bmi >= 18.5 && bmi <= 24.9) {
    return 'normal weight';
  }
  else {
    return 'obese';
  }
};

try {
  const { height, weight } = parseValues(process.argv);
  console.log(calculateBmi(height, weight));
} catch (e: unknown) {
  let errorMessage = 'Something bad happened';
  if (e instanceof Error) {
    errorMessage += ' Error :' + e.message;
  }
  console.log(errorMessage);
}
