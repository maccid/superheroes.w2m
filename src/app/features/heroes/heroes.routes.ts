import { Routes } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';
    
export const routes: Routes = [{
    path: '',
    children: [
        {
            path: '',
            component: IndexComponent
        },
       /* 
        {
            path: 'edit/:id',
            component: EditComponent
        }*/
    ]
}];



