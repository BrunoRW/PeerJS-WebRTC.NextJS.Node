const valid_rooms = [
    "abc-def",
    "123-456"
];

const validate_room = (e) => {
    if(valid_rooms.includes(e)){
        return true;
    }
    return false;
}

export {
    validate_room
}