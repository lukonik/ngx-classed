import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxClassedComponent } from './ngx-classed.component';

describe('NgxClassedComponent', () => {
  let component: NgxClassedComponent;
  let fixture: ComponentFixture<NgxClassedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxClassedComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NgxClassedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
