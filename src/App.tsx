import './App.css'
import MyMap from "./components/MyMap/MyMap.tsx";

function App() {
  return (
    <>
      <div className={"w-[1000] h-[400]"}>
        <MyMap/>
      </div>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              onClick={() => console.log("Hello")}>
        Test
      </button>
    </>
  )
}

export default App;
