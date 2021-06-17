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
                name: "app_" + i,
                id: "app_" + i
            }
        })
        const myapp = {
            name: "应用管理",
            type: "1",
            id: "appstore"
        }
        const baidu = {
            name: "百度",
            type: "2",
            id: "baidu",
            url: "http://baidu.com"
        }
        setMyApps([myapp, baidu, ..._apps])
    }
    const handleClickApp = (data) => {
        window.APP && window.APP.send("TAB_VIEW_ADD", data)
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
                        <AppItem onClick={() => handleClickApp(item)} data={item}/>
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default App