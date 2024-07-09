// index.js
const url = "http://localhost:3000";
const apiTable = document.getElementById("api-table");
const form = document.getElementById("new-ramen");
const favorites = document.getElementById("favorites");

//core: fetch and display apis
const fetchApis = () => {
  fetch(`${url}/apis`)
  .then(res => {
    if (res.ok) {
      return res.json();
    } else {
      console.log(res.status);
      throw new Error(`HTTP error! status: ${res.status}`);
    }
  })
  .then(apis => {
    apis.forEach(curApi => {
        const tableBody = document.querySelector("#api-table tbody");
        const row = document.createElement("tr");
        const idCell = document.createElement("td");
        const nameCell = document.createElement("td");
        const nameLink = document.createElement("a");
        const postCell = document.createElement("td");
        const authCell = document.createElement("td");
        const ratingCell = document.createElement("td");
        const buttonsCell = document.createElement("td");
        const buttonFave = document.createElement("button");
        const buttonFlag = document.createElement("button");

        idCell.textContent = curApi.id;
        postCell.textContent = curApi.post;
        authCell.textContent = curApi.auth;
        ratingCell.textContent = parseInt(curApi.rating);
        nameLink.href = curApi.link;
        nameLink.target = "_blank";
        nameLink.rel = "nofollow";
        nameLink.textContent = curApi.name;
        buttonFave.className = "favorite";
        buttonFave.textContent = "Fave";
        buttonFlag.className = "flag";
        buttonFlag.textContent = "Uh Oh";
        nameCell.append(nameLink);
        buttonsCell.append(buttonFave, buttonFlag);
        // buttonsCell.append(buttonFlag);
        
        buttonFave.addEventListener("click", () => {
          addToFavorites(curApi);
        });

        buttonFlag.addEventListener("click", () => {
          showBroken(curApi);
        });

        row.append(idCell, nameCell, postCell, authCell, ratingCell, buttonsCell);

        tableBody.append(row);
        apiTable.append(tableBody);
      }
    )
      
    });
  }

  fetchApis();

//add to favorites
const addToFavorites = (api) => {
  const apiFaveImage = document.createElement("img");
  apiFaveImage.src = api.image;
  favorites.append(apiFaveImage);
  const apiFaveName = document.createElement("span");
  apiFaveName.textContent = api.name;
  favorites.append(apiFaveName);
}

// const addToFavorites = (id) => {
//   fetch(`${url}/favorites`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ api_id: id }),
//   })
//  .then(res => {
//     if (res.ok) {
//       console.log("API added to favorites");
//     } else {
//       throw "Failed to add API to favorites";
//     }
//   });
// }

//core: new ramen form addition

//core: click to display ramen details

//core: fetch and display ramen menu

/*
//core: new ramen form addition
const addSubmitListener = () => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let newRamen = {
      name: e.target.name.value,
      restaurant: e.target.restaurant.value,
      image: e.target.image.value,
      rating: e.target.rating.value,
      comment: e.target['new-comment'].value,
    }
    const newRamenImg = document.createElement('img');
    newRamenImg.src = newRamen.image;
    ramenMenu.append(newRamenImg);
    form.reset();
    newRamenImg.addEventListener("click", () => {
      handleClick(newRamen)
    });

    // fetch(`${url}/ramens`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(newRamen),
    // })
    // .then(res => {
    //   if (res.ok) {
    //     return res.json();
    //   } else {
    //     throw "no";
    //   }
    // })
    // .then(data => {
    //   console.log(data);
    //   displayRamens(newRamen);
    // });
  })
}

//core: click to display ramen details
const handleClick = (ramen) => {
  const detailImg = document.getElementsByClassName('detail-image')[0];
  const detailName = document.getElementsByClassName('name')[0];
  const detailRestaurant = document.getElementsByClassName('restaurant')[0];
  const detailRating = document.getElementById('rating-display');
  const detailComment = document.getElementById('comment-display');
  detailImg.src = ramen.image;
  detailImg.alt = ramen.name;
  detailName.textContent = ramen.name;
  detailRestaurant.textContent = ramen.restaurant;
  detailRating.textContent = ramen.rating;
  detailComment.textContent = ramen.comment;
};
//core: fetch and display ramen menu
const displayRamens = () => {
  fetch(`${url}/ramens`)
  .then(res => res.json())
  .then(ramens => {
    ramens.forEach((curRamen) => {
      const ramenImg = document.createElement('img');
      ramenImg.src = curRamen.image;
      ramenMenu.append(ramenImg);

      ramenImg.addEventListener("click", () => {
        handleClick(curRamen)
      });
    })
    //advanced: display details for first ramen as page loads
    handleClick(ramens[0]);
  })
};


const main = () => {
  displayRamens();
  addSubmitListener();
};

main();

*/