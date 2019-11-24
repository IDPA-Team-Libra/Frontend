import { TestBed } from '@angular/core/testing';

import { StockprofilehandlerService } from './stockprofilehandler.service';

describe('StockprofilehandlerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StockprofilehandlerService = TestBed.get(StockprofilehandlerService);
    expect(service).toBeTruthy();
  });
});
