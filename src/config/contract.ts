// Replace with your actual contract address and ABI
import type { Abi } from 'viem'

export const CONTRACT_ADDRESS = '0xea8c4eca7b54cae19C215C8fB34684415475463f' // TODO: replace
export const CHAIN_EXPLORER = 'https://mumbai.polygonscan.com'

export const ABI: Abi = [
  {
    "type":"function","name":"mintTicket","stateMutability":"payable",
    "inputs":[{"name":"eventId","type":"uint256"},{"name":"tier","type":"uint8"}],
    "outputs":[]
  },
  {
    "type":"function","name":"tokenURI","stateMutability":"view",
    "inputs":[{"name":"tokenId","type":"uint256"}],
    "outputs":[{"name":"","type":"string"}]
  },
  {
    "type":"function","name":"balanceOf","stateMutability":"view",
    "inputs":[{"name":"owner","type":"address"}],
    "outputs":[{"name":"","type":"uint256"}]
  },
  {
    "type":"function","name":"tokenOfOwnerByIndex","stateMutability":"view",
    "inputs":[{"name":"owner","type":"address"},{"name":"index","type":"uint256"}],
    "outputs":[{"name":"","type":"uint256"}]
  }
]