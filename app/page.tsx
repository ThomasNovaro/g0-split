import { Loader } from "lucide-react"
export default function Home() {
  return (
    <div className="text-4xl text-center h-screen w-screen bg-black text-white flex flex-row items-center justify-center gap-6">
      <Loader className="animate-[spin_2s_infinite]" />
      Work in progress
    </div>
  )
}
