function attachEvents() {
  document.querySelector("#submit").addEventListener("click", addComment);
  document
    .querySelector("#refresh")
    .addEventListener("click", displayAllComments);
}

const url = "http://localhost:3030/jsonstore/messenger";

function addComment() {
  const authorName = document.querySelector('[name="author"]');
  const messageText = document.querySelector('[name="content"]');
  if (!authorName.value || !messageText.value) return;

  fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      author: authorName.value,
      content: messageText.value,
    }),
  })
    .then((res) => {
      if (!res.ok) throw new Error("Error");
      return res.json();
    })
    .catch((e) => alert(e.message));
}

function displayAllComments() {
  fetch(url)
    .then((res) => {
      if (!res.ok) throw new Error("Error");
      return res.json();
    })
    .then(addCommentToTextarea)
    .catch((e) => alert(e.message));
}

function addCommentToTextarea(data) {
  const textArea = document.querySelector("#messages");
  const allComments = [];
  Object.values(data).forEach((c) =>
    allComments.push(`${c.author}: ${c.content}`)
  );
  textArea.value = allComments.join("\n");
}

attachEvents();
