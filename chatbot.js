"use strict";


function editDistance(a, b) {
    let s1 = a;
    let s2 = b;

    if (s1.length > s2.length) {
        const temp = s1;
        s1 = s2;
        s2 = temp;
    }

    let distances = [];
    for (let i = 0; i < s1.length + 1; ++i) distances.push(i);

    for (let i2 = 0; i2 < s2.length; ++i2) {
        const c2 = s2[i2];
        const distances_ = [i2 + 1];

        for (let i1 = 0; i1 < s1.length; ++i1) {
            const c1 = s1[i1];

            if (c1 === c2) {
                distances_.push(distances[i1]);
            } else {
                distances_.push(1 + Math.min((
                    distances[i1],
                    Math.min(
                        distances[i1 + 1],
                        distances_[-1],
                    )
                )));
            }
        }

        distances = distances_;
    }

    return distances[-1];

    //distances = range(len(s1) + 1)
    //for i2, c2 in enumerate(s2):
    //    distances_ = [i2+1]
    //    for i1, c1 in enumerate(s1):
    //        if c1 == c2:
    //            distances_.append(distances[i1])
    //        else:
    //            distances_.append(1 + min((distances[i1], distances[i1 + 1], distances_[-1])))
    //    distances = distances_
    //return distances[-1]
}



function editDistanceStateSelector(userMsg, curState) {
    let minDistance = 1e9;
    let closestKeyword = '';
    let closestMatch = '';
    let nextState = curState;

    for (let childState of curState.responses) {
        for (let keyword of childState.keywords) {

            // Sliding window
            for (let i = 0; i < userMsg.length - keyword.length + 1; ++i) {
                const phrase = userMsg.toLowerCase().substring(i, i + keyword.length);

                const distance = editDistance(phrase, keyword) / keyword.length;

                if (distance < minDistance) {
                    minDistance = distance;
                    closestKeyword = keyword;
                    closestMatch = phrase;
                    nextState = childState;
                }
            }
        }
    }

    console.log(closestKeyword, closestMatch, minDistance);

    if (minDistance <= 0.2) {
        return nextState;
    }

    return null;
}


function naiveStateSelector(userMsg, curState) {
    for (let childState of curState.responses) {
        for (let keyword of childState.keywords) {
            if (userMsg.search(keyword) !== -1) {
                console.log(userMsg, keyword);
                return childState;
            }
        }
    }

    return null;
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
        let response = this.config.errorMessage;
        let i = 0;

        while (true) {
            if (!this.state.hasOwnProperty('responses')) {
                this.reset();
                break;
            }

            const nextState = naiveStateSelector(userMsg, this.state);
            if (nextState === null) break;

            this.state = nextState;
            response = nextState.message;

            ++i;
            if (i >= 100) {
                console.log('error');
                break;
            }
        }

        return response;
    }
}
