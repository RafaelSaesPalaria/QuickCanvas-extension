var language

detectLanguage()
export function detectLanguage() {
    let l = navigator.language || navigator.userLanguage
    return new Promise((resolve, reject) => {
        fetch(`../_locales/${l}/messages.json`).then(
            response => {resolve(language = l)},
            error => {reject(language = "en")}
        )
    })
}

/**
 * @Called After the options.js or popup.js have detected the user language
 * @Do Get the disponible language at _locales and then get all the html elements 
 * with the id of the name of one of the messages and change its text to the
 * translated version
 */
export function applyLanguage() {
    fetch(`../_locales/${language}/messages.json`).then(response => response.json()).then(translation => {
        for (let t in translation) {
            if (document.querySelector(`#${t}`)) {
                document.querySelector(`#${t}`).innerText = `${translation[t].message}`
            }
        }
    }).catch(error => {
        console.log("Error:"+error)
    })
}

/**
 * @Called by the saved obj in the options.js
 * @Do Search in the disponible langue for the dataName
 * create a promisse to send back the text of the message
 * @param {String} dataName the id of the html element and the name of the obj in the 
 * _locales
 * @returns send back the text of the message as a promisse
 */
export function getTranslation(dataName) {
    return new Promise((resolve, reject) => {
        fetch(`../_locales/${language}/messages.json`).then(response => response.json()).then( translation => {
            resolve(translation[dataName]["message"])
        }).catch(error => {
            console.log("Error:"+error)
        })
    })
}


/*chrome.i18n.getMessage("messagename")*/