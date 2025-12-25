import { Component, inject, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat',
  imports: [CommonModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit {

  chatService = inject(ChatService);
  subscription = new Subscription();
  activateRoute = inject(ActivatedRoute);
  router = inject(Router);
  allChats:any [] = [];

  userId =JSON.parse(localStorage.getItem('loginData')||'');

  constructor(){
    this.activateRoute.params.subscribe({
      next:(value)=>{
        const id =value['id'] as number;
        console.log(value)
        this.getConversationData(Number(id))
      },
    })
  }

  ngOnInit(): void {
    
  }

  getConversationData(senderId:number){
    this.subscription.add(
      this.chatService.getConversation(senderId).subscribe({
        next:(value)=>{
          this.allChats = value?.data;
        },
      })
    )
  }

  back(){
    this.router.navigateByUrl('/user/home')
  }


}
