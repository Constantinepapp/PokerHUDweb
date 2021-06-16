
function SplitRounds(text){
    return text.split("PokerStars")
}

function ActionClassifier(summary){
    if (summary.includes("fold πριν Flop")){
        return 'preflopfold'
    }
    if (summary.includes("fold στο Flop")){
        return 'flopfold'
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
}
function ChipsClassifier(intro){
    
    var chips = intro.split(" ")[3].slice(1)
    return chips
}
function PreflopAnalyzer(players,preflopRound){
    console.log(preflopRound)
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
function IntroAnalyzer(intro){
    var players = []
    for (var i=0;i<intro.length;i++){
        if (intro[i].includes("Θέση")){
            var splited = intro[i].split(" ")
            var chips = ChipsClassifier(intro[i])
            players.push({"player":splited[2],"chips":chips})
            
        }
    }
    //console.log(players)
    return players
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
        if (summary[i].includes("Θέση")){
            var splited = summary[i].split(" ")
            var action = ActionClassifier(summary[i])
            players.push({"player":splited[2],"action":action})
            //console.log(splited)
        }
    }
    return players
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
    summaryRound = SummaryAnalyzer(summaryRound)
    preflopRound = PreflopAnalyzer(players,preflopRound)
    introRound = IntroAnalyzer(introRound)
    var round = {"players":players,"intro":introRound,'preflop':preflopRound,"flop":flopRound,"turn":turnRound,"river":riverRound,"showDown":showDownRound,"summary":summaryRound}
    

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

