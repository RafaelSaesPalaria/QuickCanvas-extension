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

    // TODO: update.update stored data when true shall do nothing
    radio([components.preview.landscape, components.preview.portrait], storedData.previewOrientation)
    radio([components.update.always, components.update.hovered], storedData.updateCanvas)
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
        for (let i = 0; i < Object.keys(components).length; i++) {
            components[i].checked = (value===components[i].id)
        }
    })
}

chromeStorage().getByName(storedData.previewSize,function (value) {
    components.preview.size.value = value
})

chromeStorage().getByName(storedData.previewColor, function (value) {
    components.preview.color.value = value
})

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

components.preview.color.addEventListener("change",function(event) {
    chromeStorage().set(storedData.previewColor,event.target.value)
})

components.preview.size.addEventListener("change",function(event) {
    chromeStorage().set(storedData.previewSize,event.target.value)
})

//console.log(chromeStorage().getByName(storedData.previewOnecanvas))
