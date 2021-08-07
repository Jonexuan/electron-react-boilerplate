import React, {useState, useMemo, useEffect} from "react"
import TabItem from "./TabItem"

const App = () => {
    const [views, setViews] = useState([])
    const [sysViews, normalViews ] = useMemo(() => {
        const _sysViews = views.filter(item => item.type == "0")
        const _normalViews = views.filter(item => item.type != "0")
        return [_sysViews, _normalViews]
    }, [views])
    
    const handleTabItemClick = (data) => {
        console.log(data)
        window.APP && window.APP.send("TAB_VIEW_ADD", data)
    }
    useEffect(() => {
        // setViews([
        //     {
        //         id: "apps",
        //         type: "0",
        //         name: "我的应用"
        //     },
        //     {
        //         id: "appstore",
        //         type: "1",
        //         name: "应用管理"
        //     }
        // ])
        // document.title = "应用大厅"
        if (window.APP) {
            window.APP.send("TAB_VIEW_QUERY")

            window.APP.receive("TAB_VIEW_SYNC", ({views}) => {
                console.log(views)
                setViews(views)
            })
        }

    }, [])
    return (
        <div className="tab-container">
            {sysViews.map(item => (
                <TabItem key={item.id} {...item} onClick={() => handleTabItemClick(item)} />
            ))}
            {normalViews.map(item => (
                <TabItem key={item.id}  {...item} onClick={() => handleTabItemClick(item)}/>
            ))}
        </div>
    )
}

export default App