interface CourseNameProps {
  courseName: string
}


const Header = ({ courseName }: CourseNameProps): JSX.Element => {
  return (
    <div>
      <h1>{courseName}</h1>
    </div>
  )
}

export default Header