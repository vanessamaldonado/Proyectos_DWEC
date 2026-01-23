import { Routes } from '@angular/router';
import { Page1 } from './pages/page1/page1';
import { Page2 } from './pages/page2/page2';
import { App } from './app';

export const routes: Routes = [
    {path:'page1', component:Page1},
    {path:'page2',component:Page2}
];
