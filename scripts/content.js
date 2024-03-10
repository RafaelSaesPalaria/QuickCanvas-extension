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

//TODO: Select ALL Canvas and let the user choose

chrome.runtime.onMessage.addListener(function name(message) {
    if (message.todo == "downloadCanvas") {
        downloadCanvas(message.id)
    } else if (message.todo == "miniatureCanvas-All") {
        miniatureCanvas_All()
    } else if (message.todo == "miniatureCanvas") {
        miniatureCanvas(message.id)
    }
})

function downloadCanvas(id) {
    let canvas = document.querySelectorAll("canvas")[id]
    let link = document.createElement("a")
    let data = canvas.toDataURL()
    link.download = data
    link.href = data
    link.click()
}

function miniatureCanvas(id) {
    let canvas = document.querySelectorAll("canvas")[id]
    //TODO: change the resize value from 300 to the stored value
    let tmpCanvas = resizeTo(canvas, 300)

    tmpCanvas.getContext("2d").drawImage(canvas,0,0,tmpCanvas.width, tmpCanvas.height)
    canvas = tmpCanvas.toDataURL()
    chrome.runtime.sendMessage({canvas,"todo":"edit","id":id})
}

function miniatureCanvas_All() {
    let canvasd = document.querySelectorAll("canvas")
    let canvas = {}
    for (let i=0; i<canvasd.length;i++) {
        //TODO: change the resize value from 300 to the stored value
        let tmpCanvas = resizeTo(canvasd[i], 300)

        tmpCanvas.getContext("2d").drawImage(canvasd[i],0,0,tmpCanvas.width, tmpCanvas.height)
        canvas[i] = tmpCanvas.toDataURL()
    }
    chrome.runtime.sendMessage({canvas,"todo":"create"})
}

function resizeTo(canvas, size) {
    let tmpCanvas = document.createElement("canvas")
    tmpCanvas = Object.assign(tmpCanvas,canvas)
    if (canvas.height>canvas.width) {
        let r = canvas.width/canvas.height
        tmpCanvas.width = r*size
        tmpCanvas.height= size
    } else {
        let r = canvas.height/canvas.width
        tmpCanvas.height =r*size
        tmpCanvas.width = size
    }
    return tmpCanvas
}