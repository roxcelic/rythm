export async function postStatus() {
    let text = document.getElementById("status/text").value;
    let image = document.getElementById("status/image").value;

    let compressedData = {
        message: text,
        image
    }

    console.log(compressedData);

    try {
        const response = await fetch(`http://${window.location.hostname}:3000/api/v1/admin/changeStatus`, {
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