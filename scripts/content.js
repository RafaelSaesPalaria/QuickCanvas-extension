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
    let canvas = document.querySelectorAll("canvas")[id]
    let tmpCanvas = document.createElement("canvas")
    tmpCanvas = Object.assign(tmpCanvas,canvas)

    //RESIZE
    if (canvas.height>canvas.width) {
        let r = canvas.width/canvas.height
        tmpCanvas.width = r*100
        tmpCanvas.height= 100
    } else {
        let r = canvas.height/canvas.width
        tmpCanvas.height =r*100
        tmpCanvas.width = 100
    }


    tmpCanvas.getContext("2d").drawImage(canvas,0,0,tmpCanvas.width, tmpCanvas.height)
    canvas = tmpCanvas.toDataURL()
    chrome.runtime.sendMessage({canvas,"todo":"edit","id":id})
}

function miniatureCanvas_All() {
    let canvasd = document.querySelectorAll("canvas")
    let canvas = {}
    for (let i=0; i<canvasd.length;i++) {
        let tmpCanvas = document.createElement("canvas")
        tmpCanvas = Object.assign(tmpCanvas,canvasd[i])

        //RESIZE
            if (canvasd[i].height>canvasd[i].width) {
                let r = canvasd[i].width/canvasd[i].height
                tmpCanvas.width = r*100
                tmpCanvas.height= 100
            } else {
                let r = canvasd[i].height/canvasd[i].width
                tmpCanvas.height =r*100
                tmpCanvas.width = 100
            }


        tmpCanvas.getContext("2d").drawImage(canvasd[i],0,0,tmpCanvas.width, tmpCanvas.height)
        canvas[i] = tmpCanvas.toDataURL()
    }
    chrome.runtime.sendMessage({canvas,"todo":"create"})
}