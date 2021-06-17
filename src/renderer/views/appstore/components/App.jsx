import React, { useEffect, useState } from "react"
import { Row, Col } from "antd"
import AppItem from "./AppItem"

const App  = () => {
    const [myApps, setMyApps] = useState([])
    
    /**
     * query my apps data
     * **/
    const queryMyApps = () => {
        //todo replace yourself request
        const _apps = Array(10).fill(1).map((_,i) => {
            return {
                name: "app_store" + i,
                id: "app_" + i
            }
        })
        setMyApps(_apps)
    }
    useEffect(() => {
        console.log("mount app page")
        queryMyApps()
        return () => {
            console.log("unmount app page")
        }
    }, [])
    return (
        <div style={{padding: 10}}>
            <Row>
                {myApps.map(item => (
                    <Col  span={6} key={item.id}>
                        <AppItem data={item}/>
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default App