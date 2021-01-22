import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable()

export class TimerService {

    getTimer(): Observable<number> {
        return new Observable(subscriber => {
            setInterval(() => {
                subscriber.next(1);
            }, 1000);
        });
    }

}
