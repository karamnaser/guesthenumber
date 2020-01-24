import React from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import GameHistory from '../history'
import {sendgameDetails,sendgamenumbers} from '../api/gameapi' 
class Game extends  React.Component{
    constructor(props){
        super(props);
        this.state = {
            userid:0,
            gameid:0,
            guessed_numbers:[],
            current_number:0,
            min_number:0,
            max_number:0,
            number_of_guess:0,
            choosen_number:0,
            newgame:true
        };
    }
    componentDidMount(){
        this.setState({
            min_number:parseInt(prompt(`pls insert min number`)),
            max_number:parseInt(prompt(`pls inserts max number`)),
            userid:this.state.userid+1,
            gameid:this.state.gameid+1
    },()=>{this.state.choosen_number=parseInt(prompt(`insert number between ${this.state.min_number} and ${this.state.max_number}`));
    if(this.state.min_number>this.state.max_number){
        alert("min number larger than max number choos again")
        this.setState({
            min_number:parseInt(prompt(`pls insert min number`)),
            max_number:parseInt(prompt(`pls inserts max number`))
        })
    }
})
    }

    handleData({target:{name,value}}){
        this.setState({
            [name]:value
        },()=>console.log(this.state))
    }
    sendcurrentgamedetails(){
        if(this.state.choosen_number == this.state.current_number){
            sendgamenumbers({gameid:this.state.gameid,number:this.state.current_number})
            let response = sendgameDetails({userid:this.state.userid,
                minnumber:this.state.min_number,
                 maxnumber:this.state.max_number,
            choosennumber:this.state.choosen_number})
            alert("you got the currect number")
            this.resetgame();
    }
    else  if(this.state.choosen_number > this.state.current_number){
        sendgamenumbers({gameid:this.state.gameid,number:this.state.current_number})
        alert(`number is samller than the choosen number pls insert number again`)
        this.state.number_of_guess++
    }
    else  if(this.state.choosen_number < this.state.current_number){
        sendgamenumbers({gameid:this.state.gameid,number:this.state.current_number})
        alert(`number is greater than the choosen number pls insert number again`)
        this.state.number_of_guess++
    }
}
 
    getchoosennumber(e){
        let target = document.getElementById("inpute");
        this.state.current_number=parseInt(target.value)
        if(this.state.current_number<this.state.min_number ||this.state.current_number>this.state.max_number ){
            alert("number not valid")
                return
            
        }
        this.setState({
            guessed_numbers:[...this.state.guessed_numbers,parseInt(target.value)],
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
        },()=>this.state.choosen_number=parseInt(prompt(`insert number between ${this.state.min_number} and ${this.state.max_number}`)))
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
                <button className="mr-2" name="choosen_number" value={this.state.choosen_number} onClick={(e)=>{
                   
                    this.getchoosennumber(e);

                    }}>send number</button>
                <input id="inpute" className="btn btn-secondary" style={{textAlign:"-webkit-center"}} type="number" name="choosen_number" placeholder={"insert anumber"}/>
                
                </div>
            </div>
    :<GameHistory userid={this.state.userid} gameid={this.state.gameid}/>}
            </>
        )
    }
}
export default Game;