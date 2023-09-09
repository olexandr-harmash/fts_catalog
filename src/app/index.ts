import config from '../../config';
import { App as IApp } from '../interfaces/app'
import App from './app';
import Command from './command';

let app: IApp;

if (process.argv.length > 2) {
    app = new Command(config);
} else {
    app = new App(config);
}

export default app;

// Launch app
app.Init().catch(error => console.error(error));