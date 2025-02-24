import './App.css'
import MyMap from "./components/MyMap/MyMap.tsx";
import {useCoordinatesStore} from "./CoordinatesStore.tsx";
import BluePillButton from "./components/BluePillButton/BluePillButton.tsx";
import {useState} from "react";
import {Description, Dialog, DialogPanel, DialogTitle} from "@headlessui/react";

function App() {
  const [isOpen, setIsOpen] = useState(false)
  const {coordinates} = useCoordinatesStore();

  return (
    <>
      <div className="w-[1000] h-[400]">
        <MyMap/>
      </div>
      <div className="flex justify-center">
        <BluePillButton text={"Test"} onClick={() => setIsOpen(true)}/>
      </div>
      <div className="flex justify-center">
        coordinates from store: {coordinates[0]}, {coordinates[1]}
      </div>

      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-lg space-y-4 border bg-white p-12">
            <DialogTitle className="font-bold">Confirmation</DialogTitle>
            <Description>This will submit your entry</Description>
            <p>Are you sure you'd like to submit this?</p>
            <div className="flex gap-4">
              <BluePillButton text={"Cancel"} onClick={() => setIsOpen(false)}/>
              <BluePillButton text={"Confirm"} onClick={() => setIsOpen(false)}/>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  )
}

export default App
