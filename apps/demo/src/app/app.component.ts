import { Component, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  ButtonComponent,
  SIZE_TYPES,
  VARIANT_TYPES,
} from '../button.component';

@Component({
  standalone: true,
  imports: [RouterModule, FormsModule, ButtonComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  host: {
    class: 'text',
  },
})
export class AppComponent {
  title = 'demo';

  variant = model<VARIANT_TYPES>('default');
  size = model<SIZE_TYPES>('md');
  icon = model(false);
  loading = model(false);
}
