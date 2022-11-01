
const DisplayOne = (props) => {




    return (
        <div>
            {props.name} {props.number} <button onClick={() => props.handlePersonDelete(props.person)}>
                delete
            </button>
        </div>
    )
}





export default DisplayOne