import React from "react";
import "../../styles/Popup/Popup.css"

export function ConfirmPopup(props) {
    return (props.trigger) ? (
      <React.Fragment>
        <div className="popup">
            <div className="popup-inner">
                <div className="popup-text">
                  <p>{props.children}</p>
                </div>
                <div className="row">
                  <div className="col">
                    
                    <button className="btn btn-primary"
                    onClick={props.setAccept}
                    >Aceptar</button>
                  </div>
                
                <div className="col">
                  <button className="btn btn-danger"
                    onClick={()=>{
                      props.setTrigger(false)
                    }}
                    >Cancelar</button>
                  </div>
                </div>
            </div>
        </div>
      </React.Fragment>
    ): ""
  }
  