interface BluePillButtonProps {
  text: string;
  onClick: () => void;
}

function GreenPillButton({text, onClick}: BluePillButtonProps) {
  return (
    <button onClick={onClick} type="button" className="text-white bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-xl px-5 py-2.5 text-center me-2 mb-2">
      {text}
    </button>
  )
}

export default GreenPillButton;