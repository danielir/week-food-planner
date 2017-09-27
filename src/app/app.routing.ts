import { Routes, RouterModule } from '@angular/router';
import { ShoppingListComponent } from './shopping-list.component';

const appRoutes = [
  { path: 'shopping-list', component: ShoppingListComponent }  
]

export const routing = RouterModule.forRoot(appRoutes);
