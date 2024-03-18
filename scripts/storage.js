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
  preview:{
    size: "previewSize",
    onecanvas: "previewOnecanvas",
    orientationC: "previewOrientation",
    color: "previewColor",
  },
  update: {
    canvas: "updateCanvas",
    keep: "updateKeep",
    interval: "updateInterval"
  }
}

export var defaultData = {
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