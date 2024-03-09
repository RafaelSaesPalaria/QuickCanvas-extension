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
    checkbox(components.update.keep, storedData.updateKeep)
    checkbox(components.update.update,storedData.updateCanvas)
    // TODO: update.update stored data when true shall do nothing
    components.update.always.disabled =  components.update.update.checked
    components.update.hovered.disabled= components.update.update.checked
    radio([components.preview.landscape, components.preview.portrait], storedData.previewOrientation)
    radio([components.update.always, components.update.hovered], storedData.updateCanvas)
}

components.update.update.addEventListener("change",function (event) {
    components.update.always.disabled =  !event.target.checked
    components.update.hovered.disabled= !event.target.checked
})

// SAVE AND LOAD
function checkbox(component, storedName) {
    load_checkBox(component, storedName)
    listen_checkBox(component, storedName)
}

function radio(components, storedName) {
    load_radio(components, storedName)
    for (let i = 0; i < Object.keys(components).length; i++) {
        listen_radio(components[i], storedName)
    }
}

// LOAD
function load_checkBox(component, storedName) {
    chromeStorage().getByName(storedName,function (value) {
        component.checked = value
    })
}

function load_radio(components, storedName) {
    chromeStorage().getByName(storedName, function (value) {
        for (let i = 0; i < Object.keys(components).length; i++) {
            components[i].checked = (value===components[i].id)
        }
    })
}

// SAVE
function listen_checkBox(component, storedName) {
    component.addEventListener("change",function(event) {
        chromeStorage().set(storedName,event.target.checked)
    })
}

function listen_radio(component, storedName) {
    component.addEventListener("change", function(event) {
        if (event.target.checked) {
            chromeStorage().set(storedName,component.id)
        }
    })
}
//console.log(chromeStorage().getByName(storedData.previewOnecanvas))
