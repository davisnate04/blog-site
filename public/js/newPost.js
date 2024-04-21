const listBody = document.querySelector("#listBody");

const newPost = async (event) => {
  event.preventDefault();

  let title = document.querySelector("#createTitle").value.trim();
  let post = document.querySelector("#createContent").value.trim();

  if (title && post) {
    const response = await fetch("/api/post/newPost", {
      method: "POST",
      body: JSON.stringify({ title, post }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      title = "";
      post = "";

      document.location.replace("/dashboard");
    } else {
      console.log(response.statusText);
    }
  }
};

const openPost = () => {
  const newPostTitle = document.querySelector("#newPostTitle");
  const newPost = document.querySelector("#newPost");

  newPost.classList.toggle("visible");
  newPostTitle.classList.toggle("visible");
  listBody.classList.toggle("visible");
};

const updatePost = async (id) => {
  const title = document.querySelector("#updateTitle").value.trim();
  const content = document.querySelector("#updateContent").value.trim();

  if (title && content) {
    const response = await fetch("/api/post/updatePost", {
      method: "PUT",
      body: JSON.stringify({ title, content, id }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      console.log(response.statusText);
    }
  }
};

const updatePostInfo = async (id) => {
  const updatePostTitle = document.querySelector("#updatePostTitle");
  const newPost = document.querySelector("#newPost");

  newPost.classList.toggle("visible");
  updatePostTitle.classList.toggle("visible");
  listBody.classList.toggle("visible");

  const response = await fetch("/api/post/dashboardPosts", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    response.json().then((responseData) => {
      responseData.forEach((info) => {
        if (info.id === id) {
          const updateTitle = document.querySelector("#updateTitle");
          const updateContent = document.querySelector("#updateContent");
          const updateButton = document.querySelector("#updateSubmit");
          const deleteButton = document.querySelector("#deleteSubmit");

          updateTitle.value = info.title;
          updateContent.value = info.post;

          updateButton.addEventListener(
            "click",
            () => {
              updatePost(id);
            },
            false
          );
          deleteButton.addEventListener(
            "click",
            () => {
              deletePost(id);
            },
            false
          );
        }
      });
    });
  } else {
    console.log(response.statusText);
  }
};

const pageLoad = () => {
  const buttons = document.querySelectorAll(".dashboardButton");

  for (const button of buttons) {
    button.addEventListener(
      "click",
      () => {
        updatePostInfo(button.dataset.id);
      },
      false
    );
  }
};

const deletePost = async (id) => {
  const response = await fetch("/api/post/deletePost", {
    method: "DELETE",
    body: JSON.stringify({ id }),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    console.log(response.statusText);
  }
};

document
  .querySelector("#createPost")
  .addEventListener("submit", newPost);
document
  .querySelector("#newPost")
  .addEventListener("click", openPost);
window
  .addEventListener("load", pageLoad);
