"use client"

import { useCopyToClipboard } from "@/hooks/useCopyToClipcoard";
import { useMsalConfig } from "@/msal/MsalConfigProvider"

export default function Home() {
  const context = useMsalConfig()

  const copyToClipboard = useCopyToClipboard()

  if (!context || !context.token) {
    return <div>Loading...</div>;
  }
  
  return (
    <div className="p-10 m-10 rounded-lg text-center flex flex-col gap-4 antialiased">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col">
          <h2>Access Token</h2>
          <div className="flex gap-4 items-center">
            <textarea className="w-full h-32 p-1" value={context.token.accessToken}/>
            <button className="bg-blue-500 text-white p-2 rounded" 
              disabled={!navigator.clipboard} 
              onClick={()=> context.token && copyToClipboard(context.token.accessToken)}
            >Copiar</button>
          </div>
        </div>
        <div className="flex flex-col">
          <h2>ID Token</h2>
          <div className="flex gap-4 items-center">
          <textarea className="w-full h-32 p-1" value={context.token.idToken}/>
          <button className="bg-blue-500 text-white p-2 rounded" 
            disabled={!navigator.clipboard} 
            onClick={()=> context.token && copyToClipboard(context.token.idToken)}
          >Copiar</button>
          </div>
        </div>
      </div>
    </div>
  )
}
