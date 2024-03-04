let content = {
    submit: document.querySelector("input#submit")
}

chrome.runtime.sendMessage({todo:"miniatureCanvas"})

chrome.runtime.onMessage.addListener(function (message) {
    console.log(message.x)
    let canvas = document.createElement("canvas");
    document.body.appendChild(canvas)
    console.log(canvas)
    canvas.width = 100
    canvas.height= 100
    let c = canvas.getContext("2d")
    let img = new Image();
    img.onload = function() {
        c.drawImage(img, 0, 0, 100, 100); // Draw the image onto the canvas
    };
    img.src = message.x

})

// Send Message to pageEvent
content.submit.addEventListener("click",function () {
    chrome.runtime.sendMessage({todo:"downloadCanvas"})
})