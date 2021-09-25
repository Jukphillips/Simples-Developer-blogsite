const id = []


const loginFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector("#username-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();

  if (username && password) {
    const response = await fetch("/user/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      console.log('Logged In!!')
      document.location.replace("/");
    } else {
      alert("Failed to log in.");
    }
  }
};

const signupFormHandler = async (event) => {
  event.preventDefault();


  const username = document.querySelector("#username-register").value.trim();
  const password = document.querySelector("#password-register").value.trim();

  if (username && password) {
    const response = await fetch("/user/register", {
      method: "POST",
      body: JSON.stringify({  username, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/");
      console.log('You sucessfully signed up!')
    } else {
      alert("Failed to sign up.");
    }
  }
};

const logout = async () => {
  const response = await fetch("/user/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/");
  } else {
    alert("Failed to log out.");
  }
};

const newPost = async (event) => {
  event.preventDefault();

  const newPostTitle = document.querySelector("#titleInput").value.trim();
  const newPostContent = document.querySelector("#contentInput").value.trim();

  if(newPostTitle && newPostContent){
    const response = await fetch("/api/post", {
      method: "Post",
      body: JSON.stringify({newPostTitle, newPostContent}),
      headers: {"Content-Type": "application/json"},
    })


    if(response.ok){
    document.location.replace('/')
    console.log("You sucessfully submitted a new Post!")
  } else {
    alert("Failed to submit your post!")
  }
  }

}


const updateYourPost = async (event) => {
  event.preventDefault();


  const updatePostTitle = document.querySelector("#titleInput").value.trim();
  const updatePostContent = document.querySelector("#contentInput").value.trim();
  if(event.target.hasAttribute("data-id")){
  id.push(event.target.getAttribute("data-id"))}

  console.log(updatePostTitle + updatePostContent + id)
     
  if(updatePostTitle && updatePostContent && id){
    const response = await fetch("/api/post/updatePost", {
      method: "PUT",
      body: JSON.stringify({updatePostTitle, updatePostContent, id}),
      headers: {"Content-Type": "application/json"},
    })


    if(response.ok){
    document.location.replace('/')
    console.log("You sucessfully updated this Post!")
  } else {
    alert("Failed to update your post!")
  }
  }

}

const deletePost = async (event) => {  
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/post/${id}`, {
        method: 'DELETE'
    })

    if (response.ok) {
  document.location.replace("/dashboard") } 

  }
  
  
}

const commentPost = async (event) => {
  event.preventDefault();

  const contentComment = document.querySelector("#commentcontentInput").value.trim()
  if(event.target.hasAttribute("data-id")){
    
   const post_id = event.target.getAttribute("data-id")
  


  if(contentComment && post_id){
    
    const response = await fetch('/api/comment', {
      method: "Post",
      body: JSON.stringify({contentComment, post_id}),
      headers: {"Content-Type": "application/json"},
    }).catch (error => {
      console.log(error)
    })

    if(response.ok){
    document.location.replace(`/api/post/${post_id}`)
    console.log("You sucessfully submitted a new comment!")
  } else {
    alert("Failed to comment!")
  }
  }
}
}







var newPostCheck = document.querySelector("#newPostBtn")
if(newPostCheck){
  newPostCheck.addEventListener("click", newPost)
}

var log = document.getElementById("logout")
if(log) {
log.addEventListener("click", logout);
}

var login = document.querySelector(".login-form")
if(login) {login.addEventListener("click", loginFormHandler);}

var signup = document.querySelector(".signup-form")
if(signup){signup.addEventListener("click", signupFormHandler);}

var updatePost = document.querySelector("#updatePostBtn")
if(updatePost){ updatePost.addEventListener("click", updateYourPost)}

var commentNewPost = document.querySelector("#commentPostBtn")
if(commentNewPost){
  commentNewPost.addEventListener("click", commentPost )
}

var deletePostEvent = document.querySelector("#deletePostBtn")
if(deletePostEvent){
  deletePostEvent.addEventListener("click", deletePost)
}