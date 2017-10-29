import { Routes, RouterModule } from '@angular/router';
import { ShoppingListComponent } from './components/shopping-list/shopping-list.component';
import { HomeComponent } from './home/home.component';

const appRoutes = [
  { path: '', pathMatch: 'full', component: HomeComponent},
  { path: 'shopping-list', component: ShoppingListComponent },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }  
]

export const routing = RouterModule.forRoot(appRoutes);
