import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'ngx-ngx-classed',
  standalone: true,
  imports: [],
  templateUrl: './ngx-classed.component.html',
  styleUrl: './ngx-classed.component.css',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxClassedComponent {}
