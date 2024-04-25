// LOCAL ROUTES 
import { CHECK_ROOM } from "./routes/connect_room.js"

import { Router } from "express";

const routes = Router();

// POST 
routes.get('/check', CHECK_ROOM)

// GET 
routes.get('/', (req, res) => {
    res.json({msg: "nothing here"})
})

export default routes; 