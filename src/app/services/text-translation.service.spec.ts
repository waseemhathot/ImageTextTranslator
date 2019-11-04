import { TestBed } from '@angular/core/testing';

import { TextTranslationService } from './text-translation.service';

describe('TextTranslationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TextTranslationService = TestBed.get(TextTranslationService);
    expect(service).toBeTruthy();
  });
});
