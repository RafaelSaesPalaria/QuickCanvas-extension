chrome.runtime.sendMessage({todo:"miniatureCanvas"})

chrome.runtime.onMessage.addListener(function (message) {
    console.log(message.canvas)
    if (Object.keys(message.canvas).length > 1) {
        createMiniatures(message)
    } else {
        downloadCanvas(0)
    }
})

function createMiniatures(message) {
    for (let i = 0 ; i < Object.keys(message.canvas).length; i++) {
        let canvas =createCanvas(i)
        let c = canvas.getContext("2d")
        let img = new Image();
        img.onload = function() {
            if (img.height>img.width) {
            let r = img.width/img.height
            canvas.width = r*canvas.height
            c.drawImage(img, 0, 0, r*canvas.height, canvas.height); // Draw the image onto the canvas
            
            } else {
                let r = img.height/img.width
                canvas.height = r*canvas.width
                c.drawImage(img, 0, 0, canvas.width, r*canvas.width);
                
                
            }
        };
        img.src = message.canvas[i]
    }
}

function createCanvas(i) {
    let canvas = document.createElement("canvas");
    document.body.appendChild(canvas)
    canvas.width = 100
    canvas.height= 100
    canvas.addEventListener("click",function () {
        downloadCanvas(i)
    })
    return canvas
}

function downloadCanvas(id) {
    chrome.runtime.sendMessage({todo:"downloadCanvas","id":id})
}