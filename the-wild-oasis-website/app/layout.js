import { Josefin_Sans } from "next/font/google";
import "./_styles/globals.css";
import Header from "./_components/Header";
import { ReservationProvider } from "./_components/context/reservationContext";

//import, configure (!we need to make sure we select the correct subset) and then finally use the className
const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
}); // ->provides us with a  __className_2ad2c0

//we can override it in other pages by exporting a new metadata;
export const metadata = {
  title: {
    template: "%s | The Wild Oasis",
    default: "Welcome | The Wild Oasis",
  },
  description:
    "Luxurious cabin hotel, located in the heart of the Italian Dolomites, surrounded bu beautiful mountains and dark forests.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${josefin.className} min-h-screen __className_2ad2c0 bg-primary-950 text-primary-100 flex flex-col relative`}
      >
        <header>
          <Header />
        </header>
        <div className="grid flex-1 px-8 py-12">
          <main className="w-full mx-auto max-w-7xl">
            <ReservationProvider>{children}</ReservationProvider> {/*This works, even though the context is a client compoennt, because the children have 
            already been renderen on the client */}
          </main>
        </div>
      </body>
    </html>
  );
}
