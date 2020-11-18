import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import * as Cookies from 'js-cookie';

@Injectable({
    providedIn: 'root'
})
export class YodaService {
  
    private host:string = environment.baseApiUrl;
    private sessionToken:string = "";
    subjectHistory = new Subject<any>();
  
    constructor(private http:HttpClient) { }
  
    public getHost() {
      return this.host;
    }

    public getHistoryAsObservable() {
        return this.subjectHistory.asObservable();
    }

    newChat() {
        if(Cookies.get('sessionToken')!=null) {
            this.getHistory();
        } else {
            this.openNewChat();
        }
    }

    getHistory() {
        this.sessionToken = Cookies.get('sessionToken');
        this.http.post<any>(`${this.host}/conversation/history`, {sessionToken: this.sessionToken} ).subscribe( response => {
            this.subjectHistory.next(response);
        });
    }

    openNewChat() {
        this.http.get<any>(`${this.host}/conversation`).subscribe( response => {
            this.sessionToken = response['sessionToken'];

            var date = new Date();
            //add 60 minutes to date
            date.setTime(date.getTime() + (60 * 60 * 1000));
            Cookies.set('sessionToken',response['sessionToken'], { expires: 1 })
        });
    }

    chat(message:string) {
        return this.http.post<any>(`${this.host}/conversation/message`, { message: message, sessionToken: this.sessionToken });
    }

    starWarsCharacters() {
        return this.http.get<any>(`${this.host}/conversation/people`);
    }

    starWarsFilms() {
        return this.http.get<any>(`${this.host}/conversation/films`);
    }
  
}