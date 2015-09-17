/**
 * Created by vigi on 9/17/15:11:21 AM.
 */
import Server from 'socket.io';

export default function startServer() {
    const io = new Server().attach(8090);
}
