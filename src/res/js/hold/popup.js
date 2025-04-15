function setupPopup(content){
    let popup = document.createElement("div");
    popup.id = "popup";

    // leave        
    document.addEventListener("click", function(event) {
        let popup = document.getElementById("popup");

        if (popup != null && !popup.contains(event.target)) {
            explode();
        }
    }, { passive: true });

    popup.innerText = content;
    document.body.insertBefore(popup, document.getElementById("main"));
}

async function popup(content){
    let previousPopup = document.getElementById("popup");

    if (previousPopup != null){

        const interval = setInterval(() => {
            const element = document.getElementById("popup");
            
            if (!element) {
                clearInterval(interval);
                setupPopup(content);
            }
        }, 100);
    } else {
        setupPopup(content);
    }
}

async function explode(){
    let popup = document.getElementById("popup");

    if ((window.matchMedia('(min-width: 768px)')).matches) {
        popup.style.animationName = "slideIn-popup-exit";
    } else if ((window.matchMedia('(max-width: 768px)')).matches) {
        popup.style.bottom = "-100vh";

        setTimeout(() => {
            if(popup != null) popup.parentElement.removeChild(popup);  
        }, 500);

        return;
    }

    popup.addEventListener("animationend", (event) => {
        let popup = document.getElementById("popup");
        if(popup != null) popup.parentElement.removeChild(popup);  
    })
}

export async function loadContent() {
    let dropdown = document.getElementById("api-select");
    let apiRoot = `${window.location.protocol}//${window.location.hostname}${window.location.port ? ':3000' : ''}/api/v1`;

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

export async function checkSecurity() {
    let apiRoot = `${window.location.protocol}//${window.location.hostname}${window.location.port ? ':3000' : ''}/api/v1/admin/viewlog`;

    try {
        let resposne = await fetch(apiRoot );
        let data = await resposne.json();
        let ips = [];

        data.status.forEach(ip => {
            if (ip.succefull && !ips.includes(ip.ip)){
                ips.push(ip.ip);
            }       
        });

        popup(JSON.stringify(ips, null, 4));
    } catch (e) {
        popup(e);
    }
}