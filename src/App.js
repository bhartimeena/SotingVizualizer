import React, { useState, useEffect } from 'react'

import Navbar from './components/Navbar'
import Bars from './components/Bars'

import bubbleSort from './algorithms/BubbleSort'
import selectionSort from './algorithms/SelectionSort'
import insertionSort from './algorithms/InsertionSort'
import mergeSort from './algorithms/MergeSort'
import quickSort from './algorithms/QuickSort'

function App() {
  // Generating shuffled array of 1 to n
  const generateRandomArray = (len) => {
    setCompleted(false)
    setSorting(false)
    setSortedIndex([])

    const randomArray = Array.from(Array(len + 1).keys()).slice(1)

    for (let i = randomArray.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i - 1))
      const temp = randomArray[i]

      randomArray[i] = randomArray[randomIndex]
      randomArray[randomIndex] = temp
    }

    setBlocks(randomArray)
  }

  // States
  const [algo, setAlgo] = useState('bubbleSort')
  const [len, setLength] = useState(30)
  const [blocks, setBlocks] = useState([])
  const [sorting, setSorting] = useState(false)
  const [completed, setCompleted] = useState(true)
  const [speed, setSpeed] = useState(250)
  const [compare, setCompare] = useState([])
  const [swap, setSwap] = useState([])
  const [sortedIndex, setSortedIndex] = useState([])

  // Generating random array every time the length is changed by th user
  useEffect(() => {
    generateRandomArray(len)
  }, [len, algo])

  // setting the selected algorithm
  const handleAlgo = (event) => {
    setAlgo(event.target.value)
  }

  // handling the length of the array
  const handleLength = (event) => {
    setLength(Number(event.target.value))
  }

  // handling the speed of sorting
  const handleSpeed = (event) => {
    setSpeed(Math.ceil(400 / Number(event.target.value)))
  }


  // const prevStep = () => {
  //   setIndex((prev)=>{
  //     if(prev - 1 >= 0)
  //       return prev - 1
  //     return prev
  //   });
  //   let idx1 = cmpIndexes[index][0] //-1
  //   let idx2 = cmpIndexes[index][1]  //-1
  //   const array_bars = document.getElementsByClassName('array-bar')
  //   if(idx2 !== -1 && array_bars[idx1])
  //     setComparisons(prev=>prev-2)
  //   changeArray(index)               //-1
    
  //   for(let i = 0; i <= idx2; i++){
  //     array_bars[i].style.backgroundColor = 'green'
  //   }
  //   let i;
  //   for(i = idx1+1; i+1 < array_bars.length && arrayStates[index][i] <= arrayStates[index][i+1]; i++){
  //     array_bars[i].style.backgroundColor = '#03f0fc'
  //   }
  //   //new
  //   if(arrayStates[index][i] > arrayStates[index][i-1]){
  //     array_bars[i].style.backgroundColor = '#03f0fc'
  //     i++;
  //   }
  //   for( ; i < array_bars.length; i++){
  //     array_bars[i].style.backgroundColor = 'red'
  //   }
  //   array_bars[idx1].style.backgroundColor = 'blue'
  //   if(array_bars[idx2])
  //     array_bars[idx2].style.backgroundColor = 'pink'
  //   setArray(arrayStates[index])
  // }
  // const nextStep = () => {
  //   setIndex((prev)=>{
  //     if(prev+1 < arrayStates.length)
  //       return prev+1
  //     return prev;
  //   })
  //   changeArray(index)
  //   let idx1 = cmpIndexes[index][0]
  //   let idx2 = cmpIndexes[index][1]
  //   const array_bars = document.getElementsByClassName('array-bar')
  //   for(let i = 0; i <= idx2; i++){
  //     array_bars[i].style.backgroundColor = 'green'
  //   }
  //   // new
  //   let i;
  //   for(i = idx1+1; i < array_bars.length && arrayStates[index][i] > arrayStates[index][i-1]; i++){
  //     array_bars[i].style.backgroundColor = '#03f0fc'
  //   }
  //   for( ; i < array_bars.length; i++){
  //     array_bars[i].style.backgroundColor = 'red'
  //   }
  //   // for(let i = idx1+1; i < array_bars.length; i++){
  //   //   array_bars[i].style.backgroundColor = '#03f0fc'
  //   // }
  //   array_bars[idx1].style.backgroundColor = 'blue'
  //   if(array_bars[idx2])
  //     array_bars[idx2].style.backgroundColor = 'pink'
  //   setArray(arrayStates[index])
  //   if(index === arrayStates.length-1){
  //     for(let i =0; i < array_bars.length; i++){
  //       array_bars[i].style.backgroundColor = 'green'
  //     }
  //   }
  // }


  // Sorting according to the algorithm
  const handleSort = () => {
    const sortAccOrder = (order) => {
      ;(function loop(i) {
        setTimeout(function () {
          const [j, k, arr, index] = order[i]
          setCompare([j, k])
          setSwap([])

          if (index !== null) {
            setSortedIndex((prevState) => [...prevState, index])
          }

          if (arr) {
            setBlocks(arr)
            if (j !== null || k != null) setSwap([j, k])
          }

          if (++i < order.length) {
            loop(i)
          } else {
            setSorting(false)
            setCompleted(true)
          }
        }, speed)
      })(0)
    }

    setSorting(true)

    algo === 'bubbleSort'
      ? sortAccOrder(bubbleSort(blocks))
      : algo === 'selectionSort'
      ? sortAccOrder(insertionSort(blocks))
      : algo === 'insertionSort'
      ? sortAccOrder(selectionSort(blocks))
      : algo === 'mergeSort'
      ? sortAccOrder(mergeSort(blocks))
      : algo === 'quickSort'
      ? sortAccOrder(quickSort(blocks))
      : (() => {
          setSorting(false)
          setCompleted(true)
        })()
  }

  return (
    <div className='App'>
      <Navbar
        generateRandomArray={() => generateRandomArray(len)}
        handleLength={handleLength}
        handleSpeed={handleSpeed}
        handleAlgo={handleAlgo}
        handleSort={handleSort}
        sorting={sorting}
        completed={completed}
        len={len}
        speed={speed}
        algo={algo}
        // nextStep = {nextStep}
        // prevStep ={prevStep}
        setIndex ={setBlocks}
      />

      <Bars
        blocks={blocks}
        compare={sorting && compare}
        swap={sorting && swap}
        sorted={sortedIndex}
      />
    </div>
  )
}

export default App
