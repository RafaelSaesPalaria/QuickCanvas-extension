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
        input: document.querySelector('input[type="checkbox"]#update-keep'),
        interval: document.querySelector('input[type="number"]#update-interval')
    }
}

// LOAD
chromeStorage().getByName(storedData.previewOnecanvas,function (value) {
    components.preview.onecanvas.checked = value
})

// SAVE
components.preview.onecanvas.addEventListener("change",function(event) {
    chromeStorage().set(storedData.previewOnecanvas,event.target.checked)
})

//console.log(chromeStorage().getByName(storedData.previewOnecanvas))
