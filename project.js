// await fetch(`https://openapi.programming-hero.com/api/videos/categories`)
//   .then((res) => res.json())
//   .then((data) => displayCategory(data.data));
const htmlNoData = document.getElementById("noData");
const loadData = async (data) => {
  console.log(data);
  const bodyData = document.getElementById("bod");
  bodyData.innerHTML = "";
  const firstPage = document.getElementById("first_page");
  firstPage.style.display = "none";
  if (data.length == 0) {
    console.log("No data");
    // const htmlNoData = document.getElementById("noData");
    htmlNoData.innerHTML = "";
    const nData = document.createElement("div");
    nData.classList.add("cNoData");
    nData.innerHTML = `<img src="./Icon.png" alt="" />
    <h1>Oops!! Sorry, There is no content here</h1>`;
    htmlNoData.appendChild(nData);
  } else {
    htmlNoData.innerHTML = "";
    data.forEach((d) => {
      const hours = parseInt(d.others.posted_date / 3600);
      const minutes = (d.others.posted_date / 3600 - hours) * 60;
      console.log(d);
      console.log(d.authors[0].verified);
      const card = document.createElement("div");
      card.classList.add("result");
      if (d.authors[0].verified) {
        card.innerHTML = `
    <div class="card">
    <div class="imaged">
        <img  src="${d.thumbnail}" width="100%" height="100%" alt="" />
    </div>
    <div class="afterImaged">
      <img class="aimg" src="${
        d.authors[0].profile_picture
      }" width="30rem" height="30rem"  alt="" />
      <div>
        <div class="title">${d.title}</div>
        <div class="author">${d.authors[0].profile_name}</div>
        <div class="views">${d.others.views} views</div>
        <div class="views">${hours} hours ${parseInt(minutes)} min </div>
      </div>
    </div>
  </div>`;
      } else {
        card.innerHTML = `
    <div class="card">
    <div class="imaged">
        <img  src="${d.thumbnail}" width="100%" height="100%" alt="" />
    </div>
    <div class="afterImaged">
      <img class="aimg" src="${d.authors[0].profile_picture}" width="30rem" height="30rem"  alt="" />
      <div>
        <div class="title">${d.title}</div>
        <div class="author">${d.authors[0].profile_name} <img src="./check-mark-circle-front-side-white-background.png" height="15px" alt=""></div>
        <div class="views">${d.others.views} views</div>
      </div>
    </div>
  </div>`;
      }
      bodyData.appendChild(card);
    });
  }
};

const loadVideos = async (id) => {
  const url = `https://openapi.programming-hero.com/api/videos/category/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  loadData(data.data);
};

const displayCategory = async (data) => {
  const categories = document.getElementById("top");
  data.forEach((d) => {
    console.log(d);
    const cat = document.createElement("div");
    cat.innerHTML = `<button class = "btnTop" onclick="loadVideos(${d.category_id})">${d.category}</button>`;
    categories.appendChild(cat);
  });
};

const loadCategories = async () => {
  const url = `https://openapi.programming-hero.com/api/videos/categories`;
  const res = await fetch(url);
  const data = await res.json();
  displayCategory(data.data);
};

loadCategories();

function secondPage() {
  window.location.href = "./second.html";
}
