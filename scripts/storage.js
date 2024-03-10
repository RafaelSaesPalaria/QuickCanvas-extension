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

export var storedData = {
    previewSize: "previewSize",
    previewOnecanvas: "previewOnecanvas",
    previewOrientation: "previewOrientation",
    previewColor: "previewColor",
    updateCanvas: "updateCanvas",
    updateKeep: "updateKeep",
    updateInterval: "updateInterval"
}

export function chromeStorage() {
    function getAll(callback) {
        chrome.storage.sync.get(function(total){
            callback(total)
          })
    }
  
    function getByName(name,callback) {
      chrome.storage.sync.get(function(total){
        callback(total[name])
      })
    }

    function set(key,value) {
        let data = {}
        data[key] = value
        chrome.storage.sync.set(data)
    }

    return { 
        getByName,
        getAll,
        set 
    }
}