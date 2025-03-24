import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GabineteJuridicoComponent } from './gabinete-juridico.component';

describe('GabineteJuridicoComponent', () => {
  let component: GabineteJuridicoComponent;
  let fixture: ComponentFixture<GabineteJuridicoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GabineteJuridicoComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GabineteJuridicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
