const Course = (props) => {
    const Header = (props) => {
        return (
            <div>
                <h1>{props.course.name}</h1>
            </div>
        )
    }
    const Part = (props) => {
        return (
            <div>
                <p>{props.part} {props.exercise}</p>
            </div>
        )
    }

    const Total = (props) => {
        const result = props.course.parts.map(part => (part.exercises))
        const initialValue = 0;
        const sumWithInitial = result.reduce(
            (previousValue, currentValue) => previousValue + currentValue,
            initialValue
        );

        return (
            <div>
                <b>total of </b>
                <b>{sumWithInitial}</b>
                <b> excercises</b>
            </div>
        )
    }

    const Content = (props) => {
        return (
            <div>
                <div>{props.course.parts.map(part =>
                    (<Part key={part.id} part={part.name} exercise={part.exercises} />))}
                </div>
                <div></div>
            </div>
        )
    }


    return (
        <div>
            <Header course={props.course} />
            <Content course={props.course} />
            <Total course={props.course} />
        </div>
    )
}

export default Course