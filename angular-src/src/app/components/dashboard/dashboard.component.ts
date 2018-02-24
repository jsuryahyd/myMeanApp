import { Component, OnInit } from '@angular/core';
import * as io from "socket.io-client";
import {Observable} from 'rxjs/Observable';
import { FlashMessagesService } from 'angular2-flash-messages';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  num_activeUsers:number;
feedback: string;
socket:any;
message:String;
username:string;
otherUser : String;
newMessage:String;
activeUsers :string[] =[];
chats:object[] = [];
  constructor(private flashMessages:FlashMessagesService) {

   }

  ngOnInit() {
    //for testing locally
    // const url = 'http://localhost:8080';
    // this.socket= io(url);
    this.socket = io();
    //as soon as connected, send user info
    this.username = JSON.parse(localStorage.getItem('user')).username;
    this.socket.emit('setId',{username:this.username})


    //receiving message
    this.socket.on('chat',(data)=>{
      this.feedback = "";
      this.otherUser = data.user+": ";
      this.newMessage = data.message;
      this.chats.push({name:data.user,msg:this.newMessage});
      // obj.scrollTop = obj.scrollHeight;
    })
//receiving typing feedback
this.socket.on('typing',(data)=>{
  this.feedback = data.user+" is typing"
});

this.socket.on('newJoin',(data)=>{
  this.activeUsers.push(data.newJoin);
  this.flashMessages.show(data.newJoin+" joined the chat.",{cssClass:"ui positive message",timeout:3000});
  this.num_activeUsers = data.num_users;
})
this.socket.on('userLeft',(data)=>{
  console.log(this.activeUsers)  
  this.activeUsers.splice(this.activeUsers.indexOf(data.left),1);
  console.log(this.activeUsers)
  this.flashMessages.show(data.left+" left the chat.",{cssClass:"ui negative message",timeout:3000}); 
  this.num_activeUsers = data.num_users;
})
  }

  onMessageInput(ev){
    this.message = ev.target.value;
  }
  send_message(){
    if(this.message){
    console.log(this.message,this.username);
    this.socket.emit('chat',{
      message:this.message,
      user:this.username
    });
    this.message = '';
  }
  }

  emit_typing(){
    this.socket.emit('typing',{user:this.username})
  }
  

}
