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
    let apiRoot = `${window.location.protocol}//${window.location.hostname}${window.location.port ? ':3000' : ''}/`;
  
    try {
        let response = await fetch(`${apiRoot}api/v1/admin/upload`, {
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

export async function submitAlt(e) {
  e.preventDefault();
  
  let form = document.getElementById('uploadForm');
  let result = document.getElementById('image/result');
  let formData = new FormData(form);

  let apiRoot = `${window.location.protocol}//${window.location.hostname}${window.location.port ? ':3000' : ''}/`;

  try {
      let response = await fetch(`${apiRoot}api/v1/admin/wallpaper/upload`, {
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

  let apiRoot = `${window.location.protocol}//${window.location.hostname}${window.location.port ? ':3000' : ''}/`;

  try {
      await fetch(`${apiRoot}api/v1/admin/deleteUpload`, {
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
  let urlHold = document.getElementById("url");
  let urlLink = urlHold.children[0];
  
  urlLink.href = url;
  urlLink.textContent = url;

  alert("url added to the top of the page");
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
  let apiRoot = `${window.location.protocol}//${window.location.hostname}${window.location.port ? ':3000' : ''}/`;

  let newImage = document.createElement('div');
  newImage.className = "imageHost";

  let newImage_image = document.createElement('div');
  newImage_image.className = "image"
  newImage_image.style.backgroundImage = `url('${apiRoot}media/${url}')`;
  newImage_image.textContent = url;

  let newImage_actions = document.createElement('div');
  newImage_actions.className = "imageActions";

  let Ps = [];

  Ps[0] = document.createElement('p');
    Ps[0].textContent = "copy";
    Ps[0].addEventListener("click", () =>{
      copyImgToClipboard(`${apiRoot}media/${url}`);
    });
  
  Ps[1] = document.createElement('p');
    Ps[1].textContent = "copy url";
    Ps[1].addEventListener("click", () =>{
      copyUrl(`${apiRoot}media/${url}`);
    });
  
  Ps[2] = document.createElement('p');
    Ps[2].textContent = "delete";
    Ps[2].addEventListener("click", () =>{
      deleteImage(url);
    });
  
  Ps[3] = document.createElement('p');
    Ps[3].textContent = "download";
    Ps[3].addEventListener("click", () =>{
      downloadImage(`${apiRoot}media/${url}`);
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
    let resposne = await fetch(`${apiRoot}api/v1/paths?method=0`);
    let data = await resposne.json()

    data.forEach(image => {
      imageHold.appendChild(spawnNewImage(image));
      imageHold.appendChild(document.createElement('hr'))
    });

  } catch (e) {
    console.log(e);
  }
}