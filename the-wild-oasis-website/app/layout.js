import Logo from "./components/Logo"
import Navigation from "./components/Navigation"

export const metadata = {
  title: 'The wild oasis',
  description: 'The best luxury',
}

export default function RootLayout({ children }) {
  return (
    <html metadata={metadata} lang="en">
      <body>
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
