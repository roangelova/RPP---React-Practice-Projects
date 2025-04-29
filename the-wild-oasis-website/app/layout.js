import Logo from "./_components/Logo"
import Navigation from "./_components/Navigation"

import "./_styles/globals.css"

export const metadata = {
  title: 'The wild oasis',
  description: 'The best luxury',
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
