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

import { chromeStorage, storedData, defaultData } from "./storage.js"
import { applyLanguage, detectLanguage } from "./language.js"

/**
 * @Called When the popup is opened
 * @Do detect and set the language of the application
 */
detectLanguage().then(() => {
    applyLanguage()
})



/**
 * @Called When the popup is opened
 * @Do Set the values of the storedData to the actualData 'default'
 * @param {Function} callback 
 */
chromeStorage().getAll(function (callback) {
    applyCallbackToData(callback)
})
function applyCallbackToData(callback) {
    for (let key0 in defaultData) {
        for (let key1 in defaultData[key0]) {
            if (callback[storedData[key0][key1]]) {
                defaultData[key0][key1] = callback[storedData[key0][key1]]
            }
        }
    }
}







//TODO/ERROR: when popup is open by the second time the canvas doesnt download as fast
chrome.runtime.sendMessage({todo:"miniatureCanvas-All",size:defaultData.preview.size})

/* The Miniature appears when theres only one canvas?*/
var interval = 0
var oneMiniature = defaultData.preview.onecanvas;

chrome.runtime.onMessage.addListener(function (message) {
    console.log(message)
    if (message.todo == "create") {
        if (Object.keys(message.canvas).length > !oneMiniature) {
            createMiniatures(message)
            if (defaultData.preview.orientationC==='preview_orientation_landscape') {
                let canvas = document.querySelectorAll('canvas')
                let totalWidth = 0
                canvas.forEach((c) => {
                    console.log(c.width)
                    totalWidth+=c.width+12
                })
                console.log(totalWidth)
                document.body.style.width = `${totalWidth}px`
            }
            
        } else {
            downloadCanvas(0)
        }
    } else if (message.todo == "edit") {
        let canvas = document.querySelectorAll("canvas")[message.id]
        let c = canvas.getContext("2d")
        
        let img = new Image();
        img.onload = function() {
            c.clearRect(0,0,canvas.width,canvas.height)
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
            let bigger = Math.max(img.height, img.width)
            let smaller = Math.min(img.height, img.width)

            let r = smaller/bigger

            canvas.width = smaller===img.width ? r*img.height : img.width     
            canvas.height = smaller===img.height ? r*img.width : img.height

            c.drawImage(img, 0,0, canvas.width, canvas.height)
        };
        img.src = message.canvas[i]
    }
}

function createCanvas(id) {
    let canvas = document.createElement("canvas");
    document.body.appendChild(canvas)
    canvas.style.backgroundColor = defaultData.preview.color
    canvas.width = canvas.height = defaultData.preview.size

    canvas.addEventListener("click",function () {
        downloadCanvas(id)
    })
    if (defaultData.update.canvas == "update-always") {
        interval = setInterval(function () {miniatureCanvas(id)},defaultData.update.interval)
    } else {
        canvas.addEventListener("mouseover", function() {
            clearInterval(interval)
            interval = setInterval(function () {miniatureCanvas(id)},defaultData.update.interval)
        })
        if (defaultData.update.keep != true) {
            canvas.addEventListener("mouseout", function() {
                clearInterval(interval)
            })
        }
    }
    return canvas
}

/**
 * @Called when you hover a canvas
 * @Do send a message to the content.js to give a canvas
 * @param {Number} id canvas id 
 */
function miniatureCanvas(id) {
        chrome.runtime.sendMessage({todo:"miniatureCanvas","id":id,"size":defaultData.preview.size})
}

/**
 * @Called when you click a canvas
 * @Do send a message to the content.js to download a canvas
 * @param {Number} id canvas id
 */
function downloadCanvas(id) {
    chrome.runtime.sendMessage({todo:"downloadCanvas","id":id})
}