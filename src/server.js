/**
 * Created by vigi on 9/17/15:11:21 AM.
 */
import Server from 'socket.io';

export default function startServer(store) {
    const io = new Server().attach(8090);

    // notify clients when the state has changed
    store.subscribe(() => io.emit('state', store.getState().toJS()));

    io.on('connection', (socket) => {
        console.info('--- New client connected, sending the state to the client.');
        socket.emit('state', store.getState().toJS());
        socket.on('action', store.dispatch.bind(store));
    });
}
