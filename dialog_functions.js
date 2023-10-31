
// select dialog element
// const dialog = () => typeof TEST === 'undefined' ? document.querySelector("dialog") : null;
const dialog = document.querySelector("dialog");

// select button close of the dialog
// const closeButton = () => typeof TEST === 'undefined' ? document.querySelector("dialog button") : null;
const closeButton = document.querySelector("dialog button");

// "Close" button closes the dialog
closeButton.addEventListener("click", () => {
    dialog.close();
});

/**
 * The function "show_message" displays a message in a dialog box if the variable "TEST" is not
 * defined.
 * @param message - The `message` parameter is a string that represents the message you want to
 * display.
 * @returns null.
 */
function show_message(message) {
    if (typeof TEST === 'undefined') {
        document.querySelector("#message p#message_text").innerHTML = message;
        dialog.showModal();
    }
    return null;
}

/**
 * The function restart_message is used to clear the innerHTML of a paragraph element with the id
 * "message_text" and close a dialog.
 */
function restart_message() {
    document.querySelector("#message p#message_text").innerHTML = '';
    dialog.close();
}
