import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable()
export class Destroy implements OnDestroy {
  protected destroy$: Subject<any> = new Subject<any>();

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }
}
