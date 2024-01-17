// import dependencies

const IO = require("socket.io");
const Data = require("./globals");

module.exports = getIO = (server, connectedSockets) => {
    // create the app
    // @ config
    const corsSocketIo = { origin: "*", methods: ["GET", "POST"] };

    const io = IO(server, { cors: corsSocketIo });

    io.on("connection", (socket) => {
        console.log("a user connected");
        console.log(socket.id);

        socket.on("client-to-server--join-room", (recievedData) => {
            console.log("join a room ");
            console.log(recievedData);
            socket.join(recievedData.users[0]);
            socket.join(recievedData.users[1]);
        });

        socket.on("client-to-server", (recievedData) => {
            const sendData = {
                content: recievedData.data.content,
                status: 0,
            };
            
            
            const rooms = [...recievedData.users];
            socket.to(rooms[0]).to(rooms[1]).emit("server-to-client", sendData);
        });

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
