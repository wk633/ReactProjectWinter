const ADD_ONE = 'add one';
const MINUS_ONE = 'minus one';

export function count(state=0, action){
    switch (action.type) {
        case ADD_ONE:
            return state + 1;
        case MINUS_ONE:
            return state - 1;
        default:
            return 10;
    }
}

// action
export function addOne(){
    return {type: ADD_ONE};
}
export function minusOne(){
    return {type: MINUS_ONE};
}