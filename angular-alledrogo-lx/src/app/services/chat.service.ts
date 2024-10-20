import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Chat, ChatHistory, Message, UserRole} from "../models/chat";
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private baseUrl = `${environment.backendUrl}/api/ChatUser`;
  private connection: HubConnection | null = null;

  constructor(private http: HttpClient) { }

  getChats(): Observable<Chat> {
    return this.http.get<Chat>(`${this.baseUrl}/info`);
  }

  createChat(recieverId: string): Observable<string> {
    console.log("Author id" + recieverId);
    return this.http.post<string>(`${this.baseUrl}/chats`, { recieverId });
  }

  getChatHistory(chatId: string): Observable<ChatHistory> {
    return this.http.get<ChatHistory>(`${this.baseUrl}/chats/${chatId}`);
  }

  connectToChat(chatId: string, token: string, onMessageReceived: (message: Message) => void): Promise<void> {
    this.connection = new HubConnectionBuilder()
      .withUrl(`${environment.backendUrl}/chat?chatId=${chatId}`, {
        accessTokenFactory: () => token
      })
      .configureLogging(LogLevel.Information)
      .build();

    this.connection.on('ReceiveMessage', onMessageReceived);

    return this.connection.start()
      .then(() => console.log('SignalR Connected.'))
      .catch(err => {
        console.error(err);
        setTimeout(() => this.connectToChat(chatId, token, onMessageReceived), 5000);
      });
  }

  sendMessage(chatId: string, content: string, token: string): Observable<any> {
    const message = { content };
    return this.http.patch(`${this.baseUrl}/chats/${chatId}`, message, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  // disconnectFromChat(): void {
  //   if (this.connection) {
  //     this.connection.stop().then(() => console.log('SignalR Disconnected.'));
  //   }
  // }
}
