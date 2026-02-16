import { useState, useEffect } from "react";

export const UseeffectExample = () => {
  const [count, setCount] = useState(0);
  // const [number, setNumber] = useState(10);

  // when my state change then useEffect will run and print hello in console
  // useEffect takes two arguments, first is callback function and second is dependency array
  // if we not pass second argument then useEffect will run after every render
  // if we pass empty array then useEffect will run only once when component mount first time
  // see [number] in dependency array then useEffect will run only when number state change

  // useEffect(()=>{
  //     console.log('hello')
  // },[number])

  // useEffect(()=>{
  //     // React 18 Strict Mode runs useEffect twice, so count increments by 2 each second so
  //     // so we need cleanup function to clear the interval when component unmounts or before running the effect again
  //     const interval = setInterval(()=>{
  //         setCount((prev)=>prev+1)
  //     },1000)
  //     return () => clearInterval(interval);// this is cleanup function to clear the interval when component unmounts or before running the effect again
  // },[])

  // const [data, setData] = useState();
  // useEffect(()=>{
  //     fetch('https://jsonplaceholder.typicode.com/todos')
  //     .then((response)=>response.json())
  //     .then((json)=>setData(json))
  //     .catch((error)=>console.log(error))
  // },[]) // this is useEffect with empty dependency array, it will run only once when component mount first time

  const [searchTerm, setSearchTerm] = useState('');
  const [debounceTerm, setDebounceTerm] = useState('');
  useEffect(() => {
    const timeout = setTimeout(() => {setDebounceTerm(searchTerm)}, 5000); // delay of 500ms
    return () => clearTimeout(timeout); // cleanup function to clear the timeout if searchTerm changes before timeout completes
  }, [searchTerm]);

  return (
    <div>
      {/* <h1>count: {count}</h1>
            <h1>count: {number}</h1> */}
      {/* <button onClick={()=>setCount((prev)=>prev+1)}>add</button>
            <button onClick={()=>setNumber((prev)=>prev-1)}>sub</button> */}
      {/* <div>timer: {count}</div> */}

      {/* {data ? <div>title {data[0].title}</div> : <div>no data found</div>} */}

      <input type="text" 
      value={searchTerm} 
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="search" />

      <div>{debounceTerm}</div>
    </div>
  );
};
