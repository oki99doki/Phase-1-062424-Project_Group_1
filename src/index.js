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
        buttonsCell.append(buttonFave, (" "), buttonFlag);

        if (curApi.favorite === true) {
          addToFavorites(curApi);
        }
        
        buttonFave.addEventListener("click", () => {
          addToFavorites(curApi);
        });

        buttonFlag.addEventListener("click", (e) => {
          showBroken(e.target);
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
  let apiFaveImage = document.createElement("img");
  apiFaveImage.src = api.image;
  favorites.append(apiFaveImage);
  let apiFaveName = document.createElement("span");
  apiFaveName.textContent = api.name;
  favorites.append(apiFaveName);
  fetch(`${url}/apis/${api.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "favorite": true
    })
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        throw "Favorite failed.";
      }
      }
    )
    .catch(error => console.error('Error:', error));

  //remove from favorites
  let removeFavorite = document.createElement("button");
  removeFavorite.textContent = "X";
  favorites.append(removeFavorite);
  removeFavorite.addEventListener('click', () => {
    apiFaveImage.remove();
    apiFaveName.remove();
    removeFavorite.remove();
    fetch(`${url}/apis/${api.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        "favorite": false
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw "Unfavorite failed.";
        }
        }
      )
      .catch(error => console.error('Error:', error));
  })
}

//show as broken
const showBroken = (button) => {
  let brokenRow = button.closest('tr');
  brokenRow.style.color = 'red';
  }