interface CoursePartProps {
  name: string,
  exerciseCount: number,
}

interface CoursePartArray {
  courseParts: Array<CoursePartProps>
}


const Total = ({ courseParts }: CoursePartArray): JSX.Element => {
  return (
    <>
      Number of exercises {courseParts.reduce((o, v) => o + v.exerciseCount, 0)}
    </>
  )
}

export default Total