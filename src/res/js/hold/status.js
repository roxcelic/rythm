export async function postStatus() {
    let text = document.getElementById("status/text").value;
    let image = document.getElementById("status/image").value;

    let compressedData = {
        message: text,
        image
    }

    let baseUrl = `${window.location.protocol}//${window.location.hostname}${window.location.port ? ':3000' : ''}/`;

    try {
        const response = await fetch(`${baseUrl}api/v1/admin/changeStatus`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ text: compressedData })
        });

        const result = await response.json();
        alert(result.status);
    } catch (e) {
        alert(e);
    }
}