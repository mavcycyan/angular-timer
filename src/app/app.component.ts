import {Component} from '@angular/core';
import {TimerService} from './timer.service';
import {Subscription} from 'rxjs/index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{

    constructor(private timerService: TimerService) {}
    timer = 0;
    time = {
        hours: 0,
        minutes: 0,
        seconds: 0
    };
    timerSub: Subscription;

    doubleTimer = 0;

    isStarted: false;

    startTimer(): void {
        const timerStream$ = this.timerService.getTimer();

        this.timerSub = timerStream$.subscribe(value => {
              this.timer += value;
              this.timeForming(this.timer);
        });
    }

    stopTimer(): void {
        if (this.timerSub) {
            this.timerSub.unsubscribe();
        }
        this.timer = 0;
        this.timeForming(0);
    }

    waitTimer(): void {
        let interval;
        if (this.doubleTimer === 0) {
            interval = setInterval(() => {
                  this.doubleTimer += 1;
                  if (this.doubleTimer === 300) {
                      clearInterval(interval);
                      this.doubleTimer = 0;
                  }
            }, 1);
        } else {
            clearInterval(interval);
            if (this.timerSub) {
                this.timerSub.unsubscribe();
            }
            this.isStarted = false;
        }
    }

    resetTimer(): void {
        this.timer = 0;
        this.timeForming(this.timer);
    }

    timeForming(timer): void {
        this.time.hours = Math.floor(timer / 3600);
        this.time.minutes = Math.floor(timer / 60) - (this.time.hours * 60);
        this.time.seconds = timer - (this.time.hours * 3600) - (this.time.minutes * 60);
    }
}
