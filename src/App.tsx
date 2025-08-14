
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import MintSection from './components/MintSection'
import MyTicketSection from './components/MyTicketSection'

export default function App() {
  return (
    <div>
      <Navbar />
      <main className="container space-y-14 pb-16">
        <Hero />
        <MintSection />
        <MyTicketSection />
      </main>
      <footer className="mt-8 py-10 text-center text-white/60">
        MintMoments • PS-3 Dynamic NFT Tickets • 2025
      </footer>
    </div>
  )
}
