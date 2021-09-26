import {TexasHoldem, SixPlusHoldem, Omaha} from '../../node_modules/poker-odds-calc';


export function cardCombos(dates,tss){
    if(!cardCombos.cache){
        cardCombos.cache = {}
    }
    if(cardCombos.cache.arrComplete != undefined && cardCombos.cache.arrComplete != null){
        
        //console.log("cached")
        return cardCombos.cache.arrComplete
    
    }
    
    //console.log("original")
    const arrComplete = cardCombosMemo()
    cardCombos.cache.arrComplete = arrComplete
    return arrComplete
    
    
}
export const cardCombosMemo = () =>{
    var arr = ["AA", "KK", "QQ", "JJ", "TT", "99", "88", "(AK)", "77", "(AQ)", "(AJ)", "AK", "(AT)", "AQ", "AJ", "(KQ)", "66", "(A9)", "AT", "(KJ)", "(A8)", "(KT)", "KQ", "(A7)", "A9", "KJ", "55", "(QJ)", "(K9)", "(A5)", "(A6)", "A8", "KT", "(QT)", "(A4)", "A7", "(K8)", "(A3)", "QJ", "K9", "A5", "A6", "(Q9)", "(K7)", "(JT)", "(A2)", "QT", "44", "A4", "(K6)", "K8", "(Q8)", "A3", "(K5)", "(J9)", "Q9", "JT", "K7", "A2", "(K4)", "(Q7)", "K6", "(K3)", "(T9)", "(J8)", "33", "(Q6)", "Q8", "K5", "J9", "(K2)", "(Q5)", "(T8)", "K4", "(J7)", "(Q4)", "Q7", "T9", "J8", "K3", "Q6", "(Q3)", "(98)", "(T7)", "(J6)", "K2", "22", "(Q2)", "Q5", "(J5)", "T8", "J7", "Q4", "(97)", "(J4)", "(T6)", "(J3)", "Q3", "98", "(87)", "T7", "J6", "(96)", "(J2)", "Q2", "(T5)", "J5", "(T4)", "97", "(86)", "J4", "T6", "(95)", "(T3)", "(76)", "J3", "87", "(T2)", "(85)", "96", "J2", "T5", "(94)", "(75)", "T4", "(93)", "86", "(65)", "(84)", "95", "T3", "(92)", "76", "(74)", "T2", "(54)", "85", "(64)", "(83)", "94", "75", "(82)", "(73)", "93", "65", "(53)", "(63)", "84", "92", "(43)", "74", "(72)", "54", "64", "(52)", "(62)", "83", "(42)", "82", "73", "53", "63", "(32)", "43", "72", "52", "62", "42", "32"]
    var arrUnordered = ["AA", "AKs", "AQs", "AJs", "ATs", "A9s", "A8s", "A7s", "A6s", "A5s", "A4s", "A3s", "A2s", "AKo", "KK", "KQs", "KJs", "KTs", "K9s", "K8s", "K7s", "K6s", "K5s", "K4s", "K3s", "K2s", "AQo", "KQo", "QQ", "QJs", "QTs", "Q9s", "Q8s", "Q7s", "Q6s", "Q5s", "Q4s", "Q3s", "Q2s", "AJo", "KJo", "Qjo", "JJ", "JTs", "J9s", "J8s", "J7s", "J6s", "J5s", "J4s", "J3s", "J2s", "ATo", "Kto", "QTo", "JTo", "TT", "T9s", "T8s", "T7s", "T6s", "T5s", "T4s", "T3s", "T2s", "A9o", "K9o", "Q9o", "J9o", "T9o", "99", "98s", "97s", "96s", "95s", "94s", "93s", "92s", "A8o", "K8o", "Q8o", "J8o", "T8o", "98o", "88", "87s", "86s", "85s", "84s", "83s", "82s", "A7o", "K7o", "Q7o", "J7o", "T7o", "97o", "87o", "77", "76s", "75s", "74s", "73s", "72s", "A6o", "K6o", "Q6o", "J6o", "T6o", "96o", "86o", "76o", "66", "65s", "64s", "63s", "62s", "A5o", "K5o", "Q5o", "J5o", "T5o", "95o", "85o", "75o", "65o", "55", "54s", "53s", "52s", "A4o", "K4o", "Q4o", "J4o", "T4o", "94o", "84o", "74o", "64o", "54o", "44", "43s", "42s", "A3o", "K3o", "Q3o", "J3o", "T3o", "93o", "83o", "73o", "63o", "53o", "43o", "33", "32s", "A2o", "K2o", "Q2o", "J2o", "T2o", "92o", "82o", "72o", "62o", "52o", "42o", "32o", "22"]
    var arrComplete = []
    
    var symbols = ['h','d','c','s']
    
   
    
    for (var i = 0;i<arr.length;i++){
        var hand = []
        
        if (arr[i][0] == arr[i][1]){
            for (var j=0;j<3;j++){
                for (var k=2;k<4;k++){
                    var card = []
                    if (k!=j){
                        card.push(arr[i][0]+symbols[j])
                        card.push(arr[i][0]+symbols[k])
                        hand.push(card)
                    } 
                }
            }
            var card = []
            card.push(arr[i][0]+symbols[0])
            card.push(arr[i][0]+symbols[1])
            hand.push(card)
        }
        else if (arr[i][0] == "("){
            for (var j=0;j<4;j++){
                for (var k=0;k<4;k++){
                    var card = []
                    if(k==j){
                        card.push(arr[i][1]+symbols[j])
                        card.push(arr[i][2]+symbols[k])
                        
                        hand.push(card)
                    }
                    
                }
            }
            arr[i] = arr[i][1]+arr[i][2]+"s"
        }
        else{
            for (var j=0;j<4;j++){
                for (var k=0;k<4;k++){
                    var card = []
                    if(k!=j){
                        card.push(arr[i][0]+symbols[j])
                        card.push(arr[i][1]+symbols[k])
                        
                        hand.push(card)
                    }
                    
                }
            }
            arr[i] = arr[i][0]+arr[i][1]+"o"
        }
        
        var obj = {combo:arr[i],hands:hand}
        arrComplete.push(obj)

    }
    //console.log(arrComplete)
    return arrComplete
}


export const rangeBuilder = (state,arrComplete) =>{
    var range = []
    for (var i = 0; i<state.length;i++){
        if(state[i].status == true){
            for (var j = 0;j<arrComplete.length;j++){
                if (state[i].combo == arrComplete[j].combo){
                    range.push(arrComplete[j].hands)
                }
            }
        }
    }
    return range.flat()
}

