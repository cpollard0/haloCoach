import { provideRouter, RouterConfig } from '@angular/router';


import {Home} from './components/home/home';
import {SeasonDropdown} from './components/metadata/season-dropdown/season-dropdown'
import {ArenaStats} from './components/stats/service-record/arena-stats'

const routes: RouterConfig = [
  { path: '', redirectTo: 'home', terminal: true },
  { path: 'home', component: Home },
  {path: 'arena-stats', component: ArenaStats},
  {path: 'season-dropdown', component: SeasonDropdown}

];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
