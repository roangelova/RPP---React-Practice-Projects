import { combineReducers, createStore } from "redux";

const initialStateAccount = {
    balance: 0,
    loan: 0,
    loanPurpose: ''
}

const initialStateCustomer = {
    fullName: '',
    nationalID: '',
    createdAt: ''
}

function accountReducer(state = initialStateAccount, action) {
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

function customerReducer(state = initialStateCustomer, action) {
    switch (action.type) {
        case 'customer/createCustomer':
            return {
                ...state,
                fullName: action.payload.fullName,
                nationalID: action.payload.nationalID,
                createdAt: action.payload.createdAt
            }

        case 'customer/updateName':
            return {
                ...state,
                fullName: action.payload.fullName
            }

        default: return state;
    }
}

const rootReducer = combineReducers({
    customer: customerReducer,
    account: accountReducer
})

const store = createStore(rootReducer);

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

/////////////////////////////////

function createCustomer(fullName, nationalID) {
    return { type: 'customer/createCustomer', payload: { fullName, nationalID, createdAt: new Date().toISOString() } }
}

store.dispatch(createCustomer('Rosi', '123456789'))
console.log(store.getState());

function updateName(fullName) {
    return { type: 'customer/updateName', payload: fullName }
}