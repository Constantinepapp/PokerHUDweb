
function SplitRounds(text){
    //console.log(text)
    return text.split("PokerStars")
}

function ActionClassifier(summary,language){
    var keywords = {
        english:
            ["folded before Flop","folded on the Flop","folded on the Turn","folded on the River","collected","won","lost"],
        greek:
            ["fold πριν Flop","fold στο Flop","fold στο Turn","fold στο River","απεκόμισε","κέρδισε","έχασε"]
       }
    if (summary.includes(keywords[language][0])){
        return 'preflopfold'
    }
    if (summary.includes(keywords[language][1])){
        return 'flopfold'
    }
    if (summary.includes(keywords[language][3])){
        return 'riverfold'
    }
    if (summary.includes(keywords[language][2])){
        return 'turnfold'
    }
    if (summary.includes(keywords[language][4])){
        return 'win1'
    }
    if (summary.includes(keywords[language][5])){
        return 'win2'
    }
    if (summary.includes("mucked")){
        return 'mucked'
    }
    if (summary.includes(keywords[language][6])){
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
function PreflopAnalyzer(players,preflopRound,language){
    //console.log(preflopRound)
    var playerRaise = []
    var playerCall = []
    var playerCheck = []
    var playerFold = []
    var round = []
    var playerReraise = []
    var playerHand = ""
    var keywords = {
        english:
            ["Dealt"],
        greek:
            ["Μοίρασε"]
       }
    for (var i=0;i<preflopRound.length;i++){
        round.push(preflopRound[i])
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
        if (preflopRound[i].includes("call")||preflopRound[i].includes("calls")){
            if (!preflopRound[i].includes("δεν έγινε")){
                for (var j = 0; j<players.length;j++){
                    if (preflopRound[i].includes(players[j])){
                        
                        playerCall.push(players[j])
                        
                        
                    }
                }
            }
    
        }
        if (preflopRound[i].includes("check")||preflopRound[i].includes("checks")){
            
            for (var j = 0; j<players.length;j++){
                if (preflopRound[i].includes(players[j])){
                    
                    playerCheck.push(players[j])
                    
                }
            }
    
        } 
        if (preflopRound[i].includes("fold")||preflopRound[i].includes("folds")){
            
            for (var j = 0; j<players.length;j++){
                if (preflopRound[i].includes(players[j])){
                    
                    playerFold.push(players[j])
                    
                }
            }
    
        }     
        if (preflopRound[i].includes(keywords[language][0])){
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
    preflopRound = {'round':round,'Call':playerCall,'Fold':playerFold,'Check':playerCheck,'Raise':playerRaise,'Reraise':playerReraise,"Player":playerSelf,'PlayerHand':playerHand}
    
    return preflopRound
    
}
function FlopAnalyzer(players,flopRound,language){
    //console.log(flopRound)
    var playerRaise = []
    var playerCall = []
    var round = []
    var playerReraise = []
    var playerCheck = []
    var playerFold = []
    var playerHand = ""
    var keywords = {
        english:
            ["bets"],
        greek:
            ["ποντάρει"]
       }
    
    for (var i=0;i<flopRound.length;i++){
        round.push(flopRound[i])
        if (flopRound[i].search("raise")!=-1||flopRound[i].search(keywords[language][0])!=-1){
            
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
        if (flopRound[i].includes("check")||flopRound[i].includes("checks")){
            
            for (var j = 0; j<players.length;j++){
                if (flopRound[i].includes(players[j])){
                    
                    playerCheck.push(players[j])
                    
                }
            }
    
        } 
        if (flopRound[i].includes("call")||flopRound[i].includes("calls")){
            if (!flopRound[i].includes("δεν έγινε")){
                for (var j = 0; j<players.length;j++){
                    if (flopRound[i].includes(players[j])){
                        
                        playerCall.push(players[j])
                        
                    }
                }
            }
            
    
        }
        if (flopRound[i].includes("fold")||flopRound[i].includes("folds")){
            
            for (var j = 0; j<players.length;j++){
                if (flopRound[i].includes(players[j])){
                    
                    playerFold.push(players[j])
                    
                }
            }
    
        }  
              
        
    }
    flopRound = {'round':round,'Call':playerCall,'Raise':playerRaise,'Reraise':playerReraise,"Check":playerCheck,'Fold':playerFold}
    
    return flopRound
    
}
function TurnAnalyzer(players,turnRound,language){
    //console.log(turnRound)
    var playerRaise = []
    var playerCall = []
    var round = []
    var playerReraise = []
    var playerCheck = []
    var playerFold = []
    var playerHand = ""
    var keywords = {
        english:
            ["bets"],
        greek:
            ["ποντάρει"]
       }
    for (var i=0;i<turnRound.length;i++){
        round.push(turnRound[i])
        if (turnRound[i].includes("raise")||turnRound[i].includes(keywords[language][0])){
            
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
        if (turnRound[i].includes("check")||turnRound[i].includes("checks")){
            
            for (var j = 0; j<players.length;j++){
                if (turnRound[i].includes(players[j])){
                    
                    playerCheck.push(players[j])
                    
                }
            }
    
        } 
        if (turnRound[i].includes("call")||turnRound[i].includes("calls")){
            if (!turnRound[i].includes("δεν έγινε")){
                for (var j = 0; j<players.length;j++){
                    if (turnRound[i].includes(players[j])){
                        
                        playerCall.push(players[j])
                        
                    }
                }
            }
    
        } 
        if (turnRound[i].includes("fold")||turnRound[i].includes("folds")){
            
            for (var j = 0; j<players.length;j++){
                if (turnRound[i].includes(players[j])){
                    
                    playerFold.push(players[j])
                    
                }
            }
    
        }  
              
        
    }
    turnRound = {'round':round,'Call':playerCall,'Raise':playerRaise,'Reraise':playerReraise,"Check":playerCheck,'Fold':playerFold}
    
    return turnRound
    
}
function RiverAnalyzer(players,riverRound,language){
    //console.log(riverRound)
    var playerRaise = []
    var round = []
    var playerCall = []
    var playerReraise = []
    var playerCheck = []
    var playerFold = []
    var playerHand = ""
    var keywords = {
        english:
            ["bets"],
        greek:
            ["ποντάρει"]
       }
    for (var i=0;i<riverRound.length;i++){
        round.push(riverRound[i])
        if (riverRound[i].includes("raise")||riverRound[i].includes(keywords[language][0])){
            
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
        if (riverRound[i].includes("check")||riverRound[i].includes("checks")){
            //console.log(riverRound)
            for (var j = 0; j<players.length;j++){
                if (riverRound[i].includes(players[j])){
                    //console.log(players[j])
                    playerCheck.push(players[j])
                    
                }
            }
    
        } 
        if (riverRound[i].includes("call")||riverRound[i].includes("calls")){
            //console.log(riverRound)
            if (!riverRound[i].includes("δεν έγινε")){
                for (var j = 0; j<players.length;j++){
                    if (riverRound[i].includes(players[j])){
                        //console.log(players[j])
                        playerCall.push(players[j])
                        
                    }
                }
            }
    
        }
        if (riverRound[i].includes("fold")||riverRound[i].includes("folds")){
            
            for (var j = 0; j<players.length;j++){
                if (riverRound[i].includes(players[j])){
                    
                    playerFold.push(players[j])
                    
                }
            }
    
        }  
              
        
    }
    riverRound = {'round':round,'Call':playerCall,'Raise':playerRaise,'Reraise':playerReraise,"Check":playerCheck,'Fold':playerFold}
    
    return riverRound
    
}
function IntroAnalyzer(intro,language){
    var players = []
    var keywords = {
        english:
            ["Seat"],
        greek:
            ["Θέση"],
        german:
            ["Platz"]
       }
    for (var i=0;i<intro.length;i++){
        if (intro[i].includes(keywords[language][0])){
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
function getPlayerList(summary,language){
    var players = []    
    var keywords = {
        english:
            ["Seat"],
        greek:
            ["Θέση"],
        german:
            ["Platz"]
       }
    for (var i=0;i<summary.length;i++){
        if (summary[i].includes(keywords[language][0])){
            var splited = summary[i].split(" ")
            players.push(splited[2])
        }
    }
    return players
}
function SummaryAnalyzer(summary,language){
    var players = []    
    var keywords = {
        english:
            ["Seat","Board"],
        greek:
            ["Θέση","Ταμπλό"],
        german:
            ["Platz","Board"]
       }
    for (var i=0;i<summary.length;i++){
        //console.log(summary[i])
        if (summary[i].includes(keywords[language][0])){
            var splited = summary[i].split(" ")
            //console.log("-----------------------")
            
            
            var action = ActionClassifier(summary[i],language)
            if(summary[i].includes("small")){
                players.push({"player":splited[2],"action":action,"position":'sb'})
            }
            else if (summary[i].includes("big")){
                players.push({"player":splited[2],"action":action,"position":'bb'})
            }
            else if (summary[i].includes("button")){
                players.push({"player":splited[2],"action":action,"position":'btn'})
            }
            else{
                players.push({"player":splited[2],"action":action,"position":'other'})
            }
            
            //console.log(summary[i],splited)
            
            console.log(players)
        }
        if (summary[i].includes(keywords[language][1])){
            var cardsDown = summary[i].split("[")
            cardsDown = cardsDown[1].split("]")
            cardsDown = cardsDown[0] 
            
        }
    }
    return [players,cardsDown]
}
const SplitActions = (text) =>{
    

    text = text.split("\n")
    var language = "english"
    var keywords = {english:
                    ["*** HOLE CARDS ***","*** SUMMARY ***"],
                    greek:
                    ["*** ΚΡΥΦΑ ΦΥΛΛΑ ***","*** ΣΥΝΟΨΗ ***"],
                    german:
                    ["*** HOLE CARDS ***","*** ZUSAMMENFASSUNG ***"]
                   }
    if (text[0].includes("Παρτίδα")){
        language = "greek"
    }
    if (text.includes("Tisch")){
        language = "german"
    }
    
    var title = text[0].split(" ")
    title = `${title[4]} ${title[5]} ${title[7]}`
    for (var i = 0; i<text.length;i++){
        if (text[i].includes(keywords[language][0])){
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
        if (text[i].includes(keywords[language][1])){
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
    var players = getPlayerList(summaryRound,language)
    var [summary,cardsDown] = SummaryAnalyzer(summaryRound,language)
    var preflopRound = PreflopAnalyzer(players,preflopRound,language)
    var [introRound,ante,bblind,sblind] = IntroAnalyzer(introRound,language)
    if (flopRound){
        var flopRound = FlopAnalyzer(players,flopRound,language)
    }
    else{
        var flopRound = ""
    }
    if (turnRound){
        var turnRound = TurnAnalyzer(players,turnRound,language)
    }
    else{
        var turnRound = ""
    }
    if (riverRound){
        var riverRound = RiverAnalyzer(players,riverRound,language)
    }
    else{
        var riverRound = ""
    }
    //console.log(flopRound)
    var round = {"title":title,"players":players,'ante':ante,'smallBlind':sblind,'bigBlind':bblind,'cardsDown':cardsDown,"intro":introRound,'preflop':preflopRound,"flop":flopRound,"turn":turnRound,"river":riverRound,"showDown":showDownRound,"summary":summary,'summaryRound':summaryRound}
    
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

