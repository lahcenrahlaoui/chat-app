// import dependencies

const IO = require("socket.io");
const Data = require("./globals");

module.exports = getIO = (server, users) => {
    // create the app
    // @ config
    // const corsSocketIo = { origin: "*", methods: ["GET", "POST"] };

    const corsSocketIo = {
        cors: {
            origin: "*",
        },
        serveClient: true,
        transports: ["websocket"],
        rejectUnauthorized: true,
    };

    // @ creat the io object
    const io = IO(server, { cors: corsSocketIo });
    io.on("connection", (socket) => {
        console.log("New user connected ------------> ");

        // @ to join in the default room
        socket.on("client-to-server--default-room", (data) => {
            const room = data.currentUser.phoneNumber;
            console.log("join a room the default room : " + room);

            socket.join(room);
        });

        // @ to join in room private room
        socket.on("client-to-server--join-room", (data) => {
            socket.join(data.room);
            const newData = {
                room: data.room,
                currentUser: data.currentUser_store,
                chat_user: data.friend,
            };

            // @ send to the user that we want to talk with in his private room
            socket.broadcast
                .to(data.friend)
                .emit("server-to-client--first-message", newData);
        });

        // @ to send user data to other user
        socket.on("client-to-server--user-data", (data) => {
            const user = {
                phoneNumber: data.current_user_store.phoneNumber,
                name: data.current_user_store.name,
                image: data.current_user_store.image,
            };

            socket.broadcast
                .to(data.chat_user)
                .emit("server-to-client--user-data-recieve", user);
        });

        // @ to send message
        socket.on("client-to-server", (recievedData) => {
            // @ prepare data
            const sendData = {
                content: recievedData.data.content,
                createdAt: recievedData.data.createdAt,
                room: recievedData.data.room,
            };

            // @ to send message to a specific room
            const room = recievedData.data.room;

            // @ send message to all users in the room
            socket.broadcast.to(room).emit("server-to-client", sendData);
        });

        /////////////////////
        /////////////////////
        /////////////////////

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
