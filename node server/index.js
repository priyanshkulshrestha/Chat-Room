const io = require("socket.io")(8000)
// console.log(io)
const users = {};
io.on("connection", socket =>{
    socket.on('new-user-joined', name=>{
        console.log(name);
        users[socket.id] = name;
        console.log(users);
        socket.broadcast.emit('user-joined', name);
        console.log("fired");
    })

    socket.on('send', message => {
        socket.broadcast.emit('receive', {message:message, name: users[socket.id]})
    });

    socket.on('disconnect', message => {
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });
})  