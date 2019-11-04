import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageTextTranslationComponent } from './image-text-translation.component';

describe('ImageTextTranslationComponent', () => {
  let component: ImageTextTranslationComponent;
  let fixture: ComponentFixture<ImageTextTranslationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageTextTranslationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageTextTranslationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
