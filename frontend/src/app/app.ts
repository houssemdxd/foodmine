import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './component/partials/header/header';
import { Loading } from './component/partials/loading/loading';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Loading],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend');
}
