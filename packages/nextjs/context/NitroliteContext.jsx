'use client'

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { useWalletClient, useAccount } from 'wagmi'
import { createPublicClient, http } from 'viem'
import { sepolia } from 'viem/chains'
import {
  generatePrivateKey,
  privateKeyToAccount,
} from 'viem/accounts'

import {
  NitroliteClient,
  WalletStateSigner,
  createECDSAMessageSigner,
  createAuthRequestMessage,
  createEIP712AuthMessageSigner,
  createAuthVerifyMessageFromChallenge,
} from '@erc7824/nitrolite'


/* -------------------------------------------------- */
/* Context */
/* -------------------------------------------------- */

const NitroliteContext = createContext(null)

export const useNitrolite = () => {
  const ctx = useContext(NitroliteContext)
  if (!ctx) {
    throw new Error('useNitrolite must be used inside NitroliteProvider')
  }
  return ctx
}

/* -------------------------------------------------- */
/* Provider */
/* -------------------------------------------------- */

const NitroliteProvider = ({ children }) => {
  const { data: walletClient } = useWalletClient()
  const { chain, address } = useAccount()

  const wsRef = useRef(null)

  const [client, setClient] = useState(null)
  const [sessionSigner, setSessionSigner] = useState(null)
  const [sessionAddress, setSessionAddress] = useState(null)
  const [isReady, setIsReady] = useState(false)
  const [bu, setBu] = useState({})

  useEffect(() => {
    if (!walletClient) return
    if (chain?.id !== sepolia.id) return

    /* ---------- Public client ---------- */
    const publicClient = createPublicClient({
      chain: sepolia,
      transport: http(process.env.NEXT_PUBLIC_ALCHEMY_RPC_URL),
    })

    /* ---------- Nitrolite client ---------- */
    const nitroClient = new NitroliteClient({
      publicClient,
      walletClient,
      stateSigner: new WalletStateSigner(walletClient),
      addresses: {
        custody: '0x019B65A265EB3363822f2752141b3dF16131b262',
        adjudicator: '0x7c7ccbc98469190849BCC6c926307794fDfB11F2',
      },
      chainId: sepolia.id,
      challengeDuration: 3600n,
    })

    setClient(nitroClient)

    /* ---------- Session key (OFF-CHAIN) ---------- */
    const sessionPrivateKey = generatePrivateKey()
    const sessionSignerLocal = createECDSAMessageSigner(sessionPrivateKey)
    const sessionAccount = privateKeyToAccount(sessionPrivateKey)

    setSessionSigner(sessionSignerLocal)
    setSessionAddress(sessionAccount.address)


    const authParams = {
      address: address,
      application: 'Test app',
      session_key: sessionAccount.address,
      allowances: [],
      expires_at: BigInt(Math.floor(Date.now() / 1000) + 3600),
      scope: 'test.app',
    };


    /* ---------- WebSocket ---------- */
    const ws = new WebSocket('wss://clearnet-sandbox.yellow.com/ws')
    wsRef.current = ws

    ws.onmessage = async (event) => {
      const msg = JSON.parse(event.data)
      console.log(msg);

      const msgRes = msg.res[1];


      /* ---------- Auth challenge ---------- */
      if (msgRes === 'auth_challenge') {
        console.log("Auth challenge received!")
        const challenge = msg.res[2].challenge_message

        const authSigner = createEIP712AuthMessageSigner(
          walletClient,
          authParams,
          { name: 'Test app' }
        )

        const verifyMsg =
          await createAuthVerifyMessageFromChallenge(authSigner, challenge)

        ws.send(verifyMsg)
      }

      /* ---------- Auth success ---------- */
      if (msgRes === 'auth_verify') {
        console.log('Yellow sandbox auth complete')
        setIsReady(true)
      }

      if (msgRes === 'bu') {
        console.log(msg.res[2].balance_updates[0]);
        setBu(msg.res[2].balance_updates[0]);
      }

    }

    ws.onerror = (err) => {
      console.error('WS error', err)
    }

    ws.onopen = async () => {
      const authRequest = await createAuthRequestMessage(authParams)
      console.log("Auth message sent!")
      console.log("type", typeof authRequest)
      ws.send(authRequest)
    }


    ws.onclose = () => {
      wsRef.current = null
      setIsReady(false)
    }

    return () => {
      ws.close()
      setIsReady(false)
    }
  }, [walletClient, chain])

  return (
    <NitroliteContext.Provider
      value={{
        client,
        ws: wsRef.current,
        sessionSigner,
        sessionAddress,
        isReady,

      }}
    >
      {children}
    </NitroliteContext.Provider>
  )
}

export default NitroliteProvider
