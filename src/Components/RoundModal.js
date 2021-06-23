import React, { useState,useEffect } from 'react';

import './playerModal.css'

import clubs from '../assets/img/clubs.png'
import spades from '../assets/img/spades.png'
import diamond from '../assets/img/diamond.png'
import heart from '../assets/img/heart.png'



import { Button,Row,Col, Modal, ModalHeader, ModalBody, ModalFooter ,Table} from 'reactstrap';




const createHand = (hand) =>{
  if(hand && hand.length>0){
    var number1 = hand[0]
    var number2 = hand[3]
    hand.split("")
    if (hand[0]=="T"){
      number1 = "10"
    }
    if (hand[3]=="T"){
      number2 = "10"
    }
    if (hand[1]=="s"){
      var icon1 = spades
    }
    if (hand[1]=="d"){
      var icon1 = diamond
    }
    if (hand[1]=="h"){
      var icon1 = heart
    }
    if (hand[1]=="c"){
      var icon1 = clubs
    }
    if (hand[4]=="s"){
      var icon2 = spades
    }
    if (hand[4]=="d"){
      var icon2 = diamond
    }
    if (hand[4]=="h"){
      var icon2 = heart
    }
    if (hand[4]=="c"){
      var icon2 = clubs
    }
    return [number1,icon1,number2,icon2]
  }
  else{
    return ["","","",""]
  }
}
const createSymbol = (symbol) =>{
  if (symbol == "s"){
    return spades
  }
  if (symbol == "c"){
    return clubs
  }
  if (symbol == "h"){
    return heart
  }
  if (symbol == "d"){
    return diamond
  }
}


const writeText = (text,start) =>{
  var textFinal = []
  for (var i=start;i<text.length;i++){
    textFinal.push(text[i])
  }
  return textFinal
}
const preflop = (text) => {
  
  
  if (text){
    var cards = text[1]?.split("[")[1].split("]")[0]
    var player = text[1]?.split(" ")[2]
    return (
      <div>
        <h3>{text[0]}</h3>
        {player} : <span style={{'fontSize':'30px'}}>{createHand(cards)[0]}</span><img height="30px" src={createHand(cards)[1]}></img><span style={{'fontSize':'30px'}}>{createHand(cards)[2]}</span><img height="30px" src={createHand(cards)[3]}></img>
        {writeText(text,2).map(line =>(
          <div>{line}</div>
        ))}
      </div>
    )
  }
  else{
    return ""
  }
  
}





const RoundModal = (props) => {
  //console.log(props)
  const {
    buttonLabel,
    className
  } = props;

  const toggle = () => setModal(!modal);
 


  const [modal, setModal] = useState(false);
  //console.log(props)

  return (
    <div>
      <button onClick={toggle}>Open</button>
      <Modal isOpen={modal} toggle={toggle} className={className} style={{backgroundColor:'rgb(40,40,40)'}}>
        <ModalHeader className="modalHeader"  style={{backgroundColor:'rgb(40,40,40)',color:'rgb(48, 189, 255)'}}></ModalHeader>
        <ModalBody style={{backgroundColor:'rgb(40,40,40)',color:'rgb(48, 189, 255)'}}>
            
        <div class="form-group">
        
        {preflop(props.historyRow?.preflop)}
        {props.historyRow.flop?.map((line) => (
            <p style={{'color':'rgb(255,255,255)'}}>{line}</p>
        ))} 
        {props.historyRow.turn?.map((line) => (
            <p style={{'color':'rgb(255,0,255)'}}>{line}</p>
        ))}    
        {props.historyRow.river?.map((line) => (
            <p style={{'color':'rgb(0,255,255)'}}>{line}</p>
        ))} 
        {props.historyRow.summaryRound?.map((line) => (
            <p style={{'color':'rgb(255,255,0)'}}>{line}</p>
        ))}      
        </div>

    
        </ModalBody>
        <ModalFooter className="footer" style={{backgroundColor:'rgb(40,40,40)',color:'rgb(48, 189, 255)'}}>
            
            <Button className="buttonCancel" onClick={toggle}>Cancel</Button>
             
          
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default RoundModal;


