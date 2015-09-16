/**
 * Created by vigi on 9/16/15:4:06 PM.
 */
import {List} from 'immutable';

export function setEntries(state, entries) {
    return state.set('entries', List(entries));
}
