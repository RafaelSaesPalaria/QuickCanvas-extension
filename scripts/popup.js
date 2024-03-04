let content = {
    submit: document.querySelector("input#submit")
}

chrome.runtime.sendMessage({todo:"miniatureCanvas"})

chrome.runtime.onMessage.addListener(function (message) {
    console.log(message.x[0])
    let canvas = document.createElement("canvas");
    document.body.appendChild(canvas)
    canvas.width = 100
    canvas.height= 100
    let c = canvas.getContext("2d")
    c.drawImage(message.x[0],0,0)

})

// Send Message to pageEvent
content.submit.addEventListener("click",function () {
    chrome.runtime.sendMessage({todo:"downloadCanvas"})
})