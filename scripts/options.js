/*
 * Copyright (c) 2024 Rafael Saes Palaria
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import { storedData, chromeStorage } from "./storage.js"

var components   = {
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
        always: document.querySelector('input[type="radio"]#update-always'),
        hovered: document.querySelector('input[type="radio"]#update-hovered'),
        keep: document.querySelector('input[type="checkbox"]#update-keep'),
        interval: document.querySelector('input[type="number"]#update-interval')
    }
}

init()
function init() {
    checkbox(components.preview.onecanvas, storedData.preview.onecanvas)
    checkbox(components.preview.transparent, storedData.preview.color)
    checkbox(components.update.keep, storedData.update.keep)

    // TODO: update.update stored data when true shall do nothing
    radio([ components.preview.portrait ,components.preview.landscape], storedData.preview.orientationC)
    radio([components.update.hovered, components.update.always], storedData.update.canvas)

    listen_other(components.preview.color, storedData.preview.color)
    listen_other(components.preview.size, storedData.preview.size)
    listen_other(components.update.interval, storedData.preview.interval)
}

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
        if (value) {
            for (let i = 0; i < Object.keys(components).length; i++) {
                components[i].checked = (value===components[i].id)
            }
        } else { // If theres no value the component 1 is checked
            components[0].checked = true
        }
    })
}

chromeStorage().getByName(storedData.preview.size,function (value) {
    if (value) {
    components.preview.size.value = value
    }  else {
        components.preview.size.value = 150
    }
})

chromeStorage().getByName(storedData.preview.color, function (value) {
    if (value) {
        components.preview.color.value = value
    } else {
        components.preview.color.value = "rgb(255,255,255)"
    }
})

chromeStorage().getByName(storedData.update.interval, function (value) {
    components.update.interval.value = value
})

// SAVE
function listen_checkBox(component, storedName) {
    component.addEventListener("change",function(event) {
        showSaved(component)
        chromeStorage().set(storedName,event.target.checked)
    })
}

function listen_radio(component, storedName) {
    component.addEventListener("change", function(event) {
        if (event.target.checked) {
            showSaved(component)
            chromeStorage().set(storedName,component.id)
        }
    })
}

function listen_other(component, storedName) {
    component.addEventListener("change",function(event) {
        if (component === components.preview.size) { showSize() }
        showSaved(component)
        chromeStorage().set(storedName,event.target.value)
    })
}

function showSize() {
    let c = document.createElement("canvas")
    c.width = components.preview.size.value
    c.height= components.preview.size.value
    components.preview.size.parentNode.appendChild(c);
    c.style.position = "absolute"
    c.style.display = "float"
    setTimeout( function() {
        c.remove()
    },300)
}

function showSaved(component) {
    let d = document.createElement("span")
    d.style.color = "green"
    d.style.display = "inline"
    d.innerText = "saved"
    component.parentNode.appendChild(d);

    setTimeout( function() {
        d.remove()
    },300)
}

//console.log(chromeStorage().getByName(storedData.previewOnecanvas))
