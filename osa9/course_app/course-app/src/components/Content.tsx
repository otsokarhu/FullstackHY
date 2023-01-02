import Part from "./Part"
import { CoursePart } from "../types"

interface CoursePartArray {
  courseParts: Array<CoursePart>
}


const Content = ({ courseParts }: CoursePartArray): JSX.Element => {
  return (
    <>
      {courseParts.map(course =>
        <Part key={course.name} course={course} />
      )}
    </>
  )
}

export default Content