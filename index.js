/**
 * Created by vigi on 9/17/15:11:10 AM.
 */
import makeStore from './src/store';
import startServer from './src/server';

export const store = makeStore();
startServer();
