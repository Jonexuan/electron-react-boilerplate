import React, { useEffect, useState } from "react"
import {Icon, Input, Form, Button} from "antd"


const App = () => {
    const [user, setUser] = useState({})
    const updateUser = (data) => {
        setUser(Object.assign({}, user, data))
    }
    const handleSubmit = () => {
        //todo login fn
        console.log(user)

        window.APP && window.APP.send("USER_LOGIN", user)
    }
    const handleCancel = () => {
        // todo login cancel
        // close this window
    }
    useEffect(() => {
        document.title = "登录"
    }, [])
    return (
        <div className="login-container">
            <Form layout="horizontal">
                <Form.Item label="账号">
                    <Input prefix={<Icon type="user" />} value={user.name} onChange={e => updateUser({name: e.target.value})}/>
                </Form.Item>
                <Form.Item label="密码">
                    <Input.Password prefix={<Icon type="lock" />} value={user.password} onChange={e => updateUser({password: e.target.value})}/>
                </Form.Item>
                <Form.Item label=" " colon={false} className="btns-container">
                    <Button onClick={handleCancel}>取消</Button>
                    <Button type="primary" onClick={handleSubmit}>确定</Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default App