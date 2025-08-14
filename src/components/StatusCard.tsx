
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useReadContract } from 'wagmi'
import { ABI, CONTRACT_ADDRESS, CHAIN_EXPLORER } from '../config/contract'
import { resolveIPFS } from '../lib/ipfs'
import type { NFTMetadata } from '../types/metadata'

export default function StatusCard({ tokenId }: { tokenId: string }) {
  const [meta, setMeta] = useState<NFTMetadata | null>(null)
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  const { data: tokenURI } = useReadContract({
    abi: ABI, address: CONTRACT_ADDRESS as `0x${string}`,
    functionName: 'tokenURI', args: [BigInt(tokenId)]
  })

  const fetchMeta = async () => {
    if (!tokenURI) return
    try {
      setLoading(true); setErr(null)
      const url = resolveIPFS(String(tokenURI))
      const { data } = await axios.get(url)
      setMeta(data)
    } catch (e:any) {
      setErr(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchMeta() }, [tokenURI])

  return (
    <div className="card p-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/3">
          <div className="aspect-square overflow-hidden rounded-xl bg-white/10">
            {loading && <div className="w-full h-full animate-pulse" />}
            {!loading && meta?.image && <img src={resolveIPFS(meta.image)} className="w-full h-full object-cover" />}
          </div>
        </div>
        <div className="md:flex-1 space-y-3">
          <div className="text-xl font-bold">{meta?.name || `Ticket #${tokenId}`}</div>
          {meta?.description && <p className="text-white/70">{meta.description}</p>}
          {err && <div className="text-sm text-red-400">Error loading metadata: {err}</div>}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {meta?.attributes?.map((a,i)=>(
              <div key={i} className="bg-white/10 rounded-lg px-3 py-2 text-sm">
                <div className="text-white/60">{a.trait_type}</div>
                <div className="font-semibold">{String(a.value)}</div>
              </div>
            ))}
          </div>
          <div className="pt-2 text-sm text-white/70">
            View on explorer: <a href={`${CHAIN_EXPLORER}/token/${CONTRACT_ADDRESS}?a=${tokenId}`} target="_blank" rel="noreferrer">Open</a>
          </div>
          <button onClick={fetchMeta} className="btn btn-outline mt-2">Refresh Metadata</button>
        </div>
      </div>
    </div>
  )
}
