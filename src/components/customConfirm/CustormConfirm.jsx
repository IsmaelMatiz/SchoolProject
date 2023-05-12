import React from "react";
import { useState } from "react";
import { ConfirmPopup } from "./ConfirmPopup";


function CustomConfirm() {
    const[showConfirmPopup, setShowConfirmPopup] = useState(false)
  return (
    <React.Fragment>
        <button
        onClick={()=>{
            setShowConfirmPopup(true)
        }}
        >checkpopup</button>
        <ConfirmPopup
            trigger={showConfirmPopup}
            setTrigger={setShowConfirmPopup}
            setAccept={()=>{console.log("jijija")}}
        >
          
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore eum libero vero veniam nobis natus exercitationem iusto itaque minus ipsum! Dolorum, vel dicta? Dolores eveniet, quam nihil esse qui ipsam.
          
        </ConfirmPopup>
    </React.Fragment>
  );
}

export default CustomConfirm;