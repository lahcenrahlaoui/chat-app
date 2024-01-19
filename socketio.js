// import dependencies

const IO = require("socket.io");
const Data = require("./globals");

module.exports = getIO = (server, connectedSockets) => {
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
        console.log("new user connected");
        // @ to join in the default room
        socket.on("client-to-server--default-room", (data) => {
            const room = data.currentUser;
            ///////////////////////
            ///////////////////////
            ///////////////////////
            ///////////////////////
            ///////////////////////
            ///////////////////////
            ///////////////////////
            ///////////////////////
            const SMS_SID = process.env.SMS_SID;
            const SMS_AUTH_TOKEN = process.env.SMS_AUTH_TOKEN;

            const client = require("twilio")(SMS_SID, SMS_AUTH_TOKEN);

            client.messages
                .create({
                    body: "your veridication code : ",
                    from: "+16592228202",
                    to: "+2130666629947",
                })
                .then((message) => console.log(message.sid))
                .done();
            ///////////////////////
            ///////////////////////
            ///////////////////////
            ///////////////////////
            ///////////////////////
            ///////////////////////
            ///////////////////////
            ///////////////////////
            ///////////////////////

            console.log("join a room : " + room);
            socket.join(room);
        });

        // @ to join in room private room
        socket.on("client-to-server--join-room", (data) => {
            const room = [data.currentUser, data.chat_user].sort().join("");
            socket.join(room);

            const users = {
                currentUser: data.currentUser,
                chat_user: data.chat_user,
            };
            socket.broadcast
                .to(data.chat_user)
                .emit("server-to-client--first-message", users);
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
