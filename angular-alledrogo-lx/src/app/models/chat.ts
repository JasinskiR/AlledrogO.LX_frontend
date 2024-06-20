export interface Message {
  createdAt: string;
  content: string;
  sentByBuyer: boolean;
}

export interface ChatHistory {
  chatId: string;
  advertiserId: string;
  buyerId: string;
  messages: Message[];
}

export interface UserRole {
  id: string;
}

export interface ChatUser {
  chatId: string;
  recieverEmail: string;
}

export interface Chat {
  id: string;
  email: string,
  chatsAsBuyer: ChatUser[];
  chatsAsAdvertiser: ChatUser[];
}
