"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Minus } from "lucide-react"
import { useState } from "react"
export default function Home() {
  const [people, setPeople] = useState(2)
  const [amount, setAmount] = useState(0)
  const [each, setEach] = useState(0)
  function onClick(variation: number) {
    setPeople(people + variation)
  }
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(event.target.value)
    setAmount(newValue)
  }
  function calculate(amount: number, people: number) {
    const each = Math.round((amount / people) * 100) / 100
    setEach(each)
  }
  return (
    <main className="h-screen bg-[#212121]">
      <h1 className="text-4xl text-white text-center font-black pt-4">
        G&#120792; SPLIT
      </h1>
      <div className="flex flex-row items-center justify-center gap-3 mt-6">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full"
          onClick={() => onClick(-1)}
          disabled={people <= 1}
        >
          <Minus />
        </Button>
        <div className="text-white text-2xl font-bold">{people}</div>

        <Button
          variant="outline"
          size="icon"
          className="rounded-full"
          onClick={() => onClick(1)}
        >
          <Plus />
        </Button>
      </div>
      <div className="flex justify-center items-center mt-5">
        <Input
          type="number"
          id="amount"
          value={amount}
          onChange={handleInputChange}
          placeholder="Total amount:"
          className="w-5/6 bg-inherit text-white text-2xl font-bold border-none text-center"
        />
      </div>
      <Button
        className="rounded-full"
        onClick={() => calculate(amount, people)}
      >
        Calculate
      </Button>
      <div className="text-white text-2xl font-bold">{each}€</div>
    </main>
  )
}
