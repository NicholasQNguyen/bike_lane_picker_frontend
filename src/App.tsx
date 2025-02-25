import './App.css'
import SelectionMap from "./components/SelectionMap/SelectionMap.tsx";
import {useCoordinatesStore} from "./CoordinatesStore.tsx";
import BluePillButton from "./components/BluePillButton/BluePillButton.tsx";
import {useEffect, useState} from "react";
import {Description, Dialog, DialogPanel, DialogTitle} from "@headlessui/react";
import supabase from "./supabase.ts";
import Footer from "./components/Footer/Footer.tsx";

function App() {
  const FIVE_SECONDS = 5000;

  const [isOpen, setIsOpen] = useState(false)
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false)
  const {coordinates} = useCoordinatesStore();
  const [popupMessage, setPopupMessage] = useState("")

  // Function used to upload data to supabase db
  async function submitData() {
    let confirmationMessage: string;
    if (supabase === undefined) {
      console.log("supabase connection not made! Did you set up your environment variables?");
      confirmationMessage = "Error with database connection"
      showConfirmationPopup(confirmationMessage);
      return;
    }

    // Check for default submissions
    if (coordinates[0] === 0 && coordinates[1] === 0) {
      console.log("coordinates missing")
      confirmationMessage = "Please enter a valid coordinate"
      showConfirmationPopup(confirmationMessage);
      return;
    }

    try {
      await supabase
        .from("longitude_and_latitude")
        .insert({
          longitude: coordinates[0],
          latitude: coordinates[1]
        })
      confirmationMessage = "Successfully sent data!";
    } catch (error) {
      confirmationMessage = `Error: ${(error as Error).message}`;
    }
    // Close the popup
    setIsOpen(false);
    // Show the success message
    showConfirmationPopup(confirmationMessage);
  }

  // Function to show the message after the user hits submit
  function showConfirmationPopup(confirmationMessage: string) {
    setIsConfirmationOpen(true)
    setPopupMessage(confirmationMessage);
  }

  // useEffect hook to close the success message popup
  useEffect(() => {
    setTimeout(() => {
      setIsConfirmationOpen(false)
    }, FIVE_SECONDS)
  }, [isConfirmationOpen]);

  return (
    <>
      <h1 className="flex justify-center text-5xl">
        Bike Lane Picker
      </h1>
      <div>
        <SelectionMap/>
      </div>
      <div className="flex justify-center">
        <BluePillButton text={"Submit"} onClick={() => setIsOpen(true)}/>
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
              <BluePillButton text={"Confirm"} onClick={submitData}/>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      <Dialog open={isConfirmationOpen} onClose={() => setIsConfirmationOpen(false)} className="relative z-50">
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-lg space-y-4 border bg-white p-12">
            <DialogTitle className="font-bold">Confirmation</DialogTitle>
            <p>{popupMessage}</p>
          </DialogPanel>
        </div>
      </Dialog>
      <Footer/>
    </>
  )
}

export default App
