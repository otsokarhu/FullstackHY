interface TrainingValues {
  hours: Array<number>
  target: number
}

interface ReturnValues {
  period_length: number
  training_days: number
  success: boolean
  rating: number
  rating_description: string
  target: number
  avg: number
}

const parseArguments = (args: Array<string>): TrainingValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  args.shift()
  args.shift()


  let hours: Array<number> = []
  args.map((arg) => {
    if (!isNaN(Number(arg))) {
      hours.push(Number(arg))
    } else {
      throw new Error('Provided values were not numbers!');
    }
  }
  )
  const target = Number(hours.shift())
  return {
    hours,
    target
  }
}

const exerciseCalculate = (
  hours: Array<number>,
  target: number
): ReturnValues => {
  const period_length = hours.length
  const training_days = hours.filter((h) => h > 0).length
  const exHours = hours.reduce((a, b) => a + b)
  const avg = exHours / period_length
  const success = avg >= target
  let rating = 0
  let rating_description = 'No rating'

  if (avg === 0) {
    rating = 1
    rating_description = 'Failed miserably'
  }
  else if (avg < target) {
    rating = 2
    rating_description = 'Still some way to go'
  }
  else {
    rating = 3
    rating_description = 'Great job, goal reached'
  }

  return {
    period_length,
    training_days,
    success,
    rating,
    rating_description,
    target,
    avg
  }
}

try {
  const { hours, target } = parseArguments(process.argv)
  console.log(exerciseCalculate(hours, target))
} catch (e: unknown) {
  let errorMessage = 'Something bad happened'
  if (e instanceof Error) {
    errorMessage += ' Error :' + e.message
  }
  console.log(errorMessage)
}



