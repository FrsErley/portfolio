import { Routes } from '@angular/router';
import { Presentation } from './presentation/presentation';
import { About } from './about/about';
import { Skills } from './skills/skills';
import { Contact } from './contact/contact';
import { Projects } from './projects/projects';
import { StartScreen } from './features/start-screen/start-screen';
import { MainLayout } from './layout/main-layout/main-layout';

export const routes: Routes = [
  {
    path: '',
    component: StartScreen,
  },
  {
    path: '',
    component: MainLayout,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'presentation' },
      { path: 'presentation', component: Presentation },
      { path: 'about', component: About },
      { path: 'skills', component: Skills },
      { path: 'projects', component: Projects },
      { path: 'contact', component: Contact },
    ],
  },
];
