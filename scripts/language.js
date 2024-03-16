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
        console.log("Language not avaliable, changing to en")
        applyLanguage("en")
    })
}

/*chrome.i18n.getMessage("messagename")*/