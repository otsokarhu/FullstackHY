

const DisplayOne = (props) => {

    return (
        <div>
            <div>{props.name}
                <button onClick={() => props.setNewSearch(props.country.name.common)}>
                    show
                </button>
            </div>
        </div>
    )
}




export default DisplayOne