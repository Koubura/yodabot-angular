import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CookieService } from 'angular2-cookie';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class YodaService {
  
    private host:string = environment.baseApiUrl;
    private sessionToken:string = "";
    subjectHistory = new Subject<any>();
  
    constructor(private http:HttpClient,
                private cookieService: CookieService) { }
  
    public getHost() {
      return this.host;
    }

    public getHistoryAsObservable() {
        return this.subjectHistory.asObservable();
    }

    newChat() {
        if(this.cookieService.get('sessionToken')!=null) {
            this.getHistory();
        } else {
            this.openNewChat();
        }
    }

    getHistory() {
        this.sessionToken = this.cookieService.get('sessionToken');
        this.http.post<any>(`${this.host}/conversation/history`, {sessionToken: this.sessionToken} ).subscribe( response => {
            this.subjectHistory.next(response);
        });
    }

    openNewChat() {
        this.http.get<any>(`${this.host}/conversation`).subscribe( response => {
            this.sessionToken = response['sessionToken'];
            this.cookieService.put('sessionToken',response['sessionToken'])
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