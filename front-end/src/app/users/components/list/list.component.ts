import { Component, ElementRef, inject, model, OnInit, signal, ViewChild, viewChild } from '@angular/core';
import '@fortawesome/fontawesome-free/js/all.js';
import { forkJoin, Subscription } from 'rxjs';
import { ListService } from '../../services/list.service';
import { UserDetails } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DialogComponent } from '../../../shared/components/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-list',
  imports: [CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {

  allUsers:UserDetails[] = [];
  subscription = new Subscription();
  userdetails:any;
  router = inject(Router);
  readonly content = signal('Are you sure you want to accept the user friend request ?');
  readonly dialog = inject(MatDialog);

  constructor(private listservice:ListService){}

  ngOnInit(): void {
    this.getAllUserList();
    this.getUserDetails();
  }

  getAllUserList(){
    this.subscription.add(
      forkJoin([this.listservice.getUserList(),this.listservice.getUserStatus()]).subscribe({
        next:(value)=>{
          // console.log(value);
          const value2 = value[1];
          value[0].data?.map(s=> { const val = value2.data?.find(k=>(k.sender_id == s.id) || k.recieved_id == s.id); s.status = val?.status; s.sender_id = val?.sender_id; s.recieved_id = val?.recieved_id; return s;});
          this.allUsers = value[0].data;
         
        },error(err) {
          
        },
      })
    )
  }

  getText(status:number,sender_id:number,recieved_id:number):string{
    // 0 Not Send
    // 1 Send
    // 2 Send
    // 3 Approved
    // 4 Blocked
   
     if (status == 1 && (sender_id == this.userdetails.id)) return 'Send';
     else if (status == 0) return 'Not Send';
     else if (status == 1 && (recieved_id == this.userdetails.id)) return 'Recieved';
     else if(status == 2) return 'Accepted';
     else if(status == 3 && (sender_id == this.userdetails.id)) return 'Rejected';
     else if(status == 3 && (recieved_id == this.userdetails.id)) return 'Canceled';
     else  return''
  }

  getUserDetails(){
    this.userdetails =  JSON.parse(localStorage.getItem('loginData')||'');
  }

  openChat(id:number){
    this.router.navigate([`/user/chat/${id}`])
  }

  openModel(content:string){
 

     const dialogRef = this.dialog.open(DialogComponent, {
      data: {content: this.content(), successText: 'Accept',cancelText: 'Cancel'},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        // this.animal.set(result);
      }
    });
  }

}
