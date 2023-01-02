import { CoursePart } from "../types";

interface CourseProp {
  course: CoursePart
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({ course }: CourseProp): JSX.Element => {
  switch (course.type) {
    case "normal":
      return (
        <div>
          <b>{course.name} {course.exerciseCount}</b>
          <p><i>{course.description}</i></p>
        </div>
      )
    case "groupProject":
      return (
        <div>
          <b>{course.name} {course.exerciseCount}</b>
          <p><i>{course.groupProjectCount} group projects required</i></p>
        </div>
      )
    case "submission":
      return (
        <div>
          <b>{course.name} {course.exerciseCount}</b>
          <p><i>{course.description}</i></p>
          <p><i>submit to {course.exerciseSubmissionLink}</i></p>
        </div>
      )
    case "special":
      return (
        <div>
          <b>{course.name} {course.exerciseCount}</b>
          <p><i>{course.description}</i></p>
          <p><i>required skills: {course.requirements}</i></p>
        </div>
      )
    default:
      return assertNever(course);

  }

}

export default Part