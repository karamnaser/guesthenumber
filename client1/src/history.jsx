import React from 'react';
import {getGameNumbers,getplayers} from './api/gameapi';
class GameHistory extends React.Component{
    constructor(props){
        super(props);
        console.log('history', props)
        this.state = {
            playerid: props.userid,
            gameid: props.gameid,
            users_games:[],
            games:[],
            player_name:"",
            min_number:0,
            max_number:0,
            choosinnumber:0,
            gusednumberingame:[]
        }
    }

    componentDidMount(){
        getplayers(this.state.playerid)
        .then(users=>this.setState({users_games:users
        },()=>console.log(this.state)))
        getGameNumbers(this.state.gameid)
        .then(games=>this.setState({
            games:games
        },()=>console.log(this.state)))
    }

    render(){
        return(
            <>
            <div style={{display:"flex",justifyContent:"space-between",width:"60%",margin:"auto"}}>
                <h1>player game history</h1>
                <div>
    <p> {this.state.users_games.map(users=>{
                    return(
                    <p>{users["name"]}</p>
                    )
                    })}</p>
                </div>
                <div style={{textAlign:"center"}}>
                    <p>range of numbers</p>
                    {this.state.games.map(game=>{
                        return(
                    <>
                    <p>min number:{game["min_number"]}</p>
                    <p>max number:{game["max_number"]}</p>
                    </>
                        )
                    })}
                    
                </div>
                <div style={{textAlign:"center"}}>
                    <p>coosin numbers</p>
                {this.state.games.map(game=>{
                    return(
                    <p>{game["choosin_number"]}</p>
                    )
                    })}
                </div>
                <div style={{textAlign:"center"}}>
                    <p>gueesed numbers</p>
                {this.state.games.map(game=>{
                    return(
                    <p>{game["_number"]}</p>
                    )
                    })}
                </div>
            </div>
            </>
        )
    }
}
export default GameHistory