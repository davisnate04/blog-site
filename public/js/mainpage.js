const titles = document.querySelectorAll(".postTitle");
const comments = document.querySelectorAll(".comment");

const openTitle = (event) => {
    const li = event.currentTarget.closest("li");
    const liChild = li.children[1];

    if (!liChild.classList.contains("visible")) {
        liChild.classList.add("visible");
    } else {
        for (const comment of comments) {
            comment.classList.add("visible");
        }

        liChild.classList.remove("visible");
    }
}

const createComment = async (event) => {
    let post_id = event.currentTarget.closest("li").dataset.id;
    let comment = event.currentTarget.closest("form")[0].value;

    const response = await fetch("api/comment/createComment", {
        method: "POST",
        body: JSON.stringify({comment, post_id}),
        headers: {"Content-Type": 'application/json'},
    });
    
    if (response.ok) {
        comment = "";

        document.location.replace('/');
    } else {
        console.error(response.statusText);
    }
}

document
    .querySelectorAll('.postTitle')
    .forEach(function(title) {
        title.addEventListener("click", openTitle, false);
    });
document
    .querySelectorAll('.commentSubmit')
    .forEach(function(submit) {
        submit.addEventListener("click", createComment, false);
    })