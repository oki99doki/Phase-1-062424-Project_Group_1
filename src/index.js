//declare needed variables
const url = "http://localhost:3000";
const apiTable = document.getElementById("api-table");
const form = document.getElementById("new-api");
const favorites = document.getElementById("favorites");
const tableBody = document.querySelector("#api-table tbody");

//fetch and display apis
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
        createRow(curApi, tableBody);
      });
    })
    .catch(error => console.error('Error fetching APIs:', error));
}

//create row
const createRow = (api, tableBody) => {
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
  const buttonDelete = document.createElement("button"); 

  idCell.textContent = api.id;
  postCell.textContent = api.post;
  authCell.textContent = api.auth;
  ratingCell.textContent = parseInt(api.rating);
  nameLink.href = api.link;
  nameLink.target = "_blank";
  nameLink.rel = "nofollow";
  nameLink.textContent = api.name;
  buttonFave.className = "favorite";
  buttonFave.textContent = "Fave";
  buttonFlag.className = "flag";
  buttonFlag.textContent = "Uh Oh";
  buttonDelete.className = "delete"; 
  buttonDelete.textContent = "Delete"; 

  nameCell.append(nameLink);
  buttonsCell.append(buttonFave, "", buttonFlag, " ", buttonDelete); 
  row.append(idCell, nameCell, postCell, authCell, ratingCell, buttonsCell);
  tableBody.append(row);

  // track favorites
  if (api.favorite === true) {
    addToFavorites(api);
  }

  // event listeners
  nameCell.addEventListener("mouseover", showTooltip);
  nameCell.addEventListener("mouseout", hideTooltip);

  function showTooltip() {
    const tooltip = document.querySelector(".tooltip");
    tooltip.textContent = `Details: ${api.details}`;
    tooltip.style.display = "block";
    tooltip.style.position = 'absolute';
  }

  function hideTooltip() {
    const tooltip = document.querySelector(".tooltip");
    tooltip.style.display = "none";
  }

  buttonFave.addEventListener("click", () => {
    addToFavorites(api);
  });

  buttonFlag.addEventListener("click", (e) => {
    showBroken(e.target);
  });

  buttonDelete.addEventListener("click", () => {
    row.remove();
    fetch(`${url}/apis/${api.id}`, {
      method: "DELETE"
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to delete API');
        }
      })
      .catch(error => console.error('Error:', error));
  });
}

//add new api form
form.addEventListener('submit', (e) => {
  e.preventDefault();

  let newApi = {
    name: e.target.name.value,
    link: e.target.Link.value,
    image: e.target.image.value,
    post: e.target.Post.value,
    auth: e.target.Auth.value,
    rating: parseInt(e.target.rating.value),
    details: e.target['new-details'].value
  } 

  fetch(`${url}/apis`, {
    method: "POST",
    headers: {'content-type': 'application/json'},
    body: JSON.stringify(newApi)
  })
  .then(res => {
    if(res.ok){
      return res.json();
    } else {
      throw "error with POST";
    }
  })
  .then(data => {
    createRow(data, tableBody);
  })
  .catch(error => console.error('Error adding API:', error));
})

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

fetchApis();