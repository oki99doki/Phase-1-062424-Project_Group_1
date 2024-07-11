# Phase-1-062424-Project_Group_1
Phase 1 - Week 3 Group Project - Group 1

# SE-EAST-Phase-1-062424
## Project Requirements
- [ ] A one sentence description of your app
- [ ] A SCREENSHOT of your wireframe
- [ ] User stories (core deliverables - you have to complete these to pass)
- [ ] An example of your db.json or what API you are going to use
- [ ] What 3 unique event listeners you will use
- [ ] How you will be using array iteration
- [ ] Three stretch goals
- [ ] A Kanban board

## Project Requirements
- [ ] An app for Flatiron students to select the best API for their phase I project

## Wireframe Screenshot
- [ ] ![image](https://github.com/oki99doki/Phase-1-062424-Project_Group_1/assets/20118438/d162a09d-867b-4c3f-a8d5-23de3b6f1316)

## Deliverables
- [ ] User can see a list of APIs and their associated attributes
- [ ] User can add a new API to the list with details (‘submit’ eventListener)
- [ ] User can hover over API name and display an image or details (‘mouseover’ eventListener)
- [ ] User can select "Fave" button to add to their favorites and remove (‘click’ eventListener)

## DB.JSON
  {
    "apis": [
      {
        "id": "1",
        "name": "Jokes API",
        "post": true,
        "auth": false,
        "link": "https://official-joke-api.appspot.com/random_joke",
        "rating": 7,
        "details": "Easy to use and post.",
        "image": "https://media.earlyexperts.net/wp-content/uploads/2018/12/displaying-american-flag.jpg",
        "favorite": false
      },
      {
        "id": "2",
        "name": "HTTP Cats",
        "post": false,
        "auth": false,
        "link": "https://http.cat/[status_code]",
        "rating": 6,
        "details": "So many cats.",
        "image": "https://amazinganimalphotos.com/wp-content/uploads/2018/07/ugliest-cats-in-the-world-6.jpg",
        "favorite": false
      },
    ]
  }

## Unique Event Listeners
- [ ] Submit (add new api)
- [ ] Mouseover (display tooltip)
- [ ] Click (add to favorites, remove from favorites, flag as defunct, delete)

## Array Iteration
- [ ] We will be using forEach() to iterate over the APIs and display details for them in our table and hover functionality

## Three Stretch Goals
- [ ] User can click a button to note that the API is no longer usable
- [ ] Change the color of an API row when the user clicks a button
- [ ] Delete an API row when the user clicks a button
- [ ] User can search or filter to find the right API for their purposes (‘submit’ eventListener)

## Kanban Board
- [ ] https://trello.com/b/BTLR4yl7/phase-i-kanban
- [ ] ![image](https://github.com/oki99doki/Phase-1-062424-Project_Group_1/assets/20118438/d6d88134-6973-400e-b926-696aaf1d6245)