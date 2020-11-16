import { Component, OnInit } from '@angular/core';
import { Message } from 'src/app/models/message.model';
import { YodaService } from 'src/app/services/yoda-service.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  message:string = "";
  writing:boolean = false;
  conversation: Message[] = [];

  constructor(private yodaService:YodaService) { }

  ngOnInit() {
    this.newChat();
  }

  newChat() {
    this.yodaService.newChat()
  }

  send() {
    this.conversation.push(new Message("Me",this.message))
    console.log(this.conversation);
    this.writing = true;
    this.yodaService.chat(this.message).subscribe( response => {
      this.conversation.push(new Message("YodaBot",response));
      this.writing = false;
    });
    this.message = "";
  }

}
