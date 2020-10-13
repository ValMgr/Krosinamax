import store from '../store'
import client from '../main.js'

let exports = {}
var isEnd = true;

exports.endMatch = (score, MVP) => {

    let reward = {}

       for (const each of store.state.bets) {
        let gain = 0
        let getMVP = false;
        let getScore = false;

        if(each.score == score){
            getScore = true;
        }
        if(each.MVP.toLowerCase() == MVP.toLowerCase()){
            getMVP = true
        }

        if(getMVP){
            gain += 2500;
        }
        if(getScore){
            gain += 2500;
        }

        //console.log(each.pseudo + " gain " + gain);
        if(gain > 0){
            reward[each.pseudo] = gain
        }
    }

    isEnd = true;
    exports.isEnd = isEnd;
    client.sendReward(reward)
    store.commit("cleanBet")
}

// exports.sendBet = (bet) => {
//     if(isEnd){
//         console.log("Les paris sont fermés !")
//     }
//     else if(!isEnd){
//         store.commit("addBet", bet);
//     }
// }

exports.StopCountdown = () => {
    isEnd = true;
    exports.isEnd = isEnd;
}


function countdown(timer){
    if(!isEnd){
        if(timer > 0){
            timer--;
            document.getElementById('countdown').innerHTML = Math.floor(timer / 60) + ':' + (timer % 60)
            setTimeout(() => {
                countdown(timer)
            }, 1000);
        }
        else if(timer == 0){
            isEnd = true;
            exports.isEnd = isEnd;
            document.getElementById('countdown').innerHTML = "Paris fermé";
            document.getElementById('StateIndicator').style.backgroundColor = "#FF0000"
        }
    }
    else{
        document.getElementById('countdown').innerHTML = "Paris fermé";
        document.getElementById('StateIndicator').style.backgroundColor = "#FF0000"
    } 
}

exports.StartCountdown = (timer) => {
    isEnd = false
    exports.isEnd = isEnd;
    document.getElementById('StateIndicator').style.backgroundColor = "#00FF00"
    countdown(timer)
}

exports.isEnd = isEnd;
export default exports