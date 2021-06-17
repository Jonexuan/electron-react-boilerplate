import React from "react"

const TabItem = ({name, onClick = () => {}}) => {
    return (
        <div className="tab-item" onClick={onClick}>
            {name}
        </div>
    )
}

export default TabItem