import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    balance: 0,
    loan: 0,
    loanPurpose: '',
    isLoading: false
}

const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        deposit(state, action) {
            state.balance += action.payload;
            state.isLoading = false;
        },
        withdraw(state, action) {
            state.balance -= action.payload;
        },
        requestLoan: {
            prepare(amount, purpose) {
                //this way we can receive more than one argument; 
                return {
                    payload:{ amount, purpose}
                }
            },

            reducer(state, action) {
                if (state.loan > 0) return;

                state.loan = action.payload.amount;
                state.loanPurpose = action.payload.purpose;
                state.balance = state.balance + action.payload.amount;
            }
        },
        payBackLoan(state) {
            //we now need to pay attention to the order of the code!
            state.balance -= state.loan;
            state.loan = 0;
            state.loanPurpose = '';
        },
        convetingCurrency(state) {
            state.isLoading = true;
        }
    }
})

export const { withdraw, requestLoan, payBackLoan } = accountSlice.actions;


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

export default accountSlice.reducer;
