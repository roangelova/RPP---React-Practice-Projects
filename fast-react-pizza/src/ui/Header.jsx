import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import Username from "../features/user/Username";

function Header() {
    return (
        <header className="px-4 py-3 uppercase bg-yellow-500 border-b border-stone-200 sm:px-6">
            <Link className="tracking-widest" to='/' >Fast React Pizza Co.</Link>

            <SearchOrder />

            <Username/>
        </header>
    );
}

export default Header;