import { posts } from './data.js'; // Import posts data from external file

// Select the main HTML element where posts will be displayed
const main = document.querySelector('main');

// Function to generate HTML for all posts
function renderPosts(posts) {
    let htmlString = ''; // Initialize an empty string to accumulate HTML for all posts

    // Loop through each post and append its HTML to htmlString
    for (let post of posts) {
        htmlString += getHtmlString(post);
    }

    // Render all posts and insert them into the main element
    main.innerHTML = htmlString;

    // Call function to attach double-click event listeners to like icons
    attachLikeListeners();
}

// Function to generate HTML for a single post
function getHtmlString(post) {
    return `
        <div class="post">
            <div class="author-info">
                <img alt="User Avatar" class="author-avatar" src="${post.avatar}">
                <div>
                    <h2 class="author-name">${post.name}</h2>
                    <h3 class="author-location">${post.location}</h3>
                </div>
            </div>
            <img alt="Post Image" src="${post.post}" class="post-img">
            <div class="icon-container">
                <img 
                    data-icon="${post.username}" 
                    class="icon icon-heart" 
                    alt="Like post" 
                    src="images/icon-heart.png"
                >
                <img 
                    class="icon icon-comment" 
                    alt="Comment on post" 
                    src="images/icon-comment.png"
                >
                <img 
                    class="icon icon-share" 
                    alt="Share post" 
                    src="images/icon-dm.png"
                >
            </div>
            <div class="post-engagement">
                <h2 id="${post.username}" class="like-count">${post.likes} likes</h2>
                <p class="comment-username">
                    ${post.postCommenter} 
                    <span class="comment-text">${post.comment}</span>
                </p>
            </div>
        </div>
    `;
}

// Function to attach event listeners to each like icon
function attachLikeListeners() {
    main.addEventListener('dblclick', function (e) {
        if (e.target.classList.contains('icon-heart')) {
            const likedIcon = e.target;
            // Find the post object related to the clicked like icon
            const likedObj = posts.find(post => likedIcon.dataset.icon === post.username);
            // Toggle the like status for the selected post
            toggleLike(likedObj, likedIcon);
        }
    });
}

// Function to toggle the like status of a post
function toggleLike(likedObj, likeIcon) {
    // Check if the post is already liked
    likedObj.isLiked ? likedObj.likes-- : likedObj.likes++;

    // Update the displayed like count in the HTML
    updateLikeCount(likedObj);

    // Toggle the 'icon-heart-liked' class to visually indicate like status
    likeIcon.classList.toggle('icon-heart-liked');

    // Toggle the 'isLiked' status for the post object
    likedObj.isLiked = !likedObj.isLiked;
}

// Function to update the displayed like count in the HTML
function updateLikeCount(likedObj) {
    const likeCountElement = document.getElementById(likedObj.username);
    likeCountElement.textContent = `${likedObj.likes} likes`;
}

// Initial render of posts
renderPosts(posts);
