interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ExerciseValues {
    target: number;
    dailyExerciseHours: Array<number>;
}

const parseExerciseArguments = (args: Array<string>): ExerciseValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    const target = Number(args[2]);
    const dailyExerciseHours = args.slice(3).map(hours => Number(hours));
    if (!isNaN(target) && dailyExerciseHours.every(hours => !isNaN(hours))) {
        return {
            target,
            dailyExerciseHours
        };
    } else {
        throw new Error('Provided values were not numbers!');
    }
};


export const calculateExercises = (dailyExerciseHours: Array<number>, target: number): ExerciseResult => {
    const periodLength = dailyExerciseHours.length;
    const trainingDays = dailyExerciseHours.filter(hours => hours > 0).length;
    const average = dailyExerciseHours.reduce((a, b) => a + b) / periodLength;
    const success = average >= target;
    const rating = average >= target ? 3 : average >= target - 1 ? 2 : 1;
    const ratingDescription = rating === 3 ? 'Great job!' : rating === 2 ? 'Not too bad but could be better' : 'You need to work harder';
    
    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    };
};

try {
    const { target, dailyExerciseHours } = parseExerciseArguments(process.argv);
    console.log(calculateExercises(dailyExerciseHours, target));
} catch (error: unknown) {
    if (error instanceof Error) {
        console.log('Error:', error.message);
    }
}