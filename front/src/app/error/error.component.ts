import {Component, Input} from "@angular/core";

@Component({
    selector: 'error',
    template: `<div #error id="error" [style.display]="hidden ? 'none':'block'">{{message}}</div>`,
    styles: [`#error{
        color: black;
        position: fixed;
        right: 2px;
        top: 2px;
        border: 2px black solid;
        background-color: #B24141;
        width: 300px;
        height: 100px;
        font-size: 15pt;
    }`],
})
export class ErrorComponent{
    @Input() message: string;
    @Input() hidden: boolean;
}