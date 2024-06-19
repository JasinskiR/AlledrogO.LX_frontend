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

export interface Chat {
  "id": "string";
  "chatsAsBuyer": string[];
  "chatsAsAdvertiser": string[];
}
