
export default function Hero() {
  return (
    <section className="container pt-10">
      <div className="card p-8 md:p-12 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
          Scan. Mint. <span className="text-accent">Remember.</span>
        </h1>
        <p className="mt-4 text-white/70 max-w-2xl mx-auto">
          Dynamic NFT tickets that evolve after entry — flip status from
          “Unused” to “I Was There”, and unlock post‑event perks.
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <a href="#mint" className="btn btn-primary">Mint Ticket</a>
          <a href="#myticket" className="btn btn-outline">View My Ticket</a>
        </div>
      </div>
    </section>
  )
}
