import { storedData, chromeStorage } from "./storage.js"

var components = {
    submit: document.querySelector('input[type="submit"]#submit'),
    reset: document.querySelector('input[type=reset]#reset'),
    preview: {
        size: document.querySelector('input[type="range"]#preview-size'),
        onecanvas: document.querySelector('input[type="checkbox"]#preview-onecanvas'),
        landscape: document.querySelector('input[type="radio"]#preview-orientation-landscape'),
        portrait: document.querySelector('input[type="radio"]#preview-orientation-portrait'),
        transparent: document.querySelector('input[type="checkbox"]#preview-background-transparent'),
        color: document.querySelector('input[type="color"]#preview-background-color'),
    },
    update: {
        update: document.querySelector('input[type="checkbox"]#update'),
        always: document.querySelector('input[type="radio"]#update-always'),
        hovered: document.querySelector('input[type="radio"]#update-hovered'),
        keep: document.querySelector('input[type="checkbox"]#update-keep'),
        interval: document.querySelector('input[type="number"]#update-interval')
    }
}

init()
function init() {
    checkbox(components.preview.onecanvas, storedData.previewOnecanvas)
    checkbox(components.preview.transparent, storedData.previewColor)
    checkbox(components.update.update,storedData.updateCanvas)
    checkbox(components.update.keep, storedData.updateKeep)
    
}

// SAVE AND LOAD
function checkbox(component, storedName) {
    load_checkBox(component, storedName)
    listen_checkBox(component, storedName)
}



// LOAD
function load_checkBox(component, storedName) {
    chromeStorage().getByName(storedName,function (value) {
        component.checked = value
    })
}



// SAVE
function listen_checkBox(component, storedName) {
    component.addEventListener("change",function(event) {
        chromeStorage().set(storedName,event.target.checked)
    })
}


//console.log(chromeStorage().getByName(storedData.previewOnecanvas))
