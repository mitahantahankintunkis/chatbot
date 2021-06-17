"use strict";



function naiveStateSelector(userMsg, curState) {
    const ret = [];

    // hack
    let msg = userMsg.toLowerCase();
    msg = msg.replaceAll('ä', 'a');
    msg = msg.replaceAll('ö', 'o');
    msg = msg.replaceAll('å', 'o');

    for (let childState of curState.responses) {
        for (let [keyword, weight] of childState.keywords) {
            // hack
            keyword = keyword.replaceAll('ä', 'a');
            keyword = keyword.replaceAll('ö', 'o');
            keyword = keyword.replaceAll('å', 'o');

            const re = new RegExp(`\\b${keyword}\\b`, 'giu');

            if (msg.match(re)) {
                ret.push([childState, weight]);
            }
        }
    }

    return ret;
}


export class ChatBot {
    constructor(configuration) {
        this.config = configuration;
        this.state = configuration;
    }

    reset() {
        this.state = this.config;
        return this.state.message;
    }

    respond(userMsg) {
        // Recursively finds the deepest/best part of the
        // conversation tree to traverse to
        let nextState;
        let maxWeight = 0;

        const rec = (state=this.state, weight=0) => {
            if (weight > maxWeight) {
                maxWeight = weight;
                nextState = state;
            }

            // Leaf node
            if (!state.hasOwnProperty('responses')) return;

            const possibleStates = naiveStateSelector(userMsg, state);

            possibleStates.forEach(([s, w]) => {
                rec(s, weight + w);
            });
        };

        rec();

        // Can not respond
        if (!nextState) return this.state.error;

        // Resets on leaf node
        if (!nextState.hasOwnProperty('responses')) {
            this.reset();
        } else {
            this.state = nextState;
        }

        return nextState.message;
    }
}
