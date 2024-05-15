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

/**
 * @Called When a item is stores/acess
 * @Do Store/Acess the data
 * @returns the methods to acess/store
 */
export function chromeStorage() {
  /**
   * @Called When the option.html is open
   * @Do get all the stored info
   * @param {Function} callback the return method with the data
   */
    function getAll(callback) {
        chrome.storage.sync.get(function(total){
            callback(total)
          })
    }
  
    /**
     * @Called ------------
     * @Do Get a value by its name
     * @param {String} name The key of the item
     * @param {Function} callback the return method with the data
     */
    function getByName(name,callback) {
      chrome.storage.sync.get(function(total){
        callback(total[name])
      })
    }

    /**
     * @Called When a value is added/changed
     * @Do Set the value of the key
     * @param {String} key 
     * @param {String} value 
     */
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