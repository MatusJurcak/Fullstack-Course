import React from 'react'

const Notification = ({ style, message }) => {
    if (message === null) {
        return null
    }

    if (style === "error") {
        return (
            <div className="error">
                {message}
            </div>
        )
    }

    return (
        <div className="message">
            {message}
        </div>
    )
}

export default Notification