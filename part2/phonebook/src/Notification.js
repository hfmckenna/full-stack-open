import React from "react";

const Notification = ({message, style}) => {
    return (
        <div className={style}>
            {message}
        </div>
    )
}

export default Notification