import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import MintSection from "../components/MintSection";
import MyTicketSection from "../components/MyTicketSection";

export function Dashboard() {
  return (
    <div className="min-h-screen bg-primary">
      <Navbar />
      <main>
        <Hero />
        <div className="max-w-7xl mx-auto px-4 py-12 space-y-24">
          <MintSection />
          <MyTicketSection />
        </div>
      </main>
    </div>
  );
}
