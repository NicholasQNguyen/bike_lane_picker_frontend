import './App.css'
import MyMap from "./components/MyMap/MyMap.tsx";
import {useCoordinatesStore} from "./CoordinatesStore.tsx";
import BluePillButton from "./components/BluePillButton/BluePillButton.tsx";
import {useEffect, useState} from "react";
import {Description, Dialog, DialogPanel, DialogTitle} from "@headlessui/react";
import {createClient, SupabaseClient} from "@supabase/supabase-js";

function App() {
  const FIVE_SECONDS = 5000;

  let supabase: SupabaseClient<any, 'public', any> | null = null;

  const [isOpen, setIsOpen] = useState(false)
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false)
  const {coordinates} = useCoordinatesStore();
  const [popupMessage, setPopupMessage] = useState("")

  // Set up supabase credentials
  useEffect(() => {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseAnonKey = process.env.SUPABASE_KEY;
    if (supabaseUrl === undefined) {
      console.log("supabase url missing");
      return;
    }
    if (supabaseAnonKey === undefined) {
      console.log("supabase anon key missing");
      return;
    }
    supabase = createClient(supabaseUrl, supabaseAnonKey);
  }, []);

  // Function used to upload data to supabase db
  async function submitData() {
    let confirmationMessage: string;
    if (supabase === null) {
      console.log("supabase connection not made! Did you set up your environment variables?");
      confirmationMessage = "Error with database connection"
      setIsConfirmationOpen(true)
      setPopupMessage(confirmationMessage);
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
    </>
  )
}

export default App
