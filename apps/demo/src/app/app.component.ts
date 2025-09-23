import { Component, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { classed } from 'ngx-classed';

type VARIANT_TYPES =
  | 'default'
  | 'secondary'
  | 'destructive'
  | 'outline'
  | 'ghost'
  | 'link'
  | 'icon'
  | 'with-icon'
  | 'loading';

type SIZE_TYPES = 'sm' | 'md' | 'lg' | 'xl' | 'none';

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

  buttonClasses = classed(`
  inline-flex items-center justify-center gap-1.5
 text-base font-semibold
   rounded-md border border-solid
   relative cursor-pointer
   transition-colors duration-200
    `)
    .var(
      {
        default: `
        border-slate-900 bg-slate-900 text-slate-50 text-red-400
     hover:border-slate-800 hover:bg-slate-600
     focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2
      `,
        secondary: `
          border-slate-200 bg-slate-100 text-slate-900
     hover:border-slate-300 hover:bg-slate-200
     focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2
      `,
        destructive: `
     border-red-500 bg-red-500 text-white
     hover:border-red-600 hover:bg-red-600
     focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2
      `,
      },
      () => this.variant()
    )
    .toSignal();

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
