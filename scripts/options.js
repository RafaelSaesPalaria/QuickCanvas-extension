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

import { storedData, chromeStorage, defaultData } from "./storage.js"

import { applyLanguage, getTranslation, detectLanguage } from "./language.js"

detectLanguage().then(() => {
    applyLanguage()
})

var components   = {
    submit: document.querySelector('input[type="submit"]#submit'),
    reset: document.querySelector('input[type=reset]#reset'),
    preview: {
        size: document.querySelector('input[type="range"]#preview_size'),
        onecanvas: document.querySelector('input[type="checkbox"]#preview_onecanvas'),
        landscape: document.querySelector('input[type="radio"]#preview_orientation_landscape'),
        portrait: document.querySelector('input[type="radio"]#preview_orientation_portrait'),
        transparent: document.querySelector('input[type="checkbox"]#preview_background_transparent'),
        color: document.querySelector('input[type="color"]#preview_background_color'),
    },
    update: {
        always: document.querySelector('input[type="radio"]#update_always'),
        hovered: document.querySelector('input[type="radio"]#update_hovered'),
        keep: document.querySelector('input[type="checkbox"]#update_keep'),
        interval: document.querySelector('input[type="number"]#update_interval')
    }
}


/**
 * @Called When the options are called
 * @Do Apply the values stored to the html and set the listeners
 * @param {Function} callback 
 */
chromeStorage().getAll(function (callback) {
    applyCallbackToData(callback)
})
function applyCallbackToData(callback) {
    for (let key0 in defaultData) {
        for (let key1 in defaultData[key0]) {

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
        console.log(callback[storedData.update.canvas])
        document.querySelector(`#${callback[storedData.update.canvas]}`).checked=true
    }
    applyOnChange(components.preview.landscape,storedData.preview.orientationC)
    applyOnChange(components.preview.portrait,storedData.preview.orientationC)
    applyOnChange(components.update.always,storedData.update.canvas)
    applyOnChange(components.update.hovered,storedData.update.canvas)
}

/**
 * @Called When the options are called
 * @Do Make the listeners
 * @param {HTMLElement} component the component that change the value
 * @param {String} storedName the stored value that is gonna change with the component
 */
function applyOnChange(component,storedName) {
    console.log(component, storedName)
    if (component) {
        component.addEventListener("change",function (event) { //input for more speed
            showSaved(component)
            if (component.type == "checkbox") {
                chromeStorage().set(storedName,event.target.checked)
            } else if (component.type != "radio") {
                if (component.type == "range") {
                    showSize()
                }
                chromeStorage().set(storedName,event.target.value)
            } else {
                chromeStorage().set(storedName,event.target.id)
            }
        })
    }
}

/**
 * @Called When the size option is changed
 * @Do create a miniature showing the actual size
 */
function showSize() {
    if (!document.querySelector('#showSize')) {
        let c = document.createElement("canvas")
        c.id = 'showSize'
        c.width = components.preview.size.value
        c.height= components.preview.size.value
        components.preview.size.parentNode.appendChild(c);
        c.style.position = "absolute"
        c.style.display = "float"
        let ctx=c.getContext('2d')
        chromeStorage().getByName(storedData.preview.color,(color) => {
            ctx.fillStyle = color
            ctx.fillRect(0,0,c.width,c.height)
        })
        
        setTimeout( function() {
            c.remove()
        },300)
    } else {
        let c = document.querySelector('#showSize')
        c.width = components.preview.size.value
        c.height = components.preview.size.value
        let ctx = c.getContext('2d')
        chromeStorage().getByName(storedData.preview.color,(color) => {
            ctx.fillStyle = color
            ctx.fillRect(0,0,c.width,c.height)
        })
    }
}

/**
 * @Called When a component change
 * @Do Create a span to show that the component data is saved
 * @param {HTMLElement} component 
 */
function showSaved(component) {
    if (!document.querySelector('#saved')) {
        let d = document.createElement("span")
        d.id = 'saved'
        d.style.color = "green"
        d.style.display = "inline"
        //TODO change save language
        getTranslation("saved").then(translation => {
            console.log(translation)
            d.innerText = translation
        })
        component.parentNode.appendChild(d);

        setTimeout( function() {
            d.remove()
        },300)
    }
}

//console.log(chromeStorage().getByName(storedData.previewOnecanvas))
