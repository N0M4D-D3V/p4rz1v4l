import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SharedService {
    public isSaved$ = new Subject<boolean>();
    public nameBot$ = new Subject<string>();
}