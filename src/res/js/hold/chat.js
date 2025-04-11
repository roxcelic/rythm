function spawnMessage(message){
    let newMessage = document.createElement("P");
    newMessage.textContent = message[0];
    newMessage.style.color = message[1];

    return newMessage;
}

function getOldChat(chat){
    let fullchatlog = chat.childNodes.length;
    return fullchatlog;
}

async function displayChat(interval = null) {
    let chat = document.getElementById("chat");
    let apiRoot = `${window.location.protocol}//${window.location.hostname}${window.location.port ? ':3000' : ''}/`;

    try {
        let response = await fetch(`${apiRoot}api/v1/chat/view`)
        let data = await response.json();
        data.chat = Array.isArray(data.chat) ? data.chat : [["basic message", "#783432"]];

        let difference = data.chat.slice(getOldChat(chat));
        
        difference.forEach(message => {
            chat.appendChild(spawnMessage(message));
        });

        return data;
    } catch (e) {
        console.log(e);
        if (interval != null) clearInterval(interval);
    }
}

export async function loadChat() {
    let display = setInterval(() => {
        displayChat(display, [])
    }, 1000); 
}

export async function sendMessage() {
    let data = {
        upload: document.getElementById("chatMessage").value,
        color: document.getElementById("chatColor").value
    }

    document.getElementById("chatMessage").value = "";

    let apiRoot = `${window.location.protocol}//${window.location.hostname}${window.location.port ? ':3000' : ''}/`;

    try {
        await fetch(`${apiRoot}api/v1/chat/post`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        displayChat();
    } catch (e) {
        console.log(e);
    }
}