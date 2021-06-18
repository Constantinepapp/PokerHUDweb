
function SplitRounds(text){
    //console.log(text)
    return text.split("PokerStars")
}

function ActionClassifier(summary){
    if (summary.includes("fold πριν Flop")){
        return 'preflopfold'
    }
    if (summary.includes("fold στο Flop")){
        return 'flopfold'
    }
    if (summary.includes("fold στο River")){
        return 'riverfold'
    }
    if (summary.includes("fold στο Turn")){
        return 'turnfold'
    }
    if (summary.includes("απεκόμισε")){
        return 'win1'
    }
    if (summary.includes("κέρδισε")){
        return 'win2'
    }
    if (summary.includes("mucked")){
        return 'mucked'
    }
    if (summary.includes("έχασε")){
        return 'loss'
    }
    else{
        return 'no data'
    }
}
function ChipsClassifier(intro){
    
    var chips = intro.split(" ")[3].slice(1)
    return chips
}
function PreflopAnalyzer(players,preflopRound){
    //console.log(preflopRound)
    var playerRaise = []
    var playerReraise = []
    var playerHand = ""

    for (var i=0;i<preflopRound.length;i++){
        if (preflopRound[i].includes("raise")){
            
            for (var j = 0; j<players.length;j++){
                if (preflopRound[i].includes(players[j])){
                    if (playerRaise.length == 0){
                        playerRaise.push(players[j])
                    }
                    else{
                        playerReraise.push(players[j])
                    }
                }
            }
    
        }   
        if (preflopRound[i].includes("Μοίρασε")){
            for (var j = 0; j<players.length;j++){
                if (preflopRound[i].includes(players[j])){
                    var playerSelf = players[j]
                }
            }
            var temp = preflopRound[i].split('[')
            var temp = temp[1].split("]")
            playerHand = temp[0]
        }        
        
    }
    preflopRound = {'Raise':playerRaise,'Reraise':playerReraise,"Player":playerSelf,'PlayerHand':playerHand}
    
    return preflopRound
    
}
function FlopAnalyzer(players,flopRound){
    //console.log(flopRound)
    var playerRaise = []
    var playerReraise = []
    var playerCheck = []
    var playerFold = []
    var playerHand = ""

    for (var i=0;i<flopRound.length;i++){
        if (flopRound[i].includes("raise")||flopRound[i].includes("ποντάρει")){
            
            for (var j = 0; j<players.length;j++){
                if (flopRound[i].includes(players[j])){
                    if (playerRaise.length == 0){
                        playerRaise.push(players[j])
                    }
                    else{
                        playerReraise.push(players[j])
                    }
                }
            }
    
        }
        if (flopRound[i].includes("check")){
            
            for (var j = 0; j<players.length;j++){
                if (flopRound[i].includes(players[j])){
                    
                    playerCheck.push(players[j])
                    
                }
            }
    
        } 
        if (flopRound[i].includes("fold")){
            
            for (var j = 0; j<players.length;j++){
                if (flopRound[i].includes(players[j])){
                    
                    playerFold.push(players[j])
                    
                }
            }
    
        }  
              
        
    }
    flopRound = {'Raise':playerRaise,'Reraise':playerReraise,"Check":playerCheck,'Fold':playerFold}
    
    return flopRound
    
}
function TurnAnalyzer(players,turnRound){
    //console.log(turnRound)
    var playerRaise = []
    var playerReraise = []
    var playerCheck = []
    var playerFold = []
    var playerHand = ""

    for (var i=0;i<turnRound.length;i++){
        if (turnRound[i].includes("raise")||turnRound[i].includes("ποντάρει")){
            
            for (var j = 0; j<players.length;j++){
                if (turnRound[i].includes(players[j])){
                    if (playerRaise.length == 0){
                        playerRaise.push(players[j])
                    }
                    else{
                        playerReraise.push(players[j])
                    }
                }
            }
    
        }
        if (turnRound[i].includes("check")){
            
            for (var j = 0; j<players.length;j++){
                if (turnRound[i].includes(players[j])){
                    
                    playerCheck.push(players[j])
                    
                }
            }
    
        } 
        if (turnRound[i].includes("fold")){
            
            for (var j = 0; j<players.length;j++){
                if (turnRound[i].includes(players[j])){
                    
                    playerFold.push(players[j])
                    
                }
            }
    
        }  
              
        
    }
    turnRound = {'Raise':playerRaise,'Reraise':playerReraise,"Check":playerCheck,'Fold':playerFold}
    
    return turnRound
    
}
function RiverAnalyzer(players,riverRound){
    //console.log(riverRound)
    var playerRaise = []
    var playerReraise = []
    var playerCheck = []
    var playerFold = []
    var playerHand = ""

    for (var i=0;i<riverRound.length;i++){
        if (riverRound[i].includes("raise")||riverRound[i].includes("ποντάρει")){
            
            for (var j = 0; j<players.length;j++){
                if (riverRound[i].includes(players[j])){
                    if (playerRaise.length == 0){
                        //console.log(players[j])
                        playerRaise.push(players[j])
                    }
                    else{
                        playerReraise.push(players[j])
                    }
                }
            }
    
        }
        if (riverRound[i].includes("check")){
            //console.log(riverRound)
            for (var j = 0; j<players.length;j++){
                if (riverRound[i].includes(players[j])){
                    //console.log(players[j])
                    playerCheck.push(players[j])
                    
                }
            }
    
        } 
        if (riverRound[i].includes("fold")){
            
            for (var j = 0; j<players.length;j++){
                if (riverRound[i].includes(players[j])){
                    
                    playerFold.push(players[j])
                    
                }
            }
    
        }  
              
        
    }
    riverRound = {'Raise':playerRaise,'Reraise':playerReraise,"Check":playerCheck,'Fold':playerFold}
    
    return riverRound
    
}
function IntroAnalyzer(intro){
    var players = []
    for (var i=0;i<intro.length;i++){
        if (intro[i].includes("Θέση")){
            var splited = intro[i].split(" ")
            var chips = ChipsClassifier(intro[i])
            players.push({"player":splited[2],"chips":chips})
            
        }
        if (intro[i].includes("ante")){
            var ante = intro[i].split(" ")
            //console.log(ante)
            ante = ante[ante.length-1].replace(/\D/g,'');
        }
        if (intro[i].includes("big blind")){
            var bblind = intro[i].split(" ")
            //console.log(ante)
            bblind = bblind[bblind.length-1].replace(/\D/g,'');
        }
        if (intro[i].includes("small blind")){
            var sblind = intro[i].split(" ")
            //console.log(ante)
            sblind = sblind[sblind.length-1].replace(/\D/g,'');
        }
    }
    //console.log(players)
    return [players,ante,bblind,sblind]
}
function getPlayerList(summary){
    var players = []    
    for (var i=0;i<summary.length;i++){
        if (summary[i].includes("Θέση")){
            var splited = summary[i].split(" ")
            players.push(splited[2])
        }
    }
    return players
}
function SummaryAnalyzer(summary){
    var players = []    
    for (var i=0;i<summary.length;i++){
        //console.log(summary[i])
        if (summary[i].includes("Θέση")){
            var splited = summary[i].split(" ")
            var action = ActionClassifier(summary[i])
            players.push({"player":splited[2],"action":action})
            //console.log(splited)
        }
        if (summary[i].includes('Ταμπλό')){
            var cardsDown = summary[i].split("[")
            cardsDown = cardsDown[1].split("]")
            cardsDown = cardsDown[0] 
            
        }
    }
    return [players,cardsDown]
}
const SplitActions = (text) =>{
    

    text = text.split("\n")
       
    for (var i = 0; i<text.length;i++){
        if (text[i].includes("*** ΚΡΥΦΑ ΦΥΛΛΑ ***")){
            var preflop = i
        }
    }
    for (var i = 0; i<text.length;i++){
        if (text[i].includes("*** FLOP ***")){
            var flop = i
        }
    }
    for (var i = 0; i<text.length;i++){
        if (text[i].includes("*** TURN ***")){
            var turn = i
        }
    }
    for (var i = 0; i<text.length;i++){
        if (text[i].includes("*** RIVER ***")){
            var river = i
        }
    }
    for (var i = 0; i<text.length;i++){
        if (text[i].includes("*** SHOW DOWN ***")){
            var showDown = i
        }
    }
    for (var i = 0; i<text.length;i++){
        if (text[i].includes("*** ΣΥΝΟΨΗ ***")){
            var summary = i
        }
    }

    var introRound = text.slice(0,preflop)
    if (flop){
        var preflopRound = text.slice(preflop,flop)
        if (turn){
            var flopRound = text.slice(flop,turn)
            if (river){
                var turnRound = text.slice(turn,river)
                if (showDown){
                    var riverRound = text.slice(river,showDown)
                    var showDownRound = text.slice(showDown,summary)
                }
                else{
                    var riverRound = text.slice(river,summary)
                }
            }
            else{
                var flopRound = text.slice(turn,summary)
            }
        }
        else{
            var flopRound = text.slice(flop,summary)
        }
    }
    else{
        var preflopRound = text.slice(preflop,summary)
    }

    var summaryRound = text.slice(summary)
    var players = getPlayerList(summaryRound)
    var [summaryRound,cardsDown] = SummaryAnalyzer(summaryRound)
    var preflopRound = PreflopAnalyzer(players,preflopRound)
    var [introRound,ante,bblind,sblind] = IntroAnalyzer(introRound)
    if (flopRound){
        var flopRound = FlopAnalyzer(players,flopRound)
    }
    else{
        var flopRound = ""
    }
    if (turnRound){
        var turnRound = TurnAnalyzer(players,turnRound)
    }
    else{
        var turnRound = ""
    }
    if (riverRound){
        var riverRound = RiverAnalyzer(players,riverRound)
    }
    else{
        var riverRound = ""
    }
    //console.log(flopRound)
    var round = {"players":players,'ante':ante,'smallBlind':sblind,'bigBlind':bblind,'cardsDown':cardsDown,"intro":introRound,'preflop':preflopRound,"flop":flopRound,"turn":turnRound,"river":riverRound,"showDown":showDownRound,"summary":summaryRound}
    
    return round
    
}

export const textToJson = (array) => {
    const text = SplitRounds(array)

    var hands = []


    for (var i = 0; i < text.length;i++){
        hands.push(SplitActions(text[i]))
    }


    return hands
}


//hands.map(hand => console.log(hand.preflop))

