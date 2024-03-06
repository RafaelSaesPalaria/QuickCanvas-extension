chrome.runtime.sendMessage({todo:"miniatureCanvas-All"})

/* The Miniature appears when theres only one canvas?*/
var interval = 0
var oneMiniature = true
var defaultValues = {
    width: 150,
    height: 150
}

chrome.runtime.onMessage.addListener(function (message) {
    console.log(message)
    if (message.todo == "create") {
        if (Object.keys(message.canvas).length > !oneMiniature) {
            createMiniatures(message)
        } else {
            downloadCanvas(0)
        }
    } else if (message.todo == "edit") {
        let canvas = document.querySelectorAll("canvas")[message.id]
        let c = canvas.getContext("2d")
        c.clearRect(0,0,canvas.width,canvas.height)
        let img = new Image();
        img.onload = function() {
            c.drawImage(img, 0, 0, canvas.width, canvas.height);
        };
        img.src = message.canvas
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

function createCanvas(id) {
    let canvas = document.createElement("canvas");
    document.body.appendChild(canvas)
    canvas.width = defaultValues.width
    canvas.height= defaultValues.height
    canvas.addEventListener("click",function () {
        downloadCanvas(id)
    })
    canvas.addEventListener("mouseover", function() {
        interval = setInterval(function () {miniatureCanvas(id)},100)
    })
    return canvas
}

function miniatureCanvas(id) {
    chrome.runtime.sendMessage({todo:"miniatureCanvas","id":id})
}

function downloadCanvas(id) {
    chrome.runtime.sendMessage({todo:"downloadCanvas","id":id})
}