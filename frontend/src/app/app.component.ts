import { Component } from '@angular/core';
import { UserService, User } from './services/user.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  username = '';
  age: number | null = null;
  users: User[] = [];
  editingUser: User | null = null;

  constructor(private userService: UserService) {
    this.fetchUsers();
  }

  fetchUsers() {
    this.userService.getUsers().subscribe((data) => (this.users = data));
  }

  submitUser() {
    const newUser: User = { username: this.username, age: this.age! };

    if (this.editingUser) {
      this.userService.updateUser(this.editingUser._id!, newUser).subscribe(() => {
        this.editingUser = null;
        this.username = '';
        this.age = null;
        this.fetchUsers();
      });
    } else {
      this.userService.addUser(newUser).subscribe(() => {
        this.username = '';
        this.age = null;
        this.fetchUsers();
      });
    }
  }

  editUser(user: User) {
    this.editingUser = user;
    this.username = user.username;
    this.age = user.age;
  }

  deleteUser(id: string) {
    this.userService.deleteUser(id).subscribe(() => this.fetchUsers());
  }
}
