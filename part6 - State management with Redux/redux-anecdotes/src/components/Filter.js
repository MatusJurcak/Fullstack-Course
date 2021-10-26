import React from 'react'
import { connect } from 'react-redux'
import { changeFilter } from '../reducers/filterReducer'

const Filter = ({ changeFilter }) => {
    const handleChange = (event) => {
        event.preventDefault()
        const filter = event.target.value
        changeFilter(filter)
    }
    const style = {
        marginBottom: 10,
        marginTop: 10,
    }

    return (
        <div style={style}>
            filter <input onChange={handleChange} />
        </div>
    )
}

export default connect(
    null,
    { changeFilter }
)(Filter)
