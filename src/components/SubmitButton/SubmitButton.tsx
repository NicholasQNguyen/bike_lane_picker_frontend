interface PillButtonProps {
  onClick: () => void
}

function SubmitButton({onClick}: PillButtonProps) {
  return (
    <>
      <button className="shadow-md no-underline rounded-full bg-green-500 text-white dont-sans font-semibold text-3xl border-blue btn-primary hover:text-white hover:bg-blue-light focus:outline-none active:shadow-none mr-2"
            onClick={onClick}>
        Submit Coordinates
      </button>
    </>
  )
}

export default SubmitButton;