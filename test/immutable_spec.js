/**
 * Created by vigi on 9/16/15:2:59 PM.
 */

import {expect} from 'chai';
import {List, Map} from 'immutable';

describe('immutability', () => {

    describe('a number', () => {

        function increment(currentState) {
            return currentState + 1;
        }

        it('is immutable', () => {
            let state = 42;
            let nextState = increment(state);

            expect(nextState).to.equal(43);
            expect(state).to.equal(42);
        });
    });

    describe('a list', () => {
        function addMovie(currentState, movie) {
            return currentState.push(movie);
        }

        it('is immutable', () => {
            let state = List.of('LotR', 'GoT');
            let nextState = addMovie(state, 'Matrix');

            expect(nextState).to.equal(List.of('LotR', 'GoT', 'Matrix'));
            expect(state).to.equal(List.of('LotR', 'GoT'));
        });
    });

    describe('a tree', () => {
        function addMovie(currentState, movie) {
            return currentState.set('movies', currentState.get('movies').push(movie));
        }

        it('is immutable', () => {
            let state = Map({movies: List.of('LotR', 'GoT')});
            let nextState = addMovie(state, 'Matrix');

            expect(nextState).to.equal(Map({movies: List.of('LotR', 'GoT', 'Matrix')}));
            expect(state).to.equal(Map({movies: List.of('LotR', 'GoT')}));

        });
    });

});

