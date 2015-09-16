/**
 * Created by vigi on 9/16/15:4:06 PM.
 */
import {List, Map} from 'immutable';

export function setEntries(state, entries) {
    return state.set('entries', List(entries));
}

/**
 * It should create a vote Map on the state, where the two first entries are included under the key pair.
 * The entries under vote should no longer be in the entries List.
 *
 * Once the vote for a given pair is over, we should proceed to the next one.
 * The winning entry from the current vote should be kept, and added back to the end of the entries,
 * so that it will later be paired with something else. The losing entry is thrown away.
 * If there is a tie, both entries are kept.
 *
 * @param state
 * @returns {*}
 */
export function next(state) {
    const entries = state.get('entries').concat(getWinners(state.get('vote')));


    return state.merge({
        vote: Map({pair: entries.take(2)}),
        entries: entries.skip(2)
    });
}

function getWinners(vote) {
    if (!vote) {
        return [];
    }

    const [a, b] = vote.get('pair');
    const aVotes = vote.getIn(['tally', a], 0);
    const bVotes = vote.getIn(['tally', b], 0);

    if (aVotes > bVotes) {
        return [a];
    } else if (aVotes < bVotes) {
        return [b];
    } else {
        return [a, b];
    }
}

/**
 * When a vote is ongoing, it should be possible for people to vote on entries.
 * When a new vote is cast for an entry, a "tally" for it should appear in the vote.
 * If there already is a tally for the entry, it should be incremented.
 *
 * @param state
 * @param entry
 * @returns {*}
 */
export function vote(state, entry) {
    return state.updateIn(['vote', 'tally', entry], 0, tally => tally + 1);
}
