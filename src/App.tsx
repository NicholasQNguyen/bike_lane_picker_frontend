import './App.css'
import MyMap from "./components/MyMap/MyMap.tsx";
import {useCoordinateState} from "./CoordinateState.tsx";
import SubmitButton from "./components/SubmitButton/SubmitButton.tsx";

function App() {
  const {currentCoordinates} = useCoordinateState()
  return (
    <>
      <div>
        <MyMap/>
      </div>
      <div>
        {currentCoordinates[0]}, {currentCoordinates[1]}
      </div>
      <SubmitButton onClick={() => {console.log("Hello")}}/>

    </>
  )
}

export default App
