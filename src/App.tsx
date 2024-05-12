import React, { useEffect } from 'react';
import './App.css';
import { Item } from './interface'
import List from './List';


const initial: Item[] = []

for (let i = 1; i < 11; i++) {
  initial.push({
    id: i,
    isBooked: false,
    userName: ''
  })
}
function App() {
  const [items, setItems] = React.useState<Item[]>(initial)
  const [numbers, setNumbers] = React.useState<number[]>([])
  const [userName, setUserName] = React.useState<string>('')

  const [edit, setEdit] = React.useState<Item | null>(null)
  const [value, setValue] = React.useState<string>('')


  const refInput = React.useRef<HTMLInputElement>(null)

  useEffect(() => {
    refInput.current?.focus()
  }, [])

  const getNumber = () => {
    function getRandomNumber(): void {
      const randomValue = Math.floor(Math.random() * 10) + 1

      if (numbers.includes(randomValue)) {
        return getRandomNumber()
      } else {
        setNumbers(numbers => [...numbers, randomValue])
        setItems(items => items.map(item => {
          if (item.id === randomValue) {
            return {
              ...item,
              isBooked: true,
              userName: userName
            }
          }
          return item
        }))
      }
    }
    getRandomNumber()
    setUserName('')
    refInput.current?.focus()


  }

  const handleChange = (e: any) => {
    if (numbers.length !== 10) {
      setUserName(e.target.value)
    }
  }

  const cb = (item: Item) => {
    setEdit(item)
    setValue(item.userName)
  }

  const handleEdit = (e: any) => {
    setValue(e.target.value)
  }

  const handleSave = () => {
    setItems(items => items.map(item => {
      if (item.id === edit?.id) {
        return {
          ...item,
          userName: value
        }
      }
      return item
    }))
    setEdit(null)
  }



  return (
    <div className="App">
      <header className="App-header">
        <div className='wrapper'>
          <List items={items} cb={cb} />
        </div>

        <div className="button">
          <div>
            {edit && (
              <>
                <span>
                  <input type='text' value={value} onChange={handleEdit}></input>
                </span>
                <button onClick={handleSave} className='button__submit-changes'><i className="fa fa-check" aria-hidden="true"></i></button>
              </>

            )}
          </div>
          {
            numbers.length !== 10 && (
              <input

                type="text"
                value={userName}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    getNumber()
                  }
                }}
                onChange={handleChange} ref={refInput}
              ></input>
            )
          }



          {numbers.length !== 10 && (<button className='button__random' onClick={getNumber} disabled={numbers.length === 10}>random</button>)}

          <button className='button__clean' onClick={() => {
            setNumbers([])
            setItems(() => initial)
          }}><i className="fa fa-trash-o"></i></button>

        </div>

      </header>
    </div>
  );
}

export default App;
