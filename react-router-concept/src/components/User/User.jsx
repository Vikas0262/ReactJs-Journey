import { useParams } from "react-router-dom"
const User = ()=>{
    // params is given to us by react router dom, it is an object which contains all the params in the url. we can destructure it to get the specific param we want.
    const {userid} = useParams();
    return (
        <div className="bg-gray-600 p-8 text-3xl text-white text-center">
            User: {userid}
        </div>
    )
}

export default User;