// ROUTES 
import routes from "./routes.js";

import { createServer } from "http";
import { Server } from "socket.io";
import { config } from 'dotenv';
import express from 'express';
import cors from "cors"
import { validate_room } from "./config/rooms.js";

import { v4 } from "uuid";

config();

const app = express();
const port = 3030; 

app.use(
    cors({
        origin: "http://localhost:3000"
    })
)
app.use(express.json());

const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

app.use(routes)

const messages = {};

io.on("connection", (socket) => {
    console.log(`Connected`);

    socket.on("join", (name, uuid) => {
        if(!validate_room(name)){
            return false;
        }
        socket.join(name);
        // Enviar todas as mensagens da sala para o usuário que acabou de entrar
        if (messages.hasOwnProperty(name)) {
            socket.emit(name, messages[name]);
        }
    });

    socket.on("send", (e, name, uuid) => {
        if(!validate_room(name)){
            return false;
        }
        const message = `${uuid}: ${e}`;
        // Salvar a mensagem na sala correspondente
        if (messages.hasOwnProperty(name)) {
            messages[name].push(message);
        } else {
            messages[name] = [message];
        }
        // Emitir a mensagem para todos os usuários na sala
        io.to(name).emit(name, message);
        console.log(`Emitted to: ${name}`);
    });
});

httpServer.listen(port, () => {
    console.log(`\n\n\n➔ Server is running at port: ${port} 🚀\n\n\n`);
});
