import {ReactNode } from "react"

interface DefaultProviderProps {
  children: ReactNode
}


export function DefaultLayout({children}: DefaultProviderProps){
  return (
    <div className="px-[10%] min-h-screen bg-stone-100 pb-[60px]">
      {children}
    </div>
  )
}