# electron-react-boilerplate
electron应用模板

### 应用间消息通讯 ，和数据共享
接口接参数定义
```
//接收消息
APP.ipcReceive(evtName, callback)
evtName: 事件名称
callbak: 收到事件后触发的回调，callbak参数可拿到共享数据
//发送消息
APP.ipcSend({evtName, evtView}, payload)
evtName: 事件 名称
evtView: 发送给指定应用的ID
payload: 需要共享的数据
```
#### 示例
- 应用1
```
//接收消息
APP.ipcReceive("msg", (data) => console.log(data))
```
- 应用2
```
//发送消息给应用1
APP.ipcSend({evtName: "msg", evtView: "应用1ID"}, {data: 1})
```

