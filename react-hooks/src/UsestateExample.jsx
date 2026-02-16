import { useState } from "react";
export const UseStateExample = () => {
  const [count, setCount] = useState(0);
  const [string, setString] = useState("xyxz");
  const [state, setState] = useState({ count: 0, click: 0 });
  const [items, setItems] = useState([]);



  const [allValues, setAllValues] = useState({firstname:'vikas', lastname:'vishwakarma'});
    // const handleClick = ()=>{
    //     // setAllValues({firsname:'ankit'})// this is not good way bcoz here last name get empty
    //     setAllValues({
    //         ...allValues, firstname:'pooja'
    //     })
    // }

        const [allTask, setAllTask] = useState(['learn project', 'build project'])
    const handleTask = ()=>{
        // setAllTask(
        //     ['deploye project']
        // )
        setAllTask([...allTask, 'deploye project'])
    }
  

  return (
    <div>
      {/* <h1>count = {count}</h1> */}
      {/* <button onClick={()=> {setCount(); setCount(count+1)}} >increement</button> */}{" "}
      {/* dusra wala setcount outdated version value lega*/}
      {/* <button onClick={()=> {setCount((prev)=>prev+1); setCount((prev)=>prev+1)}} >add</button> */}
      {/* <h2>count = {state.count}</h2>
            <h2>click = {state.click}</h2>
            <button onClick={()=> {setState({...state, count:state.count+1, click:state.click+2})}} >add</button> */}
      {/* <h2>items = {items}</h2>
      <button
        onClick={() => {
          setItems([...items, `${items.length + 1}`]);
        }}
      >
        add
      </button> */}

      {/* <h1>my firstname is {allValues.firstname} and last name {allValues.lastname}</h1>
      <button onClick={handleClick}>update</button> */}


      {allTask.map((val)=>{
          return (
            <li>{val}</li>
        )
    })}
    <button onClick={handleTask}>add task</button>
    </div>  
  );
};
