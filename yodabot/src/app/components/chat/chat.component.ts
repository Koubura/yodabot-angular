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
  conversation:Message[] = [];
  noResultsCounter:number = 0;

  constructor(private yodaService:YodaService) { }

  ngOnInit() {
    this.newChat();
  }

  newChat() {
    this.yodaService.getHistoryAsObservable().subscribe( h => {
      h.forEach(element => {
        if(element.user == "user") {
          this.conversation.push(new Message("Me",element.message));
        } else this.conversation.push(new Message("YodaBot",element.message));
      });
    });
    this.yodaService.newChat();
  }

  send() {
    this.conversation.push(new Message("Me",this.message))
    console.log(this.conversation);
    this.writing = true;
    this.yodaService.chat(this.message).subscribe( response => {
      if(this.checkNotResults(response.flags)) this.starWarsCharacters();
      this.conversation.push(new Message("YodaBot",response.message));
      this.writing = false;
    });
    this.message = "";
  }

  checkNotResults(flags) {
    var noResults = false;
    flags.foreach(element => {
      if(element == "no-results") {
        this.noResultsCounter++;
        noResults = true;
      }
    });
    if(!noResults) this.noResultsCounter = 0;

    return this.noResultsCounter >= 2;
  }

  starWarsCharacters() {
    this.yodaService.starWarsCharacters().subscribe( response => {
      console.log(response);
    });
  }

}
