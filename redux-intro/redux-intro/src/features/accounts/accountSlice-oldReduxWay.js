const initialStateAccount = {
    balance: 0,
    loan: 0,
    loanPurpose: '',
    isLoading: false
}

export default function accountReducer(state = initialStateAccount, action) {
    switch (action.type) {
        case 'account/deposit':
            return {
                ...state, balance: state.balance + action.payload, isLoading: false
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
        case 'account/convertingCurrency':
            return { ...state, isLoading: true }
        default:
            return state;
    }
}

export function deposit(amount, currency) {
    if (currency === 'USD') return { type: "account/deposit", payload: amount };

    //if we return a function, Redux knows that this is the thunk, rhe async action
    return async function (dispatch, getState) {
        //API call
        dispatch({ type: 'account/convertingCurrency' })

        const res = await fetch(
            `https://api.frankfurter.dev/v1/latest?base=${currency}&symbols=USD`
        );
        const data = await res.json();
        const convertedAmount = Number((amount * data.rates["USD"]).toFixed(2));
        console.log(data, convertedAmount) 
        //  return action
        dispatch({ type: "account/deposit", payload: convertedAmount });
    }
}

export function withdraw(amount) {
    return { type: "account/withdraw", payload: amount }
}

export function requestLoan(amount, loanPurpose) {
    return {
        type: 'account/requestLoan',
        payload: { amount, loanPurpose }
    }
}

export function payBackLoan() {
    return { type: 'account/payBackLoan' }
}