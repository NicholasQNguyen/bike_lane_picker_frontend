import {Link} from "react-router-dom";
import GreenPillButton from "../GreenPillButton/GreenPillButton.tsx";

function Footer() {
  return (
    <div className="flex justify-center">
      <Link to={'/'} className="flex justify-center" >
        <GreenPillButton text={"Select a Point"} onClick={() => {}}/>
      </Link>

      <Link to={'/view-points'} className="flex justify-center" >
        <GreenPillButton text={"View Points"} onClick={() => {}}/>
      </Link>
    </div>
  )
}

export default Footer;