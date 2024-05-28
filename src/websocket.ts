import { Server } from "socket.io";

export const initWebSocket = (server: any) => {
    const io = new Server(server);

    io.on("connection", (socket) => {
        console.log("a user connected");

        socket.on("disconnect", () => {
            console.log("user disconnected");
        });
    });

    return io;
};
