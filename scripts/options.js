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

import { detectLanguage } from "./language.js"

detectLanguage()

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

var data = {
    preview: {
        size: 150,
        onecanvas: true,
        orientationC: "portrait",
        color: "rgb(255,255,255)"
    },
    update: {
        canvas: "update-hovered",
        keep: true,
        interval: 1000
    }
}

chromeStorage().getAll(function (callback) {
    applyCallbackToData(callback)
})

function applyCallbackToData(callback) {
    for (let key0 in data) {
        for (let key1 in data[key0]) {

            if (components[key0][key1]) {

                //Loading
                if (components[key0][key1].type == "checkbox") {
                    components[key0][key1].checked = callback[storedData[key0][key1]]
                } else if (components[key0][key1].type != "radio") {
                    components[key0][key1].value = callback[storedData[key0][key1]]
                }
            }

            //Listening
            if (storedData[key0][key1]) { 
                applyOnChange(components[key0][key1],storedData[key0][key1])
            }

        }
    }
    if (callback[storedData.preview.orientationC]) {
    document.querySelector(`#${callback[storedData.preview.orientationC]}`).checked = true
    }
    if (callback[storedData.update.canvas]) {
        document.querySelector(`#${callback[storedData.update.canvas]}`).checked=true
    }
    applyOnChange(components.preview.landscape,storedData.preview.orientationC)
    applyOnChange(components.preview.portrait,storedData.preview.orientationC)
    applyOnChange(components.update.always,storedData.update.canvas)
    applyOnChange(components.update.hovered,storedData.update.canvas)
}

function applyOnChange(component,storedName) {
    console.log(component)
    if (component) {
        component.addEventListener("change",function (event) {
            console.log(event)
            //showSaved()
            if (component.type == "checkbox") {
                chromeStorage().set(storedName,event.target.checked)
            } else if (component.type != "radio") {
                chromeStorage().set(storedName,event.target.value)
            } else {
                chromeStorage().set(storedName,event.target.id)
            }
        })
    }
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
    //TODO change save language
    d.innerText = "salvo"
    component.parentNode.appendChild(d);

    setTimeout( function() {
        d.remove()
    },300)
}

//console.log(chromeStorage().getByName(storedData.previewOnecanvas))
