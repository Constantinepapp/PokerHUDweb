import {React,useState} from 'react'
import './tile.css'


const Tile = (props) =>{
    
    const colorPicker = (status) =>{
      if(status){
        return "rgb(120,170,250)"
      }
      return "rgba(255,255,255,0.9)"
    }
    return(

          <div className="form-element">
            <input onClick={e => props.changeState(props.combo,props.status)} type="checkbox" name="platform" defaultValue="instagram" id={props.combo} />
            <label htmlFor={props.combo} style={{"backgroundColor":colorPicker(props.status)}}>
              <div className="icon">
                
              </div>
              <div className="title">
                {props.combo}
              </div>
            </label>
          </div>

    )
}
export default Tile;