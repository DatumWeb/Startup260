# Startup260
This is my Startup Project for CS260 BYU.

## Specification Deliverable

### Elevator Pitch
Most people struggle to learn and understand the complex game of Canasi. This application, ***Baby Canasi***, will help people of all ages begin to understand Canasi and have fun using this much simplified version. Through feedback on scores, leaderboards and winners progression in ***Baby Canasi*** will be enjoyable and trackable. The site will have simple instructions on how to play the game for those who have no idea what it is.

### Sketch
This is a rough sketch of the Intro Page, talking about what Canasi is and how to play Baby Canasi.
![](https://github.com/DatumWeb/Startup260/assets/97472760/139ebc17-ab7e-4dbd-8653-07f3a405d58e.jpg)

This is a rough sketch of what Baby Canasi will look like while you are playing it.
![Baby Canasi board with cards on bottom.](https://github.com/DatumWeb/Startup260/assets/97472760/d23d393b-76ce-4528-84d2-9790b11eabad)

### Key Features
* Secure Login
* Baby Canasi account to track progression
* Leaderboard with updated scores
* Simple instructions for Baby Canasi
* Score feedback after match
* Simple computer to practice against


### Use of Technologies 
***HTML*** - HTML will provide the structure for the website. One page for intro and instructions, another for the game itself, and one more for logging in. 

***CSS*** - CSS will help to make the website look good with spacing and colors.

***JavaScript*** - This will be how Baby Canasi is run on the site and how users can log in.

***Service*** - endpoints for login, game outcomes, and player scores.

***Database*** - This will store user info, and save scores for the leaderboard. 

***WebSocket*** - This will generate recent scores from users.

***React*** - Will be ported to React framework.

## HTML Deliverable

https://startup.canasigame.com

***HTML Pages*** - I created 4 HTML pages, Home/login, how to play, the game, and a score page.

***Text*** - There is text throughout to provide context to actions, then much more text to explain the game.

***Links*** - There are links in the Nav bar to navigate through the page.

***Images*** - There are images to represent the board, and pieces that will be on the board.

***DB/Login*** - Input box to login with password and username, there will be input for the game as well.

***WebSocket*** - The turns will be realtime and the scores will be uploaded.

***Third Party*** - There will be a random quote generator.

## CSS Deliverable
https://startup.canasigame.com

***Header, footer, and main content body*** - There is a header, footer, and main elements, they are uniforly sylized.

***Navigation elements*** - There is a nav bar with hyperlinks and styled at the top of each page.

***Responsive to window resizing*** - The nave bar, and images respond to smaller screens, and some adjustments were made when content was cut off because of it.

***Application elements*** - There is good contrast with the black and white (and grey) elements are spaced nicely to make info clear.

***Application text content*** - The fonts and font sizes are consistent and info clear.

***Application images*** - Images are sized evenly and can be hovered over for info.

## JavaScript
***Login*** - When you Login, it gives you a prompt saying you have logged in, and displays your name on the game page and score page.

***Database*** - Saves player wins and losses, curretly is placeheld in local storage tracking pieces placed as wins and times refreshed as losses. But this will be wins and losses saved in database later.

***WebSocket*** - There are place holder pieces for opponenets and you will be able to face them live with websocket. WebSocket will also handle the prompts for the players moves and show them the players planned move. In my JavaScript I have functions to keep track of player turn and this will be implimented when we put websocket in.

***Appliction Logic*** - The game logic is mostly implimented and you are able to spawn in your pieces, and move pieces you own.

***TODO*** - Will finish game logic, and get rid of rough place holders when WebSocket is implimented.

## Service deliverable
***Node.js/Express HTTP service*** - Done

***Frontend served up using Express static middleware*** - Done

***Calls to third party endpoints*** - Calls quote generator and displays quote on login page, changes on refresh.

***Backend service endpoints*** - Stores Player and their respective wins/losses on server.

***Frontend calls service endpoints*** - Calls the endpoints to display info on players wins and losses on the score page.



