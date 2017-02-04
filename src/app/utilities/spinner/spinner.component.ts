import { Component, Input } from '@angular/core';

@Component({
    selector: 'wc-spinner',
    templateUrl: './spinner.component.html',
    styleUrls: ['./spinner.scss']
})
export class SpinnerComponent {
    private isDelayedRunning = false;

    @Input()
    public set isRunning(value: boolean) {
        this.isDelayedRunning = value;
    }
}
