import React, { useState,useEffect } from 'react';

import './playerModal.css'





import { Button,Row,Col, Modal, ModalHeader, ModalBody, ModalFooter ,Table} from 'reactstrap';





const PlayerModal = (props) => {
  //console.log(props)
  const {
    buttonLabel,
    className
  } = props;

  const toggle = () => setModal(!modal);
 


  const [modal, setModal] = useState(false);
  //console.log(props.activity)

  return (
    <div>
      <p onClick={toggle} style={{cursor:'pointer'}} src='{}'>{props.row.name}</p>
      <Modal isOpen={modal} toggle={toggle} className={className} style={{backgroundColor:'rgb(40,40,40)'}}>
        <ModalHeader className="modalHeader"  style={{backgroundColor:'rgb(40,40,40)',color:'rgb(48, 189, 255)'}}>{props.row.name}</ModalHeader>
        <ModalBody style={{backgroundColor:'rgb(40,40,40)',color:'rgb(48, 189, 255)'}}>
            
        <div class="form-group">
            <div className="cardDisplay">
                <div className="actions">
                    <div className="follow-info">
                        <h2><a href="#">
                            <span className="text-white" style={{fontSize:'20px'}}>{props.row.carbs}%</span>
                            <small>Sees Flop</small>
                            <small style={{color:'rgb(200,180,100)'}}>{props.row.carbs>20?"Loose":"Tight"}</small>
                            </a>
                        </h2>
                        <h2><a href="#">
                            <span className="text-white" style={{fontSize:'20px'}}>{props.row.protein}%</span>
                            <small>Raises Flop</small>
                            <small style={{color:'rgb(200,180,100)'}}>{props.row.protein>13?"Aggressive":"Defensive"}</small>
                            </a>
                        </h2>
                    </div>
                </div>
            </div>
        </div>
    
        </ModalBody>
        <ModalFooter className="footer" style={{backgroundColor:'rgb(40,40,40)',color:'rgb(48, 189, 255)'}}>
            
            <Button className="buttonCancel" onClick={toggle}>Cancel</Button>
             
          
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default PlayerModal;


