/**
 * Created by vigi on 9/17/15:9:45 AM.
 */
import {Map, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/reducer';

describe('reducer', () => {

    it('handles SET_ENTRIES', () => {
        const initialState = Map();
        const action = {type: 'SET_ENTRIES', entries: ['GoT']};

        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(fromJS({entries: ['GoT']}));
    });

    it('handles NEXT', () => {
        const initialState = fromJS({entries: ['LotR', 'GoT']});
        const action = {type: 'NEXT'};

        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(fromJS({
            vote: {pair: ['LotR', 'GoT']},
            entries: []
        }));
    });

    it('handles VOTE', () => {
        const initialState = fromJS({
            vote: {pair: ['LotR', 'GoT']},
            entries: []
        });
        const action = {type: 'VOTE', entry: 'GoT'};

        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(fromJS({
            vote: {pair: ['LotR', 'GoT'], tally: {GoT: 1}},
            entries: []
        }));
    });

    it('handles unknown action', () => {
        const initialState = fromJS({entries: ['LotR', 'GoT']});
        const action = {type: 'HODOR'};

        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(initialState);
    });

    it('has an initial state', () => {
        const action = {type: 'SET_ENTRIES', entries: ['GoT']};

        const nextState = reducer(undefined, action);

        expect(nextState).to.equal(fromJS({entries: ['GoT']}));
    });

    it('can be used to replay a collection of past actions', () => {
        const actions = [
            {type: 'SET_ENTRIES', entries: ['GoT', 'LotR']},
            {type: 'NEXT'},
            {type: 'VOTE', entry: 'GoT'},
            {type: 'VOTE', entry: 'GoT'},
            {type: 'VOTE', entry: 'LotR'},
            {type: 'NEXT'}
        ];

        const finalState = actions.reduce(reducer, Map());

        expect(finalState).to.equal(fromJS({winner: 'GoT'}));
    });
});
