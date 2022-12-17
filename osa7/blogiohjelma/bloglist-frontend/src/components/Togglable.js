import { useState } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }
  Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
  }
  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button variant="outline-dark" onClick={toggleVisibility}>
          {props.buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible} className="togglableContent">
        {props.children}
        <Button variant="danger" onClick={toggleVisibility}>
          cancel
        </Button>
      </div>
    </div>
  )
}

export default Togglable
