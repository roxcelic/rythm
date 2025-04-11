import { loadContent } from "./hold/popup";
import { LoadPosts, submitPost, LoadPost, deletePost } from "./hold/blog";
import { DisplayImage, submit, loadImages, submitAlt } from "./hold/image";
import { postStatus } from "./hold/status";
import { loadChat, sendMessage } from "./hold/chat";

addEventListener("DOMContentLoaded", (event) => {
    let path = ((window.location.pathname).split("/"))[2];
    const menuItem = document.getElementById(`menu/${path}`).style;
    menuItem.height = "6vh";
    menuItem.backgroundColor = "pink";
    menuItem.border = "4px solid black";

    switch (path){
        case "api":
            let button = document.getElementById("button");
            if (button) button.addEventListener("click", loadContent);

            break;
        case "blog":
            LoadPosts();
            document.getElementById("post/submit").addEventListener("click", submitPost);
            document.getElementById("post/delete").addEventListener("click", deletePost);

            let dropdown = document.getElementById("blog-select");
            dropdown.addEventListener('change', function() {
                LoadPost(dropdown.value);
            });

            break;
        case "images":
            document.getElementById('image').addEventListener('change', DisplayImage);
            document.getElementById('uploadForm').addEventListener('submit', submit);

            loadImages();

            break;
        
        case "status":
            document.getElementById('status/publish').addEventListener('click', postStatus);

            break;

        case "post":
            document.getElementById('image').addEventListener('change', DisplayImage);
            document.getElementById('uploadForm').addEventListener('submit', submitAlt);

            loadImages();

            loadChat();
            document.getElementById("chatSend").addEventListener("click", sendMessage);
            
            document.getElementById("chatMessage").addEventListener('keydown', function(event) {
                if (event.key === 'Enter') {
                    sendMessage()
                }
            });

            break;
    }
});