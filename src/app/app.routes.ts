import { provideRouter, RouterConfig } from '@angular/router';


import {Home} from './components/home/home';
import {SeasonDropdown} from './components/metadata/season-dropdown/season-dropdown'
import {ArenaStats} from './components/stats/service-record/arena-stats'
import {MatchEvents} from './components/stats/matchData.Arena/match-events'
import {WhatsYourBoard} from './components/stats/WhatsYourBoard/WhatsYourBoard'

const routes: RouterConfig = [
  { path: '', redirectTo: 'home', terminal: true },
  { path: 'home', component: Home },
  {path: 'arena-stats', component: ArenaStats},
  {path: 'season-dropdown', component: SeasonDropdown},
  {path: 'match-events', component: MatchEvents},
  {path: 'whats-your-board', component: WhatsYourBoard}

];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
