import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './core/config/app.config';
import { Root } from './core/root/root';

bootstrapApplication(Root, appConfig).catch((err) => console.error(err));
