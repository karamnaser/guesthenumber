import React from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import GameHistory from '../history'
import {sendgameDetails,sendgamenumbers,getplayers} from '../api/gameapi' 
class Game extends  React.Component{
    constructor(props){
        super(props);
        console.log(this.props)
        this.state = {
            username:this.props.name,
            userid:0,
            gameid:0,
            user:[],
            guessed_numbers:[],
            current_number:0,
            min_number:0,
            max_number:0,
            number_of_guess:0,
            choosen_number:0,
            newgame:true
        };
        console.log(this.state)
    }
    componentDidMount(){
        getplayers(this.state.username)
        .then(user=>{
            this.setState({
                user:user
            },()=>{console.log(this.state.user);
                this.setState({
                    min_number:parseInt(prompt(`pls insert min number`)),
                    max_number:parseInt(prompt(`pls inserts max number`)),
                    userid:this.state.user[0]["id"],
                    gameid:this.state.user[0]["gameid"]
            },()=>this.guessTheNumber());
            })
        })
    }

    handleData({target:{name,value}}){
        this.setState({
            [name]:value
        },()=>console.log(this.state))
    }
    sendcurrentgamedetails(){
            sendgamenumbers({gameid:this.state.gameid,number:this.state.current_number})
             sendgameDetails({username:this.state.userid,
                minnumber:this.state.min_number,
                 maxnumber:this.state.max_number,
            choosennumber:this.state.choosen_number})
            alert("you got the currect number")
            this.resetgame();
}

 guessTheNumber(){
    let gussednumber=Math.floor((Math.random()*(this.state.max_number-this.state.min_number))+this.state.min_number)
    this.state.current_number=parseInt(gussednumber)
    sendgamenumbers({gameid:this.state.gameid,number:this.state.current_number})
    while(!window.confirm(`is ${gussednumber} your number`)){
        this.state.current_number=parseInt(gussednumber)
        sendgamenumbers({gameid:this.state.gameid,number:this.state.current_number})
        gussednumber=Math.floor((Math.random()*(this.state.max_number-this.state.min_number))+this.state.min_number)
    }
    alert("congrates you found the number")
    this.setState({
        guessed_numbers:[...this.state.guessed_numbers,parseInt(gussednumber)],
    },()=>this.sendcurrentgamedetails())
}
 

    resetgame(){
        if(window.confirm("do you want to start anew game")){
        this.setState({
            min_number:prompt(`pls insert min number`),
            max_number:prompt(`pls inserts max number`),
       
            current_number:0,
            number_of_guess:0,
            guessed_numbers:[],
            gameid:this.state.gameid+1,
        },()=>this.guessTheNumber())
    }
    else{
        this.setState({
            ...this.state,
            newgame:false
        })
    }
}


    render(){
        return(
            <>
            {this.state.newgame ?
            <div style={{width:"62%",margin:"auto"}}>
                
                <h1>welcome to guess wich number game</h1>
                <div style={{width:"60%",margin:"50px auto"}}>
                {/* <button className="mr-2" name="choosen_number" value={this.state.choosen_number} onClick={(e)=>{
                   
                    this.getchoosennumber(e);

                    }}>send number</button>
                <input id="inpute" className="btn btn-secondary" style={{textAlign:"-webkit-center"}} type="number" name="choosen_number" placeholder={"insert anumber"}/> */}
                
                </div>
            </div>
    :<GameHistory username={this.state.username} gameid={this.state.gameid}/>}
            </>
        )
    }
}
export default Game;
