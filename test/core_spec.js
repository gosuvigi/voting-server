/**
 * Created by vigi on 9/16/15:4:02 PM.
 */

import {List, Map} from 'immutable';
import {expect} from 'chai';

import {setEntries} from '../src/core';

describe('application logic', () => {

    describe('setEntries', () => {

        it('adds the entries to the state', () => {
            const state = Map();
            const entries = List.of('LotR', 'GoT', 'Matrix');
            const nextState = setEntries(state, entries);

            expect(nextState).to.equal(Map({entries: List.of('LotR', 'GoT', 'Matrix')}));
        });

        it('converts array to immutable', () => {
            const state = Map();
            const entries = ['LotR', 'GoT', 'Matrix'];
            const nextState = setEntries(state, entries);

            expect(nextState).to.equal(Map({entries: List.of('LotR', 'GoT', 'Matrix')}));
        });
    });

});
