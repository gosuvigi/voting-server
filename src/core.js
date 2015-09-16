/**
 * Created by vigi on 9/16/15:4:06 PM.
 */
import {List, Map} from 'immutable';

export function setEntries(state, entries) {
    return state.set('entries', List(entries));
}

export function next(state) {
    const entries = state.get('entries');
    return state.merge({
        vote: Map({pair: entries.take(2)}),
        entries: entries.skip(2)
    });
}
