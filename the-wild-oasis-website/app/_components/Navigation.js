import Link from "next/link";
import { auth } from "../_lib/auth";

async function Navigation() {
  const session = await auth(); //this will make the route and the whole app dynamic; cookies can only be known at runtime; 

  return (
    <nav className="z-10 text-xl">
      <ul className="flex items-center gap-16">
        <li>
          <Link
            href="/cabins"
            className="transition-colors hover:text-accent-400"
          >
            Cabins
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="transition-colors hover:text-accent-400"
          >
            About
          </Link>
        </li>
        <li>
          {session?.user?.image ? (
            <Link
              href="/account"
              className="transition-colors hover:text-accent-400 flex items-center gap-4"
            >
              <img
                src={session.user.image}
                className="h-8 rounded-full"
                alt="user image"
                referrerPolicy="no-referrer"
              />
              {session.user.name}
            </Link>
          ) : (
            <Link
              href="/account"
              className="transition-colors hover:text-accent-400"
            >
              Guest area
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
