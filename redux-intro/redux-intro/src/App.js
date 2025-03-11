import AccountOperations from "./features/accounts/AccountOperations";
import Customer from "./features/customers/Customer";
import BalanceDisplay from "./features/accounts/BalanceDisplay";
import CreateCustomer from "./features/customers/CreateCustomer";
import { useSelector } from "react-redux";

function App() {

  const fullName = useSelector((state) => state.customer.fullName);

  return (
    <div>
      <h1>🏦 The React-Redux Bank</h1>

      {fullName === '' ? <CreateCustomer /> : null}

      <Customer />
      <AccountOperations />
      <BalanceDisplay />
    </div>
  );
}

export default App;
