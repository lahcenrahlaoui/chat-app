// import dependencies

const IO = require("socket.io");
const Data = require("./globals");

module.exports = getIO = (server, connectedSockets) => {
    // create the app
    // @ config
    const corsSocketIo = { origin: "*", methods: ["GET", "POST"] };

    // @ creat the io object
    const io = IO(server, { cors: corsSocketIo });
    io.on("connection", (socket) => {
        console.log("new user connected");
        // @ to join in room
        socket.on("client-to-server--join-room", (data) => {
            const room = [data.users.user1, data.users.user2].sort().join("");
            console.log("join a room : " + room);
            socket.join(room);
        });
        // @ to send message
        socket.on("client-to-server", (recievedData) => {
            // @ prepare data
            const sendData = {
                content: recievedData.data.content,
                status: 0,
            };
            // @ to send message to a specific room
            const room = [recievedData.users.user1, recievedData.users.user2]
                .sort()
                .join("");
            // @ send message to all users in the room
            socket.to(room).emit("server-to-client", sendData);
        });

        // ! when user disconnects from server
        socket.on("disconnect", (reason) => {
            console.log(reason);
        });
    });

    /*
    io.on("connection", (client) => {
        //     // Message.watch().on("change", (data) => {
        //     //     const preparedData = {
        //     //         content: data.fullDocument.content,
        //     //         createdAt: data.fullDocument.createdAt,
        //     //         from: data.fullDocument.from,
        //     //         to: data.fullDocument.to,
        //     //     };
        //     //     const to = preparedData.to;

        //     //     client.emit(to, preparedData);
        //     // });

        /////////////////////
        //     // const sockets = Array.from(io.sockets.sockets).map(
        //     //     (socket) => socket[0]
        //     // );

        // const showClient = { "client.id": client.id };
        // Data.log(showClient);

        client.on("custom-id-join",async ({ reciever }) => {
            await connectedSockets.push(reciever);
            console.log("000000000000000000000");
          
            console.log("before connectedSockets")
            console.log(connectedSockets)
        });
        
        client.on("custom-id-leave",async ({ reciever }) => {
            await connectedSockets.pop(reciever);
            console.log("000000000000000000000");
          
            console.log("after connectedSockets")
            console.log(connectedSockets)
        });


        // client.on("disconnect", () => {
        //     connectedSockets.pop(client);
        // });

        // function getConnectedSockets() {
        //     return Array.from(connectedSockets);
        // }

        // getConnectedSockets().forEach(function (s) {
        //     s.disconnect(true);
        // });
    });
    
    
    */
};
