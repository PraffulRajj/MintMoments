
export function resolveIPFS(uri: string) {
  if (!uri) return uri
  return uri.startsWith('ipfs://') ? uri.replace('ipfs://', 'https://ipfs.io/ipfs/') : uri
}
