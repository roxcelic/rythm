export async function LoadPosts() {
    let dropdown = document.getElementById("blog-select");
    let apiRoot = `${window.location.protocol}//${window.location.hostname}${window.location.port ? ':3000' : ''}/`;

    dropdown.innerHTML = "";

    try {
        let resposne = await fetch(`${apiRoot}api/v1/paths?method=1`);
        let data = await resposne.json();

        data.forEach(item => {
            dropdown.appendChild(newOption(item))    
        });

        LoadPost(dropdown.value);
    } catch (e) {
        console.log(e);
    }
}

export async function LoadPost(value) {
    value = value.slice(0, -3);
    let apiRoot = `${window.location.protocol}//${window.location.hostname}${window.location.port ? ':3000' : ''}/`;
    let url = `${apiRoot}api/v1/blog?post=${value}`;

    try {
        let resposne = await fetch(url);
        let data = await resposne.json();

        document.getElementById("post/name").value = value;
        document.getElementById("post/text").value = data.message;
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

export async function submitPost() {
    let responseBlock = document.getElementById("post/response");

    let name = document.getElementById("post/name").value;
    let text = document.getElementById("post/text").value;

    let compressedData = {
        "fileName": name,
        "message": text
    }

    let apiRoot = `${window.location.protocol}//${window.location.hostname}${window.location.port ? ':3000' : ''}/`;

    try {
        const response = await fetch(`${apiRoot}api/v1/admin/blog/edit`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ text: compressedData })
        });

        const result = await response.json();

        responseBlock.style.color = "white";
        responseBlock.innerText = result;
    } catch (e) {
        console.log(e);

        responseBlock.style.color = "red";
        responseBlock.innerText = e;
    }

    LoadPosts();
}

export async function deletePost() {
    let responseBlock = document.getElementById("post/response");

    let name = document.getElementById("post/name").value;

    let compressedData = {
        "fileName": name,
    }

    let apiRoot = `${window.location.protocol}//${window.location.hostname}${window.location.port ? ':3000' : ''}/`;

    try {
        const response = await fetch(`${apiRoot}api/v1/admin/blog/delete`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ text: compressedData })
        });

        const result = await response.json();

        responseBlock.style.color = "white";
        responseBlock.innerText = result.status;
    } catch (e) {
        console.log(e);

        responseBlock.style.color = "red";
        responseBlock.innerText = e;
    }

    LoadPosts();
}