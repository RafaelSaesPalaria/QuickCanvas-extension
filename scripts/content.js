//TODO: Select ALL Canvas and let the user choose

chrome.runtime.onMessage.addListener(function name(message) {
    if (message.todo == "downloadCanvas") {
        let canvas = document.querySelector("canvas")
        let link = document.createElement("a")
        let data = canvas.toDataURL()
        link.download = data
        link.href = data
        link.click()
    } else if (message.todo == "miniatureCanvas") {
        let canvasd = document.querySelectorAll("canvas")
        let canvas = {}
        for (let i=0; i<canvasd.length;i++) {
            canvas[i] = canvasd[i].toDataURL()
        }
        chrome.runtime.sendMessage({canvas})
    }
})