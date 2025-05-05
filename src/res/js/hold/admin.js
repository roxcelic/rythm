export async function viewAdmins() {
    let dropdown = document.getElementById("adminIps");
    let apiRoot = `${window.location.protocol}//${window.location.hostname}${window.location.port ? ':3000' : ''}/`;
    
    try {
        let resposne = await fetch(`${apiRoot}api/v1/trueAdmin/viewTrustedIps`);
        let data = await resposne.json();

        data = data.ips != "empty" ? data.ips : [];
    
        data.forEach(item => {
            dropdown.appendChild(newOption(item));
        });
    } catch (e) {
        console.log(e);
    }
}

export async function removeAdmin() {
    let apiRoot = `${window.location.protocol}//${window.location.hostname}${window.location.port ? ':3000' : ''}/`;
    let value = document.getElementById("adminIps").value;

    try {
        await fetch(`${apiRoot}api/v1/trueAdmin/removeTrustedIp?Ip=${value}`);
    } catch (e) {
        console.log(e);
    }
}

export async function addAdmin() {
    let apiRoot = `${window.location.protocol}//${window.location.hostname}${window.location.port ? ':3000' : ''}/`;
    let value = document.getElementById("adminIpsInput").value;

    try {
        let response = await fetch(`${apiRoot}api/v1/trueAdmin/addTrustedIp?Ip=${value}`);
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