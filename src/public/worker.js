console.log("worker funka")

self.addEventListener("push", (data)=>{
    data = data.data.json()
    const noti = new Notification(data.title, {
        "body": data.message
    })

})