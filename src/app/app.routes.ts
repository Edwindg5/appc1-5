import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'create-product', component: CreateProductComponent, canActivate: [AuthGuard] },
  { path: 'register-user', component: RegisterUserComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'login' },
];
