/**
 * Created by vigi on 9/16/15:4:02 PM.
 */

import {List, Map} from 'immutable';
import {expect} from 'chai';

import {setEntries, next, vote} from '../src/core';

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

    describe('next', () => {

        it('takes the next two entries under vote and they should no longer be in the entries list', () => {
            const state = Map({entries: List.of('LotR', 'GoT', 'Matrix')});
            const nextState = next(state);

            expect(nextState).to.equal(Map({
                vote: Map({pair: List.of('LotR', 'GoT')}),
                entries: List.of('Matrix')
            }));
        });
    });

    describe('vote', () => {

        it('creates a tally for the voted entry', () => {
            const state = Map({
                vote: Map({pair: List.of('LotR', 'GoT')}),
                entries: List()
            });
            const nextState = vote(state, 'LotR');

            expect(nextState).to.equal(Map({
                vote: Map({
                    pair: List.of('LotR', 'GoT'),
                    tally: Map({'LotR': 1})
                }),
                entries: List()
            }));
        });

        it('adds to existing tally for the voted entry', () => {
            const state = Map({
                vote: Map({
                    pair: List.of('LotR', 'GoT'),
                    tally: Map({'LotR': 4, 'GoT': 5})
                }),
                entries: List()
            });
            const nextState = vote(state, 'GoT');
            expect(nextState).to.equal(Map({
                vote: Map({
                    pair: List.of('LotR', 'GoT'),
                    tally: Map({'LotR': 4, 'GoT': 6})
                }),
                entries: List()
            }));
        });
    });

});
