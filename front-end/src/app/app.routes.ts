import { Routes } from '@angular/router';
import { AddComponent } from './web/components/add/add.component';
import { LoginComponent } from './web/components/login/login.component';
import { MainComponent } from './users/components/main/main.component';
import { logedIn, logout } from './web/guards/login.guard';
import { ListComponent } from './users/components/list/list.component';
import { ChatComponent } from './users/components/chat/chat.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [logedIn] },
  { path: 'add', component: AddComponent, canActivate: [logedIn] },
  {
    path: 'user',
    loadComponent:()=> import('../app/users/components/main/main.component').then(s=>s.MainComponent),
    canActivate: [logout],
    children: [
        {path: 'home', component:ListComponent},
        {path: 'chat/:id', component:ChatComponent},
    ],
  },
];
