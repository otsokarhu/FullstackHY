interface CoursePartProps {
  name: string,
  exerciseCount: number,
}

interface CoursePartArray {
  courseParts: Array<CoursePartProps>
}


const Content = ({ courseParts }: CoursePartArray): JSX.Element => {
  return (
    <>
      {courseParts.map(course =>
        <p key={course.name}>{course.name} {course.exerciseCount}</p>
      )}
    </>
  )
}

export default Content