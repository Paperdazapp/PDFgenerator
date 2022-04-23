import { AppDataSource } from "./data-source"
import { Draw } from "./entity/draw"
import { Text } from "./entity/text"
const app = require('express')();

const server = require('http').createServer(app);
const io = require('socket.io')(server);



AppDataSource.initialize().then(async () => {

    // console.log("Inserting a new user into the database...")
    // const user = new User()
    // user.firstName = "Timber"
    // user.lastName = "Saw"
    // user.age = 25
    // await AppDataSource.manager.save(user)
    // console.log("Saved a new user with id: " + user.id)

    // console.log("Loading users from the database...")
    // const users = await AppDataSource.manager.find(User)
    // console.log("Loaded users: ", users)

    // console.log("Here you can setup and run express / fastify / any other framework.")

    io.on('connection', (socket) => { 
        console.log(socket.id)
    });

}).then(() => {
    server.listen(3000, ()=>console.log("socket at port 3000 🚀"));
}).catch(error => console.log(error))
