export async function viewWords() {
    let dropdown = document.getElementById("chatWords");
    let apiRoot = `${window.location.protocol}//${window.location.hostname}${window.location.port ? ':3000' : ''}/`;
    
    try {
        let resposne = await fetch(`${apiRoot}api/v1/chat/filter/view`);
        let data = await resposne.json();

        data = data != "empty" ? data : [];
    
        data.forEach(item => {
            dropdown.appendChild(newOption(item));
        });
    } catch (e) {
        console.log(e);
    }
}

export async function removeWord() {
    let apiRoot = `${window.location.protocol}//${window.location.hostname}${window.location.port ? ':3000' : ''}/`;
    let value = document.getElementById("chatWords").value;

    try {
        await fetch(`${apiRoot}api/v1/chat/filter/remove?word=${value}`);
    } catch (e) {
        console.log(e);
    }
}

export async function addWord() {
    let apiRoot = `${window.location.protocol}//${window.location.hostname}${window.location.port ? ':3000' : ''}/`;
    let value = document.getElementById("chatWordsInput").value;

    try {
        let response = await fetch(`${apiRoot}api/v1/chat/filter/add?word=${value}`);
        let data = await response.json();

        console.log(data);
    } catch (e) {
        console.log(e);
    }
}

function newOption(value) {
    let option = document.createElement("option");

    option.value = value;
    option.innerText = value;

    return option;
}