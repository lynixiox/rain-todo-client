import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { NgxsModule } from '@ngxs/store';
import { TodoState } from './ngxs/state/todo-state';
import { ModalState } from './ngxs/state/modal-state';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgIconsModule, provideIcons } from '@ng-icons/core';
import {heroXMark} from "@ng-icons/heroicons/outline"
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideClientHydration(), 
    provideHttpClient(withFetch()),
     provideIcons({heroXMark}),
      importProvidersFrom(
        NgxsModule.forRoot([TodoState, ModalState]), 
        NgxsReduxDevtoolsPluginModule.forRoot())]
};
