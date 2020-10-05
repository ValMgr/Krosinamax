import store from '../store'

let exports = {}

exports.endMatch = (score, MVP) => {

    let reward = {}

       for (const each of store.state.bets) {
        let gain = 0
        let getMVP = false;
        let getScore = false;

        if(each.score == score){
            getScore = true;
        }
        if(each.MVP == MVP){
            getMVP = true
        }

        if(getMVP){
            gain += 2500;
        }
        if(getScore){
            gain += 2500;
        }

        console.log(each.pseudo + " gain " + gain);
        if(gain > 0){
            reward[each.pseudo] = gain
        }
    }

    console.log(reward)
    sendReward(reward)
    store.commit("cleanBet")
}

function sendReward(reward){
    // Twicth component to send IRC message
}

function countdown(timer){
    if(timer > 0){
        timer--;
        document.getElementById('countdown').innerHTML = Math.floor(timer / 60) + ':' + (timer % 60)
        // console.log(Math.floor(timer / 60) + ':' + (timer % 60))
        setTimeout(() => {
            countdown(timer)
        }, 1000);
    }
    else if(timer == 0){
        document.getElementById('countdown').innerHTML = "Paris fermé";
        document.getElementById('StateIndicator').style.backgroundColor = "#FF0000"
    }
}

exports.StartCountdown = (timer) => {
    document.getElementById('StateIndicator').style.backgroundColor = "#00FF00"
    countdown(timer)
}

export default exports

// function closeBet(){
//     isOpen = false;

//let isOpen = false;


// }

// var newBet = {
//     pseudo: "ZartaK32",
//     score: "1-0",
//     MVP: "ZartaK32"
// }

// store.commit('addBet', newBet)

// store.commit('cleanBet')