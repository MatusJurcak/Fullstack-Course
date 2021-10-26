interface exerciseValues {
    values: Array<number>;
    target: number;
}

const parseArg = (args: Array<string>): exerciseValues => {
 //   if (args.length < 4) throw new Error('Not enough arguments');
    const v: number[] = [];
    if (args.length > 3) {
        for (let index = 3; index < args.length; index++) {
            if (isNaN(Number(args[index]))) {
                throw new Error('Provided values were not numbers!');
            }
            v.push(Number(args[index]));
        }
    }
    if (!isNaN(Number(args[2]))) {
        return {
            values: v,
            target: Number(args[2])
        };
    } else {
        throw new Error('Provided values were not numbers!');
    }
};

interface calResult {
    periodLength: number;
    trainingdays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

const calculateExercises = (parameters: Array<number>, target: number): calResult => {
    const period = parameters.length;
    const training = parameters.filter(h => h > 0).length;
    const average = (parameters.reduce((sum, hour) => sum + hour, 0)) / period;
    const success = average < target ? false : true;
    let rating;
    if (average >= target) {
        rating = 1;
    }
    else if (average < target && average > target - 1) {
        rating = 2;
    }
    else {
        rating = 3;
    }
    let ratingDescription;
    if (rating === 1) {
        ratingDescription = 'very good';
    }
    else if (rating === 2) {
        ratingDescription = 'not bad but could be better';
    }
    else {
        ratingDescription = 'bad';
    }

    return {
        periodLength: period,
        trainingdays: training,
        success,
        rating,
        ratingDescription,
        target,
        average,
    };
};

try {
    const { values, target } = parseArg(process.argv);
    console.log(calculateExercises(values, target));
} catch (e) {
    console.log(e);
}

export default calculateExercises;