function attachEvents() {
  document.querySelector("#btnLoadPosts").addEventListener("click", loadPosts);
  document.querySelector("#btnViewPost").addEventListener("click", viewPost);

  const posts = [];

  async function loadPosts() {
    try {
      const url = "http://localhost:3030/jsonstore/blog/posts";
      const res = await fetch(url);
      if (!res.ok) throw new Error();
      const data = await res.json();
      // console.log(data);
      document.querySelector("#posts").innerHTML = "";

      Object.entries(data).forEach(([key, value]) => {
        const optionEl = document.createElement("option");
        optionEl.value = key;
        optionEl.textContent = value.title;
        document.querySelector("#posts").appendChild(optionEl);
        posts.push({ title: value.title, body: value.body });
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function viewPost() {
    try {
      const selectEl = document.querySelector("#posts");
      const url = "http://localhost:3030/jsonstore/blog/comments";
      const res = await fetch(url);
      if (!res.ok) throw new Error();

      const data = await res.json();
      const comments = Object.values(data).filter(
        (el) => el.postId === selectEl.value
      );

      document.querySelector("#post-title").textContent =
        selectEl.selectedOptions[0].textContent;
      const post = posts.filter(
        (p) => p.title === selectEl.selectedOptions[0].textContent
      );
      document.querySelector("#post-body").innerHTML = `${post[0].body}`;
      document.querySelector("#post-comments").innerHTML = "";

      comments.forEach((el) => {
        const liEl = document.createElement("li");
        liEl.textContent = el.text;
        document.querySelector("#post-comments").appendChild(liEl);
      });
    } catch (error) {
      console.log(error);
    }
  }
}

attachEvents();
