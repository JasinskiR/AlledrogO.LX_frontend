import {Component, OnDestroy, OnInit} from '@angular/core';
import {ChatService} from "../../services/chat.service";
import {ActivatedRoute} from "@angular/router";
import {CommonModule, NgClass} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {Chat, ChatUser, Message} from "../../models/chat";

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    CommonModule,
    NgClass,
    FormsModule
  ],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  chats!: Chat;
  buyerChats: ChatUser[] = [];
  advertiserChats: ChatUser[] = [];
  selectedChatId: string | null = null;
  messages: Message[] = [];
  newMessage: string = '';
  myRole: string = '';
  token: string = '';
  userId: string = '';

  constructor(
    private chatService: ChatService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParams['token'] || localStorage.getItem('accessToken');
    this.loadChats();
  }

  loadChats() {
    this.chatService.getChats().subscribe(
      (chats) => {
        console.log("Chats:", chats); // Log the chats
        this.chats = chats;
        this.groupChats();
      },
      (error) => {
        console.error("Error loading chats:", error);
      }
    );
  }
  groupChats() {
    if (!this.chats || typeof this.chats !== 'object') {
      console.error("Expected an object with chat arrays, but got:", this.chats);
      return;
    }
    this.buyerChats = this.chats.chatsAsBuyer;
    this.advertiserChats = this.chats.chatsAsAdvertiser;
    this.userId = this.chats.id;
  }


  // ngOnDestroy(): void {
  //   this.chatService.disconnectFromChat();
  // }

  selectChat(chatId: string) {
    this.selectedChatId = chatId;
    this.loadChatHistory(chatId);
    this.chatService.connectToChat(chatId, this.token, (message: Message) => {
      this.messages.push(message); // Update messages in real-time
    }).catch(err => console.error('Error connecting to chat:', err));
  }

  loadChatHistory(chatId: string) {
    this.chatService.getChatHistory(chatId).subscribe(chatHistory => {
      console.log("MSG:", chatHistory);
      this.messages = chatHistory.messages;
      console.log("MSG:", this.messages);
      this.myRole = chatHistory.buyerId === this.userId ? "buyer" : "seller"; // Assuming `this.myId` is set correctly
    });
  }

  sendMessage(): void {
    if (this.selectedChatId && this.newMessage) {
      this.chatService.sendMessage(this.selectedChatId, this.newMessage, this.token).subscribe(() => {
        this.newMessage = '';
      }, (error) => {
        console.error('Error sending message:', error);
      });
    }
  }
}
