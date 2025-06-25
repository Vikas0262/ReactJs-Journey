import { useDispatch, useSelector } from "react-redux";
import { setUser, clearUser } from "./features/userSlice";

function App() {
  const user = useSelector((state) => state.user);
  console.log(user);
  
  const dispatch = useDispatch();
  // console.log(dispatch);

  return (
    <div>
      <h1>Redux Toolkit - User Info Example</h1>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>

      <button
        onClick={() =>
          dispatch(setUser({ name: "Vikas", email: "vikas@mail.com" }))
        }
      >
        Login
      </button>

      <button onClick={() => dispatch(clearUser())}>Logout</button>
    </div>
  );
}

export default App;
