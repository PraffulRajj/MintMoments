
import { ConnectButton } from '@rainbow-me/rainbowkit'

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-primary/80 backdrop-blur border-b border-white/10">
      <div className="container flex items-center justify-between py-4">
        <div className="text-xl font-bold tracking-wide">MintMoments</div>
        <nav className="hidden md:flex items-center gap-6 text-white/80">
          <a href="#mint">Mint</a>
          <a href="#myticket">My Ticket</a>
          <a href="#docs">Docs</a>
        </nav>
        <ConnectButton />
      </div>
    </header>
  )
}
