/**
 * Created by vigi on 9/17/15:10:58 AM.
 */

import {createStore} from 'redux';
import reducer from './reducer';

export default function makeStore() {
    return createStore(reducer);
}
