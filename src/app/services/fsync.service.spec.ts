import { TestBed } from '@angular/core/testing';

import { FsyncService } from './fsync.service';

describe('FsyncService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FsyncService = TestBed.get(FsyncService);
    expect(service).toBeTruthy();
  });
});
