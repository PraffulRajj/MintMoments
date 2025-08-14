import { useState } from 'react'
import StatusCard from './StatusCard'

export default function MyTicketSection() {
  const [manualId, setManualId] = useState<string>('')
  const [selectedId, setSelectedId] = useState<string>('')

  return (
    <section id="myticket" className="space-y-4">
      <h2 className="text-2xl font-bold">My Ticket</h2>
      <div className="card p-6 space-y-4">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm text-white/70">Enter Token ID</label>
            <input className="input w-full" placeholder="e.g. 1" value={manualId} onChange={e=>setManualId(e.target.value)} />
          </div>
          <div className="flex items-end">
            <button className="btn btn-outline w-full" onClick={()=>setSelectedId(manualId)}>
              Load Ticket
            </button>
          </div>
        </div>
        <div className="text-white/60 text-sm">Tip: If your contract supports enumeration, you can extend this to auto‑detect owned tokenIds.</div>
        {selectedId && <StatusCard tokenId={selectedId} />}
      </div>
    </section>
  )
}