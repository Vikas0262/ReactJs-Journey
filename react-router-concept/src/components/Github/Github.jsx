import { useEffect, useState } from "react"
import { useLoaderData } from "react-router-dom"

const Github = ()=>{
    const data = useLoaderData();

    // ye bhi tarika sahi hai par loader isse better hai kyuki loader se data pehle hi load ho jata hai jab user click karta hai tabhi data load hota hai, useEffect me component render hone ke baad hi data load hota hai.
    // const [data, setData] = useState([]);
    // useEffect(()=>{
    //     fetch('https://api.github.com/users/vikas0262')
    //     .then(response => response.json())
    //     .then(data =>{console.log('github data ', data); setData(data)})
    // },[])
    return (
        <div className="bg-blue-600 p-8 text-3xl text-white text-center">
            <div ><img src={data.avatar_url} alt="Github Profile" /></div>
           <div> Github User Name : {data.name}</div>
            <div>Github Followers : {data.followers}</div>
        </div>
    )
}

export default Github

export const githubInfoLoader = async ()=>{
    const response = await fetch('https://api.github.com/users/vikas0262');
    return response.json();
}