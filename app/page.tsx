"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Minus } from "lucide-react"
import { useState } from "react"

interface Person {
  name: string
  paid: number
}

const initialData: Person[] = [
  { name: "", paid: 0 },
  { name: "", paid: 0 },
]

export default function Home() {
  const [people, setPeople] = useState(2)
  const [data, setData] = useState<Person[]>(initialData)
  const [debts, setDebts] = useState<string[]>([])
  function onClick(variation: number) {
    setPeople(people + variation)
    if (variation > 0) {
      setData([...data, { name: "", paid: 0 }])
    } else {
      setData([...data].slice(0, -1))
    }
  }
  const handleNameChange = (index: number, newName: string) => {
    const updatedData = [...data]
    updatedData[index].name = newName
    setData(updatedData)
  }
  const handlePaidChange = (index: number, newPaid: number) => {
    const updatedData = [...data]
    updatedData[index].paid = newPaid
    setData(updatedData)
  }
  const calculate = () => {
    const total = data.reduce((acc, person) => acc + person.paid, 0)
    const each = total / data.length
    const debtsMap: { [key: string]: number } = {}
    data.forEach((person) => {
      const amountEach = person.paid - each
      debtsMap[person.name] = amountEach
    })
    const debts: string[] = []
    for (const creditor in debtsMap) {
      for (const debtor in debtsMap) {
        if (debtsMap[creditor] > 0 && debtsMap[debtor] < 0) {
          const amountToTransfer = Math.min(
            Math.abs(debtsMap[creditor]),
            Math.abs(debtsMap[debtor])
          )
          debts.push(
            `${debtor} owes ${creditor} €${amountToTransfer.toFixed(2)}`
          )
          debtsMap[creditor] -= amountToTransfer
          debtsMap[debtor] += amountToTransfer
        }
      }
    }

    setDebts(debts)
  }
  const clear = () => {
    setPeople(2)
    setData(initialData)
    setDebts([])
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
          disabled={people <= 2}
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
      {/* <div className="flex justify-center items-center mt-5">
        <Input
          type="number"
          id="amount"
          value={amount}
          onChange={handleInputChange}
          placeholder="Total amount:"
          className="w-5/6 bg-inherit text-white text-2xl font-bold border-none text-center"
        />
      </div> */}

      <div className="mt-8 flex flex-col gap-2 px-2">
        {data.map((person, index) => {
          return (
            <div key={index} className="flex flex-row">
              <Input
                type="text"
                value={person.name}
                placeholder="Name"
                onChange={(e) => handleNameChange(index, e.target.value)}
                className="bg-inherit border-x-0 border-y-2 border-slate-500 rounded-none text-white text-lg"
              />
              <Input
                type="number"
                value={person.paid}
                placeholder="Amount paid"
                onChange={(e) =>
                  handlePaidChange(index, parseFloat(e.target.value))
                }
                className="bg-inherit border-x-0 border-y-2 border-slate-500 rounded-none text-white text-lg"
              />
            </div>
          )
        })}
        <Button className="rounded-full" onClick={() => calculate()}>
          Calculate
        </Button>
        <div className="text-white text-lg">
          {debts.map((debt, index) => {
            return (
              <li className="list-none" key={index}>
                {debt}
              </li>
            )
          })}
        </div>
        <Button
          className="rounded-full"
          variant="destructive"
          onClick={() => clear()}
        >
          Clear
        </Button>
      </div>
    </main>
  )
}
