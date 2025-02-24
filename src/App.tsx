import './App.css'
import MyMap from "./components/MyMap/MyMap.tsx";
import {useCoordinatesStore} from "./CoordinatesStore.tsx";

function App() {
  const {coordinates} = useCoordinatesStore();

  return (
    <>
      <div className="w-[1000] h-[400]">
        <MyMap/>
      </div>
      <button className="rounded-xl bg-green-500 p-6 text-white"
      onClick={() => {console.log("test")}}>Test</button>
      <div>
        coordinates from store: {coordinates[0]}, {coordinates[1]}
      </div>
    </>
  )
}

export default App
