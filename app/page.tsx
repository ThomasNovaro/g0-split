"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Minus } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import * as ga from "react-ga"
import { motion, AnimatePresence } from "framer-motion"

interface Person {
  name: string
  paid: number
}

const initialData: Person[] = [
  { name: "", paid: NaN },
  { name: "", paid: NaN },
]

export default function Home() {
  useEffect(() => {
    ga.initialize("G-ZF2T3R39MW")
  }, [])
  const [people, setPeople] = useState(2)
  const [data, setData] = useState<Person[]>(initialData)
  const [debts, setDebts] = useState<string[]>([])
  const containerRef = useRef(null)
  const onClick = (variation: number) => {
    setPeople(people + variation)
    if (variation > 0) {
      setData([...data, { name: "", paid: NaN }])
    } else {
      const newData = [...data].slice(0, -1)
      setData(newData)
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
          debts.push(`${debtor} -> ${creditor} €${amountToTransfer.toFixed(2)}`)
          debtsMap[creditor] -= amountToTransfer
          debtsMap[debtor] += amountToTransfer
        }
      }
    }

    setDebts(debts)
  }
  const clear = () => {
    setPeople(2)
    setDebts([])
    const clearedData = initialData.map((person) => ({ name: "", paid: NaN }))
    setData(clearedData)
  }
  return (
    <main className="h-screen bg-white">
      <h1 className="text-[48px] bg-gradient-to-r from-green-700 to-green-500 bg-clip-text text-transparent text-center font-bold pt-5">
        G&#120792; SPLIT
      </h1>
      <div className="flex flex-row items-center justify-center gap-3 mt-6">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-red-300"
          onClick={() => onClick(-1)}
          disabled={people <= 2}
        >
          <Minus />
        </Button>
        <div className="text-black text-2xl font-bold">{people}</div>

        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-green-300"
          onClick={() => onClick(1)}
        >
          <Plus />
        </Button>
      </div>
      <div
        ref={containerRef}
        className="mt-8 flex flex-col gap-2 p-3 m-2 bg-bento rounded-xl"
      >
        <AnimatePresence>
          {data.map((person, index) => {
            return (
              <motion.div
                key={index}
                className="flex flex-row gap-2"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.5 }}
              >
                <Input
                  type="text"
                  value={person.name}
                  placeholder="Name"
                  onChange={(e) => handleNameChange(index, e.target.value)}
                  className="rounded-xl"
                />
                <Input
                  type="number"
                  value={person.paid}
                  placeholder="€"
                  onChange={(e) =>
                    handlePaidChange(index, parseFloat(e.target.value))
                  }
                  className="rounded-xl w-[75px]"
                />
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
      <div className="flex flex-row items-center justify-center gap-3 my-6">
        <Button className="rounded-xl" onClick={() => calculate()}>
          Calculate
        </Button>
        <Button
          className="rounded-xl"
          variant="destructive"
          onClick={() => clear()}
        >
          Clear
        </Button>
      </div>
      <div
        className={`${
          debts.length === 0 ?? "hidden"
        } text-black flex flex-col gap-2 bg-bento rounded-xl m-2 text-lg p-4`}
      >
        <AnimatePresence>
          {debts.map((debt, index) => {
            return (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5 }}
                className="rounded-xl bg-white text-center"
                key={index}
              >
                {debt}
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </main>
  )
}
