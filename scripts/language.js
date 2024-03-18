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