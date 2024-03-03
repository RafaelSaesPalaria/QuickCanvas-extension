let content = {
    submit: document.querySelector("input#submit")
}

// Send Message to pageEvent
submit.addEventListener("click",function () {
    chrome.runtime.sendMessage({todo:"downloadCanvas"})
})