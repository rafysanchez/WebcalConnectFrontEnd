import { Component, Input, ElementRef } from '@angular/core';

export type ButtonType = 'submit' | 'button';

@Component({
    selector: 'wc-button',
    templateUrl: './wc-button.component.html',
    styleUrls: ['./style.scss']
})
export class WCButtonComponent {

    public _isDisabled = false;
    private _originalLabel = 'Submit';
    public _label = 'Submit';
    private _workingLabel = 'Working...';
    public _style = 'btn btn-primary';
    public _buttonType: ButtonType = 'submit';
    private _domElement: Element;

    constructor(private _elementRef: ElementRef) {
        this._domElement = _elementRef.nativeElement;
        this._style = 'btn btn-primary';
    }

    @Input()
    public set style(value: string) {
        this._style = value;
    }

    @Input()
    public set buttonType(value: ButtonType) {
        this._buttonType = value;
    }

    @Input()
    public set label(value: string) {
        this._originalLabel = this._label = value;
    }

    @Input()
    public set workingLabel(value: string) {
        this._workingLabel = value;
    }

    @Input()
    public set isDisabled(value: boolean) {
        this._isDisabled = value;

        let button: Element = this._domElement.querySelector('button');
        if (value) {
            button.setAttribute('disabled', 'disabled');
            this._label = this._workingLabel;
        } else {
            button.removeAttribute('disabled');
            this._label = this._originalLabel;
        }
    }
}
