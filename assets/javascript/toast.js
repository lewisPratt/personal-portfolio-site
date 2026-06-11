//Init code for Bootstrap Toasts
const template = document.querySelector('.template-toast');
const toastContainer = document.querySelector(".toast-container");


function showToast(titleText, bodyText) {
    let clone = template.cloneNode(true);
    clone.classList.remove("template-toast");

    clone.querySelector(".toast-title").innerText = titleText;
    clone.querySelector(".toast-body").innerText = bodyText;

    let newToast = bootstrap.Toast.getOrCreateInstance(clone);
    toastContainer.appendChild(clone);
    newToast.show();
    
    clone.addEventListener("hidden.bs.toast", () => clone.remove());

}


// showToast("this is a test title", "this is test body text");
