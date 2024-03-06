//TODO: Select ALL Canvas and let the user choose

chrome.runtime.onMessage.addListener(function name(message) {
    if (message.todo == "downloadCanvas") {
        let canvas = document.querySelectorAll("canvas")[message.id]
        let link = document.createElement("a")
        let data = canvas.toDataURL()
        link.download = data
        link.href = data
        link.click()
    } else if (message.todo == "miniatureCanvas-All") {
        let canvasd = document.querySelectorAll("canvas")
        let canvas = {}
        for (let i=0; i<canvasd.length;i++) {
            canvas[i] = canvasd[i].toDataURL()
        }
        chrome.runtime.sendMessage({canvas,"todo":"create"})
    } else if (message.todo == "miniatureCanvas") {
        let canvas = document.querySelectorAll("canvas")[message.id].toDataURL()
        chrome.runtime.sendMessage({canvas,"todo":"edit","id":message.id})
    }
})