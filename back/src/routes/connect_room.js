import { validate_room } from "../config/rooms.js";

const CHECK_ROOM = (req, res) => {
    let ROOM_ID = req.query.id;

    let room_validate = validate_room(ROOM_ID);

    if(!room_validate){
        res.status(200);
        res.json({status: false, msg: "Room does not exist"});
        return;
    }

    res.status(200);
    res.json({status: true, msg: "Connected", id: ROOM_ID});
}

export { CHECK_ROOM }
