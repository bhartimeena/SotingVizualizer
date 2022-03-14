import React from 'react'
import './Navbar.css'
import {FaBackward} from 'react-icons/fa'
import {FaForward} from 'react-icons/fa'
import {FaPlay} from 'react-icons/fa'
import {FaPause} from 'react-icons/fa'


const Navbar = ({
  handleLength,
  handleSpeed,
  handleAlgo,
  generateRandomArray,
  handleSort,
  sorting,
  completed,
  len,
  speed,
  algo,
  isPlay,
  setIsPlay, 
  prevStep, 
  nextStep 
}) => {
    // handle play/pause button
    const playOrPause = () => {
      console.log('call', isPlay)
      // console.log(copyArray)
      if(!isPlay){
        setIsPlay(true)
        handleAlgo() // create useEffect function
      }else{
        setIsPlay(false)
      }
    }
  
  return (
    <nav>
      <div
        className='nav-brand'
        onClick={() =>
          (window.location =
            'https://github.com/bhartimeena/Lets sort')
        }
      >
        Sorting Visualizer
      </div>

      <div className='toolbox'>
        <div>
          
          <div className='group speed'>
            
            <label>Speed</label>
            <input
              type='range'
              onChange={handleSpeed}
              min='1'
              max='10'
              value={Math.ceil(400 / speed)}
              disabled={sorting}
            ></input>
          </div>

          <div className='group length'>
            <label>Length</label>
            <input
              type='range'
              onChange={handleLength}
              min='5'
              max={100}
              step='1'
              disabled={sorting}
              value={len}
            ></input>
          </div>

          <select onChange={handleAlgo} disabled={sorting} value={algo}>
            <option value='bubbleSort'>Bubble Sort</option>
            <option value='selectionSort'>Selection Sort</option>
            <option value='insertionSort'>Insertion Sort</option>
            <option value='mergeSort'>Merge Sort</option>
            <option value='quickSort'>Quick Sort</option>
          </select>
        </div>

        <div>
          <button onClick={generateRandomArray} disabled={sorting}>
            New Array
          </button>
        
          <div className='pp'>
        {/* <button className='btn icon' onClick={() => prevStep()}>
          <FaBackward/>
        </button> */}
        <button className='btn icon' onClick={() => handleSort()}>
          {isPlay ? <FaPause/> : <FaPlay/>} 
        </button>
        {/* <button className='btn icon' onClick={() => nextStep()}>
          <FaForward/>
        </button> */}
      </div>



        </div>
      </div>
    </nav>
  )
}

export default Navbar
