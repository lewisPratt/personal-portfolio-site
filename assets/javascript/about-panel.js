const overlay = document.querySelector("#overlay");
const aboutPanel = document.querySelector("#about-panel");
let aboutPanelOpen = false;

document.querySelector("#close-about-panel").addEventListener("click", () => {
    closeAboutPanel();
})

const aboutLink = document.querySelector("#about-link").addEventListener("click", () => {
    aboutPanel.classList.toggle("about-reveal");

    if (aboutPanel.classList.contains("about-reveal")) {
        aboutPanel.scrollIntoView();
        overlay.classList.add("overlay-visible-position");
        overlay.classList.add("overlay-fade-in");

    } else {
        overlay.classList.add("overlay-fade-out");


    }

})
// Listen for the end of the overlay animation to remove the fade-in and fade-out classes
overlay.addEventListener("animationend", () => {
    if (overlay.classList.contains("overlay-fade-in")) {
        overlay.classList.remove("overlay-fade-in");
        aboutPanelOpen = true;
    }
    if (overlay.classList.contains("overlay-fade-out")) {
        overlay.classList.remove("overlay-fade-out");
        overlay.classList.remove("overlay-visible-position");
        aboutPanelOpen = false;
    }


})

// Close the about panel when clicking outside of it
overlay.addEventListener("click", () => {
    if (aboutPanel.classList.contains("about-reveal")) {
        closeAboutPanel();
    }
})

// Close the about panel when scrolling
window.onscroll = () => {
    if (aboutPanel.classList.contains("about-reveal") && aboutPanelOpen) {
        closeAboutPanel();
    }
}

function closeAboutPanel() {
    if (aboutPanel.classList.contains("about-reveal")) {
        aboutPanel.classList.remove("about-reveal");
        overlay.classList.add("overlay-fade-out");
    }
}