import { loadContent, checkSecurity } from "./hold/popup";
import { LoadPosts, submitPost, LoadPost, deletePost } from "./hold/blog";
import { DisplayImage, submit, loadImages, submitAlt } from "./hold/image";
import { postStatus } from "./hold/status";
import { loadChat, sendMessage, deleteChat } from "./hold/chat";

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

            let button2 = document.getElementById("SecurityButton");
            if (button2) button2.addEventListener("click", checkSecurity);

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
            document.getElementById("chatDelete").addEventListener("click", deleteChat);
            
            document.getElementById("chatMessage").addEventListener('keydown', function(event) {
                if (event.key === 'Enter') {
                    sendMessage()
                }
            });

            // save the color
            let color = document.getElementById("chatColor");
            color.value = document.cookie.split('; ').find(row => row.startsWith('color='))?.split('=')[1];
            
            let speed = document.getElementById("chatSpeed");
            let speedval = document.cookie.split('; ').find(row => row.startsWith('speed='))?.split('=')[1];
            speed.value = parseInt(speedval != undefined ? parseInt(speedval) : 1000);

            let chatRoom = document.getElementById("chatroom");
            chatRoom.textContent = document.cookie.split('; ').find(row => row.startsWith('room='))?.split('=')[1];
            
            let userName = document.getElementById("chatname");
            userName.textContent = document.cookie.split('; ').find(row => row.startsWith('name='))?.split('=')[1];

            color.addEventListener('input', function() {
                document.cookie = `color=${this.value}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/`;
            });

            speed.addEventListener('input', function() {
                document.cookie = `speed=${this.value}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/`;
            });

            chatRoom.addEventListener('input', function() {
                document.cookie = `room=${this.value}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/`;
            });

            userName.addEventListener('input', function() {
                document.cookie = `name=${this.value}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/`;
            });

            chatRoom.addEventListener('input', function() {
                document.getElementById("chat").innerHTML = "";
            });

            break;
    }
});