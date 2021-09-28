import {React,useState,useEffect} from 'react'
import Tile from '../Components/Tile'
import ChooseCardModal from '../Components/ChooseCardModal';
import {cardCombos, rangeBuilder} from '../helperFunctions/cardCombos'
import {TexasHoldem, SixPlusHoldem, Omaha} from '../../node_modules/poker-odds-calc';
import './equity.css'
import  Slider  from 'rc-slider';
import 'rc-slider/assets/index.css';

const { raceRange, rates } = require('pec')




const Equity = () =>{
    const [combosState,setCombosState] = useState([{'combo': 'AA', 'status': false}, {'combo': 'AKs', 'status': false}, {'combo': 'AQs', 'status': false}, {'combo': 'AJs', 'status': false}, {'combo': 'ATs', 'status': false}, {'combo': 'A9s', 'status': false}, {'combo': 'A8s', 'status': false}, {'combo': 'A7s', 'status': false}, {'combo': 'A6s', 'status': false}, {'combo': 'A5s', 'status': false}, {'combo': 'A4s', 'status': false}, {'combo': 'A3s', 'status': false}, {'combo': 'A2s', 'status': false}, {'combo': 'AKo', 'status': false}, {'combo': 'KK', 'status': false}, {'combo': 'KQs', 'status': false}, {'combo': 'KJs', 'status': false}, {'combo': 'KTs', 'status': false}, {'combo': 'K9s', 'status': false}, {'combo': 'K8s', 'status': false}, {'combo': 'K7s', 'status': false}, {'combo': 'K6s', 'status': false}, {'combo': 'K5s', 'status': false}, {'combo': 'K4s', 'status': false}, {'combo': 'K3s', 'status': false}, {'combo': 'K2s', 'status': false}, {'combo': 'AQo', 'status': false}, {'combo': 'KQo', 'status': false}, {'combo': 'QQ', 'status': false}, {'combo': 'QJs', 'status': false}, {'combo': 'QTs', 'status': false}, {'combo': 'Q9s', 'status': false}, {'combo': 'Q8s', 'status': false}, {'combo': 'Q7s', 'status': false}, {'combo': 'Q6s', 'status': false}, {'combo': 'Q5s', 'status': false}, {'combo': 'Q4s', 'status': false}, {'combo': 'Q3s', 'status': false}, {'combo': 'Q2s', 'status': false}, {'combo': 'AJo', 'status': false}, {'combo': 'KJo', 'status': false}, {'combo': 'QJo', 'status': false}, {'combo': 'JJ', 'status': false}, {'combo': 'JTs', 'status': false}, {'combo': 'J9s', 'status': false}, {'combo': 'J8s', 'status': false}, {'combo': 'J7s', 'status': false}, {'combo': 'J6s', 'status': false}, {'combo': 'J5s', 'status': false}, {'combo': 'J4s', 'status': false}, {'combo': 'J3s', 'status': false}, {'combo': 'J2s', 'status': false}, {'combo': 'ATo', 'status': false}, {'combo': 'KTo', 'status': false}, {'combo': 'QTo', 'status': false}, {'combo': 'JTo', 'status': false}, {'combo': 'TT', 'status': false}, {'combo': 'T9s', 'status': false}, {'combo': 'T8s', 'status': false}, {'combo': 'T7s', 'status': false}, {'combo': 'T6s', 'status': false}, {'combo': 'T5s', 'status': false}, {'combo': 'T4s', 'status': false}, {'combo': 'T3s', 'status': false}, {'combo': 'T2s', 'status': false}, {'combo': 'A9o', 'status': false}, {'combo': 'K9o', 'status': false}, {'combo': 'Q9o', 'status': false}, {'combo': 'J9o', 'status': false}, {'combo': 'T9o', 'status': false}, {'combo': '99', 'status': false}, {'combo': '98s', 'status': false}, {'combo': '97s', 'status': false}, {'combo': '96s', 'status': false}, {'combo': '95s', 'status': false}, {'combo': '94s', 'status': false}, {'combo': '93s', 'status': false}, {'combo': '92s', 'status': false}, {'combo': 'A8o', 'status': false}, {'combo': 'K8o', 'status': false}, {'combo': 'Q8o', 'status': false}, {'combo': 'J8o', 'status': false}, {'combo': 'T8o', 'status': false}, {'combo': '98o', 'status': false}, {'combo': '88', 'status': false}, {'combo': '87s', 'status': false}, {'combo': '86s', 'status': false}, {'combo': '85s', 'status': false}, {'combo': '84s', 'status': false}, {'combo': '83s', 'status': false}, {'combo': '82s', 'status': false}, {'combo': 'A7o', 'status': false}, {'combo': 'K7o', 'status': false}, {'combo': 'Q7o', 'status': false}, {'combo': 'J7o', 'status': false}, {'combo': 'T7o', 'status': false}, {'combo': '97o', 'status': false}, {'combo': '87o', 'status': false}, {'combo': '77', 'status': false}, {'combo': '76s', 'status': false}, {'combo': '75s', 'status': false}, {'combo': '74s', 'status': false}, {'combo': '73s', 'status': false}, {'combo': '72s', 'status': false}, {'combo': 'A6o', 'status': false}, {'combo': 'K6o', 'status': false}, {'combo': 'Q6o', 'status': false}, {'combo': 'J6o', 'status': false}, {'combo': 'T6o', 'status':false}, {'combo': '96o', 'status': false}, {'combo': '86o', 'status': false}, {'combo': '76o', 'status': false}, {'combo': '66', 'status': false}, {'combo': '65s', 'status': false}, {'combo': '64s', 'status': false}, {'combo': '63s', 'status': false}, {'combo': '62s', 'status': false}, {'combo': 'A5o','status': false}, {'combo': 'K5o', 'status': false}, {'combo': 'Q5o', 'status': false}, {'combo': 'J5o', 'status': false}, {'combo': 'T5o', 'status': false}, {'combo': '95o', 'status': false}, {'combo': '85o', 'status': false}, {'combo': '75o', 'status': false}, {'combo': '65o', 'status': false}, {'combo': '55', 'status': false}, {'combo': '54s', 'status': false}, {'combo': '53s', 'status': false}, {'combo': '52s', 'status': false}, {'combo': 'A4o', 'status': false}, {'combo': 'K4o', 'status': false}, {'combo': 'Q4o', 'status': false}, {'combo': 'J4o', 'status': false}, {'combo': 'T4o', 'status': false}, {'combo': '94o', 'status': false}, {'combo': '84o', 'status': false}, {'combo': '74o', 'status': false}, {'combo': '64o', 'status': false}, {'combo': '54o', 'status': false}, {'combo': '44', 'status': false}, {'combo': '43s', 'status': false}, {'combo': '42s', 'status': false}, {'combo': 'A3o', 'status': false}, {'combo': 'K3o', 'status': false}, {'combo': 'Q3o', 'status': false}, {'combo': 'J3o', 'status': false}, {'combo': 'T3o', 'status': false}, {'combo': '93o', 'status': false}, {'combo': '83o', 'status': false}, {'combo': '73o', 'status': false}, {'combo': '63o', 'status': false}, {'combo':'53o', 'status': false}, {'combo': '43o', 'status': false}, {'combo': '33', 'status': false}, {'combo': '32s', 'status': false}, {'combo': 'A2o', 'status': false}, {'combo': 'K2o', 'status': false}, {'combo': 'Q2o', 'status': false}, {'combo': 'J2o', 'status': false}, {'combo': 'T2o', 'status': false},{'combo': '92o', 'status': false}, {'combo': '82o', 'status': false}, {'combo': '72o', 'status': false}, {'combo': '62o', 'status': false}, {'combo': '52o', 'status': false}, {'combo': '42o', 'status': false}, {'combo': '32o', 'status': false}, {'combo': '22', 'status': false}]) 
    const [slider,setSlider] = useState(0)
    const [card1,setCard1] = useState('Ah')
    const [card2,setCard2] = useState('Ac')
    const cardComb = cardCombos()
    const ranges = rangeBuilder(combosState,cardComb);
    const bestCombo = ['AA', 'KK', 'QQ', 'JJ', 'TT', '99', '88', 'AKs', '77', 'AQs', 'AJs', 'AKo', 'ATs', 'AQo', 'AJo', 'KQs', '66', 'A9s', 'ATo', 'KJs', 'A8s', 'KTs', 'KQo', 'A7s', 'A9o', 'KJo', '55', 'QJs', 'K9s', 'A5s', 'A6s', 'A8o', 'KTo', 'QTs', 'A4s', 'A7o', 'K8s', 'A3s', 'QJo', 'K9o', 'A5o', 'A6o', 'Q9s', 'K7s', 'JTs', 'A2s', 'QTo', '44', 'A4o', 'K6s', 'K8o', 'Q8s', 'A3o', 'K5s', 'J9s', 'Q9o', 'JTo', 'K7o', 'A2o', 'K4s', 'Q7s', 'K6o', 'K3s', 'T9s', 'J8s', '33', 'Q6s', 'Q8o', 'K5o', 'J9o', 'K2s', 'Q5s', 'T8s', 'K4o', 'J7s', 'Q4s', 'Q7o', 'T9o', 'J8o', 'K3o', 'Q6o', 'Q3s', '98s', 'T7s', 'J6s', 'K2o', '22', 'Q2s', 'Q5o', 'J5s', 'T8o', 'J7o', 'Q4o', '97s', 'J4s', 'T6s', 'J3s', 'Q3o', '98o', '87s', 'T7o', 'J6o', '96s', 'J2s', 'Q2o', 'T5s', 'J5o', 'T4s', '97o', '86s', 'J4o', 'T6o', '95s', 'T3s', '76s', 'J3o', '87o', 'T2s', '85s', '96o', 'J2o', 'T5o', '94s', '75s', 'T4o', '93s', '86o', '65s', '84s', '95o', 'T3o', '92s', '76o', '74s', 'T2o', '54s', '85o', '64s', '83s', '94o', '75o', '82s', '73s', '93o', '65o', '53s', '63s', '84o', '92o', '43s', '74o', '72s', '54o', '64o', '52s', '62s', '83o', '42s', '82o', '73o', '53o', '63o', '32s', '43o', '72o', '52o', '62o', '42o', '32o']
    const combo = [ card1, card2 ]
    const { win, loose, tie } = raceRange(combo, ranges, 1E2)
    const { winRate, looseRate, tieRate } = rates({ win, loose, tie })
    
    
    useEffect(() => {
        const delayState = setTimeout(() => {
          setComboChanger()
        }, 0)
        return () => clearTimeout(delayState)
    }, [slider])
    const setComboChanger = () =>{
        
        const selection = bestCombo.slice(0,slider+1)
        var newState = []
        
        combosState.map(combo =>{
            if ( selection.includes(combo.combo)){
                newState.push({'combo':combo.combo,'status':true})
            }
            else{
                newState.push({'combo':combo.combo,'status':false})
            }
        })
        // for (var j=0;j<combosState.length;j++){
        //     if ( selection.includes(combosState[j].combo)){
        //         newState.push({'combo':combosState[j].combo,'status':true})
        //     }
        //     else{
        //         newState.push({'combo':combosState[j].combo,'status':false})
        //     }
        // }
        
        setCombosState(newState)
        //console.log(combosState)
    }
    //console.log(ranges)
    
    const changeState = (combo,status) =>{
        let newArr = combosState.map(item =>{
            if(item.combo == combo){
                return {...item,status:!item.status}
            }
            return item;
        })
        setCombosState(newArr)
    }
    
    //console.log(combosState)
    return(
        <div className="page-container">
        <div className="propability">
            <div className="propability-item">
                <label>Win</label>
                <h3 style={{'color':'rgb(100,200,100)'}}>{winRate} %</h3>
            </div>
            <div className="propability-item">
                <label>Loss</label>
                <h3 style={{'color':'rgb(200,100,100)'}}>{looseRate} %</h3>
            </div>
            <div className="propability-item">
                <label>Loss</label>
                <h3 style={{'color':'rgb(100,100,200)'}}>{tieRate} %</h3>
            </div>
            
            
        </div>
        
        
        <div className="equity-container">
            
            <div className="cards">
                    
                    <ChooseCardModal card={card1} setCard={setCard1} buttonLabel="Choose Card"/>
                    
                    
                    <ChooseCardModal card={card2} setCard={setCard2} buttonLabel="Choose Card"/>
                    
            </div>
            <div className="right-container">
                <div  className="slider">
                    <label style={{'fontSize':'20px','color':'rgb(200,200,200)'}}>{slider == bestCombo.length-1 ? 100 : (slider*100/combosState.length).toFixed(2)}% Best Hands</label>
                    <Slider style={{"marginTop":'0px',"marginBottom":'10px','width':'450px'}} min={0} max={bestCombo.length-1} value={slider}  step={1} onChange={setSlider}/>
                </div>
                <div className="container-tiles">
            
                    {combosState.map((combo) => (
                        <Tile combo = {combo.combo} status = {combo.status} changeState={changeState}/>
                    ))}
                </div>
            </div>
            <div className="position-container">
                <button onClick={e=>setSlider(combosState.length *10/100)} className='button-position' style={{'backgroundColor':'rgb(100,180,210)'}}>UTG+1</button>
                <button onClick={e=>setSlider(combosState.length *15/100)} className='button-position' style={{'backgroundColor':'rgb(150,200,190)'}}>UTG+2</button>
                <button onClick={e=>setSlider(combosState.length *19/100)} className='button-position' style={{'backgroundColor':'rgb(100,220,150)'}}>LJ</button>
                <button onClick={e=>setSlider(combosState.length *23/100)} className='button-position' style={{'backgroundColor':'rgb(100,250,100)'}}>HJ</button>
                <button onClick={e=>setSlider(combosState.length *27/100)} className='button-position' style={{'backgroundColor':'rgb(250,250,100)'}}>CO</button>
                <button onClick={e=>setSlider(combosState.length *43/100)} className='button-position' style={{'backgroundColor':'rgb(250,160,100)'}}>BTN</button>
                <button onClick={e=>setSlider(combosState.length *52/100)} className='button-position' style={{'backgroundColor':'rgb(250,100,100)'}}>SB</button>
                <button onClick={e=>setSlider(combosState.length *60/100)} className='button-position' style={{'backgroundColor':'rgb(250,50,50)'}}>BB</button>
            </div>
            
            
            
        </div>
        </div>
    )
}
export default Equity;