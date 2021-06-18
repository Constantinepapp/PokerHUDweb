

export const tableDataCalc = (json) =>{
    console.log(json)
    var allPlayers = []
    for(var i = 0; i<json.length;i++){
        for (var j = 0; j <json[i].players.length;j++){
            if (!allPlayers.includes(json[i].players[j])){
                allPlayers.push(json[i].players[j])
            }
        }
    }

    var recentPlayers = []
    const last = json.length - 1
    for (var j = 0; j <json[last].players.length;j++){
        if (!recentPlayers.includes(json[last].players[j])){
            recentPlayers.push(json[last].players[j])
        }
    }
    
    ///players played rounds
    var recentPlayStatistics = []
    var recentPlayerHistory = []
    for(var i = 0; i<recentPlayers.length;i++){
        var player = PlayerMacros(recentPlayers[i],json)
        var history = PlayerHistory(recentPlayers[i],json)
        recentPlayStatistics.push(player)
        recentPlayerHistory.push(history)
    }
    //console.log(allPlayers)
    //console.log(recentPlayers)
    //console.log(recentPlayStatistics)
    //console.log(recentPlayerHistory)
    return [recentPlayStatistics,recentPlayerHistory]
}


const PlayerMacros = (player,json) =>{
    var preflopfold = 0
    var seeFlop = 0
    var rounds = 0
    var winFold = 0
    for (var i=0;i<json.length;i++){
        for (var j=0;j<json[i].summary.length;j++){
            if(json[i].summary[j].player == player){
                rounds = rounds + 1
                switch(json[i].summary[j].action) {
                    case "preflopfold":
                      preflopfold ++
                      break;
                    case "win1":
                      winFold ++
                    default:
                      break
                  }
            }
        }
    }

    //chips 
    var last = json.length-1
    for (var j=0;j<json[last].intro.length;j++){
        
        if(json[last].intro[j].player == player){
            var chips = json[last].intro[j].chips
            
        }
    }

    //raises preflop
    var preFlopRaise = 0
    for (var i=0;i<json.length;i++){
        const raiseList = json[i].preflop.Raise[0]
        if (player == raiseList){
            preFlopRaise ++
        }
    }
    preFlopRaise = preFlopRaise*100/rounds

    
    
    const seeFlopPerc = (rounds-preflopfold)*100/rounds
    return {'player':player,'rounds':rounds,'seeFlop':seeFlopPerc.toFixed(0),'chips':chips,'preflopraise':preFlopRaise.toFixed(0),'winFold':winFold}
}


const PlayerHistory = (player,json) => {
    var history = []
    var chips = 0
    
    for (var i=0;i<json.length;i++){
        for(var j=0;j<json[i].intro.length;j++){
            if (json[i].intro[j].player == player){
                               
                try{
                    var action = json[i].summary[j].action
                }
                catch{
                    var action = "no action"
                }
                var flop = []
                var turn = []
                var river = []
                if (json[i].flop.Raise?.includes(player)){
                    flop.push('raise')                    
                }
                if (json[i].flop.Reraise?.includes(player)){
                    flop.push('reraise')                     
                }
                if (json[i].flop.Check?.includes(player)){
                    flop.push('check')                      
                }
                if (json[i].flop.Fold?.includes(player)){
                    flop.push('fold')                    
                }
                if (json[i].turn.Raise?.includes(player)){
                    turn.push('raise')                 
                }
                if (json[i].turn.Reraise?.includes(player)){
                    turn.push('reraise')                   
                }
                if (json[i].turn.Check?.includes(player)){
                    turn.push('check')                    
                }
                if (json[i].turn.Fold?.includes(player)){
                    turn.push('fold')                 
                }
                if (json[i].river.Raise?.includes(player)){
                    river.push('raise')                    
                }
                if (json[i].river.Reraise?.includes(player)){
                    river.push('reraise')                    
                }
                if (json[i].river.Check?.includes(player)){
                    river.push('check')                    
                }
                if (json[i].river.Fold?.includes(player)){
                    river.push('fold')                  
                }
                var play = [flop,turn,river]

                if (json[i].showDown){
                    for(var k=0;k<json[i].showDown.length;k++){
                        if(json[i].showDown[k].includes(player)&&json[i].showDown[k].includes("[")){
                            var temp = json[i].showDown[k].split("[")
                            temp = temp[1].split(']')
                            //console.log(temp)
                            var hand = {"hand":i+1,"chips":json[i].intro[j].chips,"cards":temp[0],'table':json[i].cardsDown,'type':temp[1],"action":action}
                        }
                        
                    }
                }
                else{
                    var hand = {"hand":i+1,"chips":json[i].intro[j].chips,"cards":"",'table':json[i].cardsDown,"action":action}
                }
                if (player == json[i].preflop.Player){
                    if (hand && hand.cards.length == 0){
                        var hand = {"hand":i+1,"chips":json[i].intro[j].chips,"cards":json[i].preflop.PlayerHand,'table':json[i].cardsDown,"action":action}
                    }
                    
                }
                
                
                    
                
                
            }
            hand.plays = play
            
        }
        if (!hand){
            hand = {"hand":"-","chips":'0'.chips,"action":"--"}   
        }
        if (history[history.length-1] && history[history.length-1].hand == hand.hand){
            //console.log("here")
        }
        else{
            history.push(hand)
        }
        
        //console.log(hand)
    }
    return {"player":player,history}
}