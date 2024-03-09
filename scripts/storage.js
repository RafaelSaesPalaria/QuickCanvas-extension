export var storedData = {
    previewOnecanvas: "previewOnecanvas",
    previewOrientation: "previewOrientation",
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