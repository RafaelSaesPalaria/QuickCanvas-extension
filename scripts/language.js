export function detectLanguage() {
    applyLanguage(navigator.language || navigator.userLanguage)
}

export function applyLanguage(language) {
    fetch(`../_locales/${language}/messages.json`).then(response => response.json()).then(translation => {
        console.log(translation)
        for (let t in translation) {
            if (document.querySelector(`#${t}`)) {
                document.querySelector(`#${t}`).innerText = `${translation[t].message}`
            }
        }
    }).catch(error => { // Detect a language that is not there 
        if (language!="en") {
            console.log("Language not avaliable, changing to en")
            applyLanguage("en")
        } else {
            console.log(error)
        }
    })
}

export function getTranslation(dataName) {
    let language = (navigator.language || navigator.userLanguage)
    return new Promise((resolve, reject) => {
        fetch(`../_locales/${language}/messages.json`).then(response => response.json()).then( translation => {
            resolve(translation[dataName]["message"])
        }).catch(error => {
            fetch(`../_locales/en/messages.json`).then(response => response.json()).then( translation => {
                resolve(translation[dataName]["message"])
            })
        })
    })
}

/*chrome.i18n.getMessage("messagename")*/