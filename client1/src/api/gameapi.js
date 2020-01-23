 import axios from 'axios'
 import fecher from './fecher';


 function getplayers(playerid) {
     return new Promise((resolve => {
         fecher.get(`/users/${playerid}`)
             .then(response => resolve(response.data))
     }))

 }

 function getGameNumbers(gameid) {
     return new Promise((resolve => {
         fecher.get(`/users/currentgame/${gameid}`)
             .then(response => resolve(response.data))
     }))

 }

 async function sendUserDetails(user_name) {
     const resonse = await fecher.post('/users', user_name)
     return resonse.data;
 }

 async function sendgameDetails(gamedetails) {
     const resonse = await fecher.post('/users/currentgame', gamedetails)
     return resonse.data;
 }

 async function sendgamenumbers(gamenumbers) {
     const resonse = await fecher.post('/users/currentgamenumbers', gamenumbers)
     return resonse.data;
 }



 export { sendUserDetails, sendgameDetails, sendgamenumbers, getplayers, getGameNumbers }