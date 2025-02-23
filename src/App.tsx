import './App.css'
import MyMap from "./components/MyMap/MyMap.tsx";

function App() {
  return (
    <>
      <div className="w-[1000] h-[400]">
        <MyMap/>
      </div>
      <button className="rounded-xl bg-green-500 p-6 text-white"
      onClick={() => {console.log("test")}}>Test</button>
    </>
  )
}

export default App
