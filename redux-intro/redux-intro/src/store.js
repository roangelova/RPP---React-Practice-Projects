import { createStore } from "redux";

const initialState = {
    balance: 0,
    loan: 0,
    loanPurpose: ''
}

function reducer(state = initialState, action) {
    switch (action.type) {
        case 'account/deposit':
            return {
                ...state, balance: state.balance + action.payload
            }
        case 'account/withdraw':
            return {
                ...state, balance: state.balance - action.payload
            }
        case 'account/requestLoan':
            if (state.loan > 0) return state;
            return {
                ...state,
                balance: state.balance + action.payload.amount,
                loan: action.payload.amount,
                loanPurpose: action.payload.loanPurpose
            }
        case 'account/payBackLoan':
            return {
                ...state,
                loan: 0,
                loanPurpose: '',
                balance: state.balance - state.loan
            }

        default:
            return state;
    }
}

const store = createStore(reducer);

function deposit(amount) {
    return { type: "account/deposit", payload: amount }
}
store.dispatch(deposit(500));
console.log(store.getState());

function withdraw(amount) {
    return { type: "account/withdraw", payload: amount }
}

store.dispatch(withdraw(200));
console.log(store.getState());

function requestLoan(amount, loanPurpose) {
    return {
        type: 'account/requestLoan',
        payload: { amount, loanPurpose }
    }
}

store.dispatch(requestLoan(1000, 'Buy a cheap car'))
console.log(store.getState());

function payBackLoan() {
    return { type: 'account/payBackLoan' }
}
store.dispatch(payBackLoan());
console.log(store.getState());