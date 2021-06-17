import React from "react"
import { Avatar } from "antd"

const AppItem = ({data}) => {
    return (
        <div style={{textAlign: "center", padding: 20, margin: 20, boxShadow: "1px 1px 10px -1px rgba(0,0,0,0.5)"}}>
            <Avatar shape="square"  /><br/>
            <span>{data.name}</span>
        </div>
    )
}

export default AppItem