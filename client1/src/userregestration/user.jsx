import React from 'react';
import {sendUserDetails} from '../api/gameapi'
import { Link} from "react-router-dom";
class UserRegestration extends  React.Component{
    constructor(props){
        console.log(props)
        super(props);
        this.state = {
            name:""
        };
    }

    handleData({target:{name,value}}){
        this.setState({
            [name]:value
        },()=>console.log(this.state))
    }
    getusername(){
        let target = document.getElementById("inpute");
        this.setState({
            name:target.value
        },()=>{ sendUserDetails({name:this.state.name});
               alert(`welcom to the game ${this.state.name} pls white you wil be redirect to game soon`);
               setTimeout(()=>window.location.pathname=`/currentgame`,2000)
               })
    }

    render(){
        return(
            <div style={{width:"62%",margin:"auto"}}>
                <h1>hellow player pleas eneter you details</h1>
                <div style={{width:"60%",margin:"50px auto"}}>
                <button className="mr-2" name="name" value={this.state.choosen_number} onClick={(e)=>{this.getusername()}}>send name</button>
                <input id="inpute" className="btn btn-secondary" style={{textAlign:"-webkit-center"}} type="text" name="name"/>
                
                </div>
            </div>
        )
    }
}
export default UserRegestration;