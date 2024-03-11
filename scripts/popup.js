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

import { chromeStorage, storedData } from "./storage.js"

//TODO/ERROR: when popup is open by the second time the canvas doesnt download as fast
chrome.runtime.sendMessage({todo:"miniatureCanvas-All"})

/* The Miniature appears when theres only one canvas?*/
var interval = 0
var intervalSpeed = 1000
var oneMiniature = true;
chromeStorage().getByName(storedData.updateInterval, function (value) {
    if (value) {
        intervalSpeed = value
    }
})
chromeStorage().getByName(storedData.previewOnecanvas,function (value) {
    oneMiniature = value
})

chrome.runtime.onMessage.addListener(function (message) {
    console.log(message)
    if (message.todo == "create") {
        if (Object.keys(message.canvas).length > !oneMiniature) {
            //TODO: pass the miniatures desired size in the createMiniatures and in the miniatureCanvas
            createMiniatures(message)
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
        img.src = message.canvas[i]
    }
}

function createCanvas(id) {
    let canvas = document.createElement("canvas");
    document.body.appendChild(canvas)

    chromeStorage().getByName(storedData.previewColor, function (value) {
        if (value!=true) {
            canvas.style.backgroundColor = value
        } else {
            //canvas.style.backgroundColor = "transparent"
            //document.body.style.backgroundColor = "transparent"
        }
    })


    //TODO verify if the is a value
    chromeStorage().getByName(storedData.previewSize, function (value) {
        if (!value) {
            value = 150
        }
        canvas.width = value
        canvas.height= value
    })
    canvas.addEventListener("click",function () {
        downloadCanvas(id)
    })
    chromeStorage().getByName(storedData.updateCanvas,function (value) {
        if (value == "update-always") {
            interval = setInterval(function () {miniatureCanvas(id)},intervalSpeed)
        } else {
            canvas.addEventListener("mouseover", function() {
                clearInterval(interval)
                interval = setInterval(function () {miniatureCanvas(id)},intervalSpeed)
            })
            chromeStorage().getByName(storedData.updateKeep, function (value) {
                if (value != true) {
                    canvas.addEventListener("mouseout", function() {
                        clearInterval(interval)
                    })
                }
            })
        }
    })
    return canvas
}

function miniatureCanvas(id) {
    chrome.runtime.sendMessage({todo:"miniatureCanvas","id":id})
}

function downloadCanvas(id) {
    chrome.runtime.sendMessage({todo:"downloadCanvas","id":id})
}