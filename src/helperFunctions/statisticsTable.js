

export const tableDataCalc = (json) =>{
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
    console.log(allPlayers)
    console.log(recentPlayers)
    console.log(recentPlayStatistics)
    console.log(recentPlayerHistory)
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
                
                var hand = {"hand":i+1,"chips":json[i].intro[j].chips,"action":action}
            }
            
        }
        if (!hand){
            hand = {"hand":"-","chips":'0'.chips,"action":"--"}   
        }
        history.push(hand)
    }
    return {"player":player,history}
}