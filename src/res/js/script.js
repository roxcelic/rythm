function popup(content){
    if (document.getElementById("popup") == null){
        let popup = document.createElement("div");
        popup.id = "popup";

        // leave
        popup.addEventListener("mouseleave", explode);
        
        document.addEventListener("touchstart", function(event) {
            if (!popup.contains(event.target)) {
                explode();
            }
        }, { passive: true });

        popup.innerText = content;
        document.body.insertBefore(popup, document.getElementById("main"));
    }
}

function explode(){
    let popup = document.getElementById("popup");
    popup.style.animationName = "slideIn-popup-leave";

    popup.addEventListener("animationend", (event) => {
        let popup = document.getElementById("popup");
        popup.parentElement.removeChild(popup);  
    })
}

async function loadContent() {
    let dropdown = document.getElementById("api-select");
    let apiRoot = "http://localhost:3000/api/v1"

    if (dropdown.value != "Select"){
        try {
            let resposne = await fetch(apiRoot + dropdown.value);
            let data = await resposne.json();

            popup(JSON.stringify(data, null, 4));
        } catch (e) {
            popup(e);
        }
    }
}

addEventListener("DOMContentLoaded", (event) => {
    document.getElementById("button").addEventListener("click", loadContent);
});