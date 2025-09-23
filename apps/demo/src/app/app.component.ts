import { Component, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { classed } from 'ngx-classed';
@Component({
  standalone: true,
  imports: [RouterModule, FormsModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  host: {
    class: 'text',
  },
})
export class AppComponent {
  title = 'demo';

  variant = model<string>();

  size = model<boolean>();

  test = classed()
    .var(
      {
        default: 'text-yellow-400',
        danger: 'text-red-500',
        primary: 'text-blue-400',
      },
      () => this.variant()
    )
    .iif(
      {
        true: 'text-7xl border border-black',
        false: 'text-sm',
      },
      () => this.size()
    )
    .toSignal();
}
