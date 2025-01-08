const userId = 1;
const userInfo = document.getElementById("user-info");
const postList = document.getElementById("post-list");

function displayUser(user) {
    document.getElementById("user-name").querySelector("span").textContent = user.name;
    document.getElementById("user-email").querySelector("span").textContent = user.email;
    document.getElementById("user-city").querySelector("span").textContent = user.address.city;
}

function displayPosts(posts) {
    postList.innerHTML = "";
    posts.forEach(post => {
        const li = document.createElement("li");
        li.textContent = post.title;
        postList.appendChild(li);
    });
}

function getUserWithCallback(callback) {
    const url = `https://jsonplaceholder.typicode.com/users/${userId}`;
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.onload = () => {
        if (xhr.status === 200) {
            const user = JSON.parse(xhr.responseText);
            callback(user);
        }
    };
    xhr.onerror = () => alert("Error fetching user data");
    xhr.send();
}

function getPostsWithPromise() {
    return fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
        .then(response => response.json())
        .catch(() => alert("Error fetching posts data"));
}


function loadWithPromise() {
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
        .then(response => response.json())
        .then(user => {
            displayUser(user);
            return getPostsWithPromise();
        })
        .then(posts => displayPosts(posts))
        .catch(() => alert("Error fetching data"));
}


async function loadWithAsyncAwait() {
    try {
        const [userResponse, postsResponse] = await Promise.all([
            fetch(`https://jsonplaceholder.typicode.com/users/${userId}`),
            fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
        ]);

        const user = await userResponse.json();
        const posts = await postsResponse.json();

        displayUser(user);
        displayPosts(posts);
    } catch (error) {
        alert("Error fetching data");
    }
}

document.getElementById("callback-btn").addEventListener("click", () => {
    getUserWithCallback(user => {
        displayUser(user);
        getPostsWithPromise().then(posts => displayPosts(posts));
    });
});

document.getElementById("promise-btn").addEventListener("click", loadWithPromise);
document.getElementById("async-await-btn").addEventListener("click", loadWithAsyncAwait);
