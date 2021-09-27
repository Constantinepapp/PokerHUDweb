import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import clubs from '../assets/img/clubs.png'
import spades from '../assets/img/spades.png'
import diamond from '../assets/img/diamond.png'
import heart from '../assets/img/heart.png'

const ChooseCardModal = (props) => {
  const {
    buttonLabel,
    className
  } = props;

  const [modal, setModal] = useState(false);
  const cards = ["A","K","Q","J","T","9","8","7","6","5","4","3","2"]
  const [c,setCard] = useState()
  const [s,setSymbol] = useState()
  const symbols = ["s","c","h","d"]
  const toggle = () => setModal(!modal);
  const colorPicker = (status) =>{
    if(status){
      return "rgb(120,170,250)"
    }
    return "rgb(30,30,30)"
  }

  const chooseIcon = (symbol) =>{
    if (symbol=="s"){
      var icon1 = spades
    }
    if (symbol=="d"){
      var icon1 = diamond
    }
    if (symbol=="h"){
      var icon1 = heart
    }
    if (symbol=="c"){
      var icon1 = clubs
    }
    return icon1
  }
  
  return (
    <div>
      
      <div onClick={toggle} className="card" style={{'display':'flex','justifyContent':'center','alignItems':'center','flexDirection':'row'}}>
        <span style={{'fontSize':'30px','fontWeight':'500'}}>{props.card[0] == 'T'?10:props.card[0]}</span><img  height="30px" src={chooseIcon(props.card[1])}/>              
      </div>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>
        <div style={{'display':'flex','flexDirection':'row'}}>
            {cards.map(card =>(
                <div className="radio-container">
                <div className="form-element">
                    <input onClick={e=>setCard(card)} type="radio" name="cd" defaultValue="cards" id={card} />
                    <label htmlFor={card} style={{'height':'50px','width':'30px','borderRadius':'5px','marginLeft':'5px'}} >
                    <div className="icon">
                        
                    </div>
                    <div className="title" style={{'color':'rgb(40,40,40)'}}>
                        {card}
                    </div>
                    </label>
                </div>
                </div>
            
            ))}
        </div>
        <div style={{'display':'flex','flexDirection':'row','marginTop':'30px'}}>
            {symbols.map(symbol =>(
                <div className="radio-container">
                <div className="form-element">
                    <input onClick={e=>setSymbol(symbol)} type="radio" name="sb" defaultValue="symbols" id={symbol} />
                    <label htmlFor={symbol} style={{'height':'50px','width':'30px','borderRadius':'5px','marginLeft':'5px'}} >
                    <div className="icon">
                        
                    </div>
                    <div className="title" style={{'color':'rgb(40,40,40)'}}>
                      <img  height="15px" src={chooseIcon(symbol)}/>
                    </div>
                    </label>
                </div>
                </div>
            
            ))}
        </div>
        
          
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={e =>props.setCard(c+s)} >submit</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ChooseCardModal;