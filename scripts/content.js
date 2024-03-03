//TODO: Select ALL Canvas and let the user choose
let canvas = document.querySelector("canvas")
console.log(canvas)
let link = document.createElement("a")
link.download = canvas.toDataURL()
link.href = canvas.toDataURL()
link.click()