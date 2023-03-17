import Die from "./Die"
import "./App.css"
import { useEffect, useState } from "react"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"

export default function App() {
  const [dice,setDice] =useState(allNewDice())
  const [tensiz,setTensiz] = useState(false)
  useEffect(()=>{
    const allHeld = dice.every(die=> die.isHeld)
    const firstValue=dice[0].value
    const allSame = dice.every(die=> die.value === firstValue)
    if(allHeld && allSame){
      setTensiz(true)
      console.log("you won!")
    }
  }
    ,[dice])
  function allNewDice(){
    const newDice=[]
    for (let i=1;i<=10;i++)
      {
        newDice.push(
          {
            value : Math.floor(Math.random()*6)+1,
            isHeld : false,
            id:nanoid()
          })
      }
      return newDice
    }
    const diceElement=dice.map(
      die => <Die key={die.id} value={die.value} isHeld={die.isHeld} hold={()=>HoldDice(die.id)}/> )
    
    function RollDice(){
    if(!tensiz){setDice(oldDice => oldDice.map(die => {
        return  !die.isHeld ? {
          value : Math.floor(Math.random()*6)+1,
          isHeld : false,
          id:nanoid()
        } : die
      }))} else{
        setTensiz(false) 
        setDice(allNewDice())
      }
    }
    
    function HoldDice(id){
      setDice(oldDice => oldDice.map(die => {
        return  die.id === id ? {...die,isHeld: true} : die
      }))
    }
    
    return (
        <main>
          {tensiz && <Confetti/>}
          <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className="dice-container">
                {diceElement}
            </div>
            <button 
              className="roll-dice"
              onClick={RollDice}>
              {tensiz ? "New Game" : "Roll"}
            </button>
        </main>
    )
}