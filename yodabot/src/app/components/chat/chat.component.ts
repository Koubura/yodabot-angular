import { Component, OnInit } from '@angular/core';
import { Message } from 'src/app/models/message.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  message:string = "";
  writing:boolean = false;
  conversation: Message[] = [];

  constructor() { }

  ngOnInit() {
  }

  send() {
    this.conversation.push(new Message("Me",this.message))
    console.log(this.conversation);
    this.writing = true;
    // llamada al backend
    this.message = "";
  }

}
