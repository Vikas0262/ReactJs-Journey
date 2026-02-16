import { useEffect, useRef, useState } from "react";

export const UseRefExample = () => {

    // useRef is returns a mutable ref object whose .current property is initialized to the passed argument (initialValue). The returned object will persist for the full lifetime of the component.
    // const currentRef = useRef(0);
    // console.log(currentRef)
    // console.log(currentRef.current)

    // const handleAdd = ()=>{
    //     currentRef.current = currentRef.current + 1;
    //     console.log(currentRef.current)
    // }

    // const inputRef = useRef();
    // const [name, setName] = useState('vikas');
    // const handleReset = ()=>{
    //     setName('');
    //     inputRef.current.focus();
    // }
    // const handleChange = ()=>{
    //     inputRef.current.style.color='red';
    // }


    // tracking previous state value using useRef
    // const [count, setCount] = useState(0);
    // const prevCount = useRef(0);
    // useEffect(()=>{
    //     prevCount.current = count; // update the ref value to current count after every render
    // }, [count]) // this effect will run every time count changes



    const [count, setCount] = useState(0);
    let timeRef = useRef(null);
    const setTimer = ()=>{
        timeRef.current = window.setInterval(()=>{
            setCount((prev)=>prev+1)
        },1000)
    }

    const stopTimer = ()=>{
        if(timeRef.current){
            clearInterval(timeRef.current);
            timeRef.current = null;
        }
    }
// react dosent remember the timeid


  return (
    <>
      {/* <div> {currentRef.current}</div>
      <button onClick={handleAdd}>add</button> */}

        {/* <input type="text" ref={inputRef} value={name} onChange={(e)=>setName(e.target.value)} />
        <button onClick={handleReset}>reset</button>
        <button onClick={handleReset}>reset</button>
        <button onClick={handleChange}>change color</button> */}

        {/* // tracking previous state value using useRef */}
        {/* <div>count= {count}</div>
        <div>pre count= {prevCount.current}</div>
        <button onClick={()=>setCount(count+1)}>Increment</button> */}

        <div>count= {count}</div>
        <button onClick={setTimer}>start timer</button>
        <button onClick={stopTimer}>stop timer</button>
        
    </>
  );
} 