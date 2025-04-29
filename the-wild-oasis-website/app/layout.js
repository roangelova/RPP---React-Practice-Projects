import Logo from "./_components/Logo"
import Navigation from "./_components/Navigation"

import "./_styles/globals.css"

//we can override it in other pages by exporting a new metadata; 
export const metadata = {
  title:
  {
    template: "%s | The Wild Oasis",
    default: "Welcome | The Wild Oasis"
  },
  description: 'Luxurious cabin hotel, located in the heart of the Italian Dolomites, surrounded bu beautiful mountains and dark forests.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-primary-950 text-primary-100">
        <header>
          <Logo />
          <Navigation />
        </header>
        <main>
          {children}
        </main>
        <footer>Copyrighty by The Wild Oasis</footer>
      </body>
    </html>
  )
}
