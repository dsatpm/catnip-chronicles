# Catnip Chronicles

Catnip Chronicles is an engaging side-scrolling 2D platformer game that draws inspiration from timeless classics like Super Mario Bros. Embark on a feline-filled adventure with our furry protagonist, navigating through whimsical landscapes and overcoming challenging obstacles.


## Overview

Catnip Chronicles is more than just a game; it's a journey into a world where cute meets challenge. The game combines the thrill of classic platformers with the charm of our feline friends. Master your jumping skills, avoid cunning enemies, and collect catnip power-ups to unlock new levels.


## Features

- **Immersive Gameplay:** Experience a captivating side-scrolling adventure with intuitive controls and responsive character movement.
- **Dynamic Levels:** Navigate through meticulously designed levels, each presenting unique challenges and surprises.
- **MongoDB Integration:** Leverage the power of MongoDB for seamless data storage, ensuring player progress and high scores are securely managed.
- **React Frontend:** Utilize the flexibility and efficiency of React for a dynamic and interactive user interface.
- **Node.js and Express Backend:** Leverage Node.js and Express to create a robust backend server, handling game logic, user authentication, and more.


## Technologies Used

- **MongoDB:** A scalable and versatile NoSQL database. [Learn more](https://www.mongodb.com/)
- **Express.js:** A fast and minimalist web framework for Node.js. [Learn more](https://expressjs.com/)
- **React.js:** A declarative and efficient JavaScript library for building user interfaces. [Learn more](https://reactjs.org/)
- **Node.js:** A JavaScript runtime built on Chrome's V8 JavaScript engine. [Learn more](https://nodejs.org/)


## Getting Started

Follow these steps to get Catnip Chronicles up and running on your local machine:

1. **Clone Repository**
``` bash
git clone https://github.com/dsatpm/catnip-chronicles.git
```
2. **Install Dependencies**
``` bash
cd catnip-chronicles/client && npm install
cd ../server && npm install
```
3. **Setup MongoDB Atlas**
- Create an account on MongoDB Atlas
- Set up a new cluster and obtain your connection string
4. **Create Environment Variables**
- In the `server` directory, create a `.env` file
- Add your MongoDB connection string as `MONGODB_URI`
5. **Start Application**
``` bash
cd client && npm start
cd ../server && npm start
```


## Project Structure

Catnip Chronicles follows a well-organized project structure to enhance maintainability and scalability. Key directories include:
-**client:** Frontend React application
   -**public:** Static assets and HTML files
   -**src:** React components, styles, and assets
-**server:** Backend Node.js and Express server
  -**config:** Configuration files
  -**controllers:** Logic for handling HTTP requests
  -**models:** Database models
  -**routes:** API route definitions
  -**middleware:** Custom middleware functions


  ## Collaborators

### [jcwarwick](https://github.com/jcwarwick)
### [kpfenning](https://github.com/kpfenning)
### [TorySnopl](https://github.com/TorySnopl)
### [UCarr81](https://github.com/UCarr81)
### [dsatpm](https://github.com/dsatpm)


  ## Contribution

  We welcome contributions to make Catnip Chronicles even more purrfect! Check out these [contribution guidelines](https://www.contributor-covenant.org/) to get started.


  ## License

  Catnip Chronicles is licensed under the [MIT License](https://opensource.org/licenses/MIT).
