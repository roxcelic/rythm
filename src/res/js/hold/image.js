export function DisplayImage() {
    let fileInput = document.getElementById('image');
    let imagePreview = document.getElementById('imagePreview');

    let file = fileInput.files[0];
  
    if (file) {
      let reader = new FileReader();
      reader.onload = function (e) {
        let img = document.createElement('img');
        img.src = e.target.result;
        
        imagePreview.innerHTML = '';
        imagePreview.appendChild(img);
      };
      
      reader.readAsDataURL(file);
    } else {
      fileNameDisplay.textContent = 'No file chosen';
      imagePreview.innerHTML = '';
    }
}

export async function submit(e) {
    e.preventDefault();
    
    let form = document.getElementById('uploadForm');
    let result = document.getElementById('image/result');
    let formData = new FormData(form);
  
    try {
        let response = await fetch(`http://${window.location.hostname}:3000/api/v1/admin/upload`, {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Upload failed');
      }
      
      let data = await response.json();

      result.style.color = "white";
      result.innerText = data.status;

      window.location.href = window.location.href;
    } catch (e) {
        result.style.color = "red";
        result.innerText = e;
    }
}

async function deleteImage(url) {
    let compressedData = {
      "fileName": url,
  }

  try {
      await fetch(`http://${window.location.hostname}:3000/api/v1/admin/deleteUpload`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({ text: compressedData })
      });

      window.location.href = window.location.href;
  } catch(e){
    console.log(e)
  }
}

function copyUrl(url){
  alert(`you have to manually copy this: ${url}`);
}

// i got this from https://sentry.io/answers/how-do-i-copy-to-the-clipboard-in-javascript/ so...
async function copyImgToClipboard(imgUrl) {
  try {
    const data = await fetch(imgUrl);
    const blob = await data.blob();
    await navigator.clipboard.write([
      new ClipboardItem({
        [blob.type]: blob,
      }),
    ]);
    alert('Image copied.');
  } catch (err) {
    alert(err.name, err.message);
  }
}

function downloadImage(imgUrl) {
  window.location.href = imgUrl;
}

function spawnNewImage(url) {
  let newImage = document.createElement('div');
  newImage.className = "imageHost";

  let newImage_image = document.createElement('div');
  newImage_image.className = "image"
  newImage_image.style.backgroundImage = `url('http://${window.location.hostname}:3000/media/${url}')`;

  let newImage_actions = document.createElement('div');
  newImage_actions.className = "imageActions";

  let Ps = [];

  Ps[0] = document.createElement('p');
    Ps[0].textContent = "copy image";
    Ps[0].addEventListener("click", () =>{
      copyImgToClipboard(`http://${window.location.hostname}:3000/media/${url}`);
    });
  
  Ps[1] = document.createElement('p');
    Ps[1].textContent = "copy url";
    Ps[1].addEventListener("click", () =>{
      copyUrl(`https://api.roxcelic.love/media/${url}`);
    });
  
  Ps[2] = document.createElement('p');
    Ps[2].textContent = "delete image";
    Ps[2].addEventListener("click", () =>{
      deleteImage(url);
    });
  
  Ps[3] = document.createElement('p');
    Ps[3].textContent = "download image";
    Ps[3].addEventListener("click", () =>{
      downloadImage(`http://${window.location.hostname}:3000/media/${url}`);
    });

  Ps.forEach(p => {
    newImage_actions.appendChild(p)
  });

  newImage.appendChild(newImage_image);
  newImage.appendChild(newImage_actions);

  return newImage;
}

export async function loadImages() {
  let imageHold = document.getElementById('imageHold');

  try {
    let resposne = await fetch(`http://${window.location.hostname}:3000/api/v1/paths?method=0`);
    let data = await resposne.json()

    data.forEach(image => {
      imageHold.appendChild(spawnNewImage(image));
      imageHold.appendChild(document.createElement('hr'))
    });

  } catch (e) {
    console.log(e);
  }
}