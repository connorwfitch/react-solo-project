# Gemiddeld 
Gemiddeld is a Dutch- and walkable-community-themed clone of Medium built using technologies such as React, Node, Postgres, and Express.

### Try it out!
[Live heroku link!](https://gemiddeld.herokuapp.com/)

### Important Links
* [Feature List](https://github.com/connorwfitch/react-solo-project/wiki/Feature-List)
* [Database Schema](https://github.com/connorwfitch/react-solo-project/wiki/Database-Schema)
* [Frontend Routes](https://github.com/connorwfitch/react-solo-project/wiki/Frontend-Routes)
* [Backend Routes](https://github.com/connorwfitch/react-solo-project/wiki/Backend-Routes)

### Technologies used
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![Node](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Heroku](https://img.shields.io/badge/heroku-%23430098.svg?style=for-the-badge&logo=heroku&logoColor=white)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)

### Splash Page
![Splash Page](docs/splash.png)

### Login Page
![Login Page](docs/login.png)

### Stories Page
![Stories Page](docs/stories.png)

### Story Page
![Story Page](docs/story.png)

### User Page
![User Page](docs/user.png)

### Installation Instructions
1. Clone the repository using `git clone git@github.com:connorwfitch/react-solo-project.git`
2. Install frontend packages using `cd frontend` and `npm install`
3. Install backend packages using `cd ../backend` and `npm install`
4. Add `.env` file in backend directory using `touch .env` and setting it up as outlined in `.env.example`
5. Create a Postgres user in accordance with your `.env` file
6. Create, migrate, and seed your database by running the following commands
  * `npx dotenv sequelize db:create`
  * `npx dotenv sequelize db:migrate`
  * `npx dotenv sequelize db:seed:all`
7. Open up two terminals one for `/frontend` and the other for `/backend`, and run `npm start` in both
8. If not automatically redirected, navigate in your browser to `http://localhost:3000/`

### Technical Challenges
The primary roadblock I faced during this project was considering how to architect my Redux store slices of state. I ultimately landed on having a slice of state that captures all of the stories but with a limited scope and a single entry in that slice dedicated to the most recent story to be displayed in detail that captures the story and all of its nested features, primarily comments and likes. The logic was that while it will cost some computation to load in that extra information when accessing a single story, that cost is then save when the user returns to the stories browse page because if we included nested features for every story in the primary slice of state, we would have to make that costlier call to the backend api for all of the stories.

### Future To-Dos
* Add Social-Oriented Features (User Profile Edit/Delete, Following Other Users)
