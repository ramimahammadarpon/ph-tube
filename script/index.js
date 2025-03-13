const removeActive = () =>{
  const actCats = document.getElementsByClassName("active");
  console.log(actCats);
  for(let actCat of actCats){
    actCat.classList.remove("active");
  }
}

const loadCategories = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories').then(res => res.json()).then(data => displayCategories(data.categories));
}

const loadCategoryVideos = (id) => {
  const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`
  fetch(url).then(res =>res.json()).then(data=> {
    const catBtn = document.getElementById(`btn-${id}`);
    removeActive();
    catBtn.classList.add("active");
    displayVideos(data.category);
  });
}

const displayCategories = (categories) => {
    const categoriesContainer = document.getElementById("categories-container");
    for(let cat of categories) {
        const categoryDiv = document.createElement("div");
        categoryDiv.innerHTML = `
        <button id="btn-${cat.category_id}" onclick="loadCategoryVideos(${cat.category_id})" class="btn btn-sm">${cat.category}</button>
        `;
        categoriesContainer.appendChild(categoryDiv);
    }
}

const loadVideos = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/videos').then(res => res.json()).then(data => {
      const allCat = document.getElementById("btn-all");
      removeActive();
      allCat.classList.add("active");
      displayVideos(data.videos)
    });
} 
function displayVideos(videos) {
    const videoContainer = document.getElementById("video-container");
    videoContainer.innerHTML ="";
    if(videos.length == 0) {
      videoContainer.innerHTML = `
      <div class="col-span-full mx-auto flex flex-col gap-4 justify-center items-center py-20">
            <img src="assets/Icon.png" alt="">
            <h1 class="font-bold text-2xl">Oops!! Sorry, There is no content here</h1>
        </div>
      `;
      return;
    }
    videos.forEach(video => {
        const videoCard = document.createElement("div");
        videoCard.innerHTML = `
         <div class="card rounded-lg overflow-hidden">
            <figure class="relative">
              <img
                class="rounded-lg w-full h-[200px] object-cover" src="${video.thumbnail}"
                alt="Shoes" />
                <span class="absolute bottom-2 right-2 text-white text-sm rounded-md bg-stone-900 p-1">${video.others.posted_date}</span>
            </figure>
            <div class="flex py-5 gap-3">
              <div>
                <div class="avatar">
                    <div class="w-10 rounded-full">
                      <img src=${video.authors[0].profile_picture} />
                    </div>
                  </div>
              </div>
              <div class="space-y-2">
                <h1 class="font-bold">${video.title}</h1>
                <p class="flex gap-1 items-center text-gray-400">${video.authors[0].profile_name}
                    <img class="w-5 h-5" src="https://img.icons8.com/?size=96&id=98A4yZTt9abw&format=png" alt="">
                </p>
                <p class="text-gray-400">${video.others.views} views</p>
              </div>
            </div>
          </div>
        `
        videoContainer.append(videoCard);
    })
}


loadCategories();
