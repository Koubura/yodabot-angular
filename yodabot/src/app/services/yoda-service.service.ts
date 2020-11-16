import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class YodaService {
  
    private host:string = environment.baseApiUrl;
    private sessionToken:string = "";
    private sessionId:string = "";
  
    constructor(private http:HttpClient) { }
  
    public getHost() {
      return this.host;
    }

    newChat() {
        this.http.get<any>(`${this.host}/conversation`).subscribe( response => {
            console.log(response);
            this.sessionToken = response['sessionToken'];
            this.sessionId = response['sessionId'];
        });
    }

    chat(message:string) {
        return this.http.post<any>(`${this.host}/conversation/message`, { message: message, sessionToken: this.sessionToken });
    }
  
}