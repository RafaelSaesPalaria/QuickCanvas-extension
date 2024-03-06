//TODO: Select ALL Canvas and let the user choose

chrome.runtime.onMessage.addListener(function name(message) {
    if (message.todo == "downloadCanvas") {
        downloadCanvas(message.id)
    } else if (message.todo == "miniatureCanvas-All") {
        miniatureCanvas_All()
    } else if (message.todo == "miniatureCanvas") {
        miniatureCanvas(message.id)
    }
})

function downloadCanvas(id) {
    let canvas = document.querySelectorAll("canvas")[id]
    let link = document.createElement("a")
    let data = canvas.toDataURL()
    link.download = data
    link.href = data
    link.click()
}

function miniatureCanvas(id) {
    let canvas = document.querySelectorAll("canvas")[id].toDataURL()
    chrome.runtime.sendMessage({canvas,"todo":"edit","id":id})
}

function miniatureCanvas_All() {
    let canvasd = document.querySelectorAll("canvas")
    let canvas = {}
    for (let i=0; i<canvasd.length;i++) {
        canvas[i] = canvasd[i].toDataURL()
    }
    chrome.runtime.sendMessage({canvas,"todo":"create"})
}