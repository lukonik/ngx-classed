import { Component, model } from '@angular/core';
import { RouterModule } from '@angular/router';
import { classed } from 'ngx-classed';
import { FormsModule } from '@angular/forms';
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

  test = classed('text-blue-50 border border-gray-300')
    .var(
      {
        primary: 'text-red-500',
      },
      () => this.variant()
    )
    .toSignal();
}
