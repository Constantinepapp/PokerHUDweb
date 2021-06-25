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
    
    if (text[i].includes("fold")||text[i].includes("folds")){
      var splited = text[i].split(":")
      var output = <><span style={{'color':'rgb(240,240,240)'}}>{splited[0]}</span> -> <span style={{'color':'rgb(240,80,80)'}}>{splited[1]}</span></>
      textFinal.push(output)
    }
    else if (text[i].includes("check")||text[i].includes("checks")){
      var splited = text[i].split(":")
      var output = <><span style={{'color':'rgb(240,240,240)'}}>{splited[0]}</span> -> <span style={{'color':'rgb(80,80,240)'}}>{splited[1]}</span></>
      textFinal.push(output)
    }
    else if (text[i].includes("raise")||text[i].includes("raises")){
      var splited = text[i].split(":")
      var output = <><span style={{'color':'rgb(240,240,240)'}}>{splited[0]}</span> -> <span style={{'color':'rgb(80,240,80)'}}>{splited[1]}</span></>
      textFinal.push(output)
    }
    else if (text[i].includes("call")||text[i].includes("calls")){
      var splited = text[i].split(":")
      var output = <><span style={{'color':'rgb(240,240,240)'}}>{splited[0]}</span> -> <span style={{'color':'rgb(80,80,240)'}}>{splited[1]}</span></>
      textFinal.push(output)
    }
    
    else{
      textFinal.push(text[i])
    }
    
  }
  
  return textFinal
}
const preflop = (text) => {
  
  
  if (text){
    var cards = text[1]?.split("[")[1].split("]")[0]
    var player = text[1]?.split(" ")[2]
    return (
      <div>
        <h3>Preflop</h3>
        
        
        <div style={{'display':'flex','justifyContent':'center'}}>
        <span style={{'fontSize':'30px','color':'rgb(240,240,240)'}}>{createHand(cards)[0]}</span><img height="30px" src={createHand(cards)[1]}></img><span style={{'fontSize':'30px','color':'rgb(240,240,240)'}}>{createHand(cards)[2]}</span><img height="30px" src={createHand(cards)[3]}></img>
        
        </div>
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
const summary = (text) => {
  
  
  if (text){
    
      var pot = text[1]?.split("pot")[1]?.split(" ")[1]
      var rake = text[1].split("Rake")[1]
      var cards = text[2]?.split("[")[1]?.split("]")[0].split(" ")
    
    
    return (
      <div>
        
        <h3>Summary</h3>
        <div class="form-group">
            <div className="cardDisplay">
                <div className="actions">
                    <div className="follow-info">
                        <h2><a href="#">
                            <span className="text-white" style={{fontSize:'20px'}}>{pot}</span>
                            <small>Total Pot</small>
                            
                            </a>
                        </h2>
                        <h2><a href="#">
                            <span className="text-white" style={{fontSize:'20px'}}>{rake}</span>
                            <small>Rake</small>
                            
                            </a>
                        </h2>
                    </div>
                </div>
            </div>
        </div>
        <div style={{'display':'flex','justifyContent':'center'}}>
        {cards ? cards.map((element)=>(
                          <>
                            <span style={{'fontSize':'20px','color':'rgb(240,240,240)'}}>{element[0] =="T"?"10":element[0]}</span><img height="20px"src={createSymbol(element[1])}></img>
                          </>
                          
                        )):""}
        </div>
        {writeText(text,3).map(line =>(
          <div style={{'color':'rgb(60,250,255)','fontWeight':'700'}}>{line}</div>
        ))}
      </div>
    )
  }
  else{
    return ""
  }
  
}
const ftr = (text,stage) =>{
  if (text){
    var cards = text[0].split("***")[2].split("[")[1].split("]")[0].split(" ")
    
    
    return (
      <div>
        <h3>{stage}</h3>
        <div style={{'display':'flex','justifyContent':'center'}}>
          {cards ? cards.map((element)=>(
                            <>
                              <span style={{'fontSize':'20px','color':'rgb(240,240,240)'}}>{element[0] =="T"?"10":element[0]}</span><img height="20px"src={createSymbol(element[1])}></img>
                            </>
                            
                          )):""}
          </div>
          {writeText(text,1).map(line =>(
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
        <br/>
        {ftr(props.historyRow?.flop,"Flop")}
        <br/>
        {ftr(props.historyRow?.turn,"Turn")}
        <br/>
        {ftr(props.historyRow?.river,"River")}
        <br/>
        {summary(props.historyRow?.summaryRound)}
            
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


