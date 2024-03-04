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
    img.src = message.x
    canvas.addEventListener("click",function () {
        chrome.runtime.sendMessage({todo:"downloadCanvas"})
    })
})