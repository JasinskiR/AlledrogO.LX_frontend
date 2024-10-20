import { CommonModule, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../services/chat.service';
import { ActivatedRoute } from '@angular/router';
import { Chat } from '../../models/chat';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule,
    NgClass,
    FormsModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})

export class UserListComponent {
  allUsers: Chat[] = [];

  constructor(
    private chatService: ChatService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.chatService.getAllUsers().subscribe(
      (users) => {
        console.log("Users:", users); // Log the users
        this.allUsers = users;
      },
      (error) => {
        console.error("Error loading users:", error);
      }
    );
  }
}