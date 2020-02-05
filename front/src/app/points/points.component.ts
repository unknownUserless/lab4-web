import {
    AfterContentInit,
    AfterViewInit,
    Component,
    ElementRef,
    OnChanges,
    OnInit,
    SimpleChanges,
    ViewChild
} from '@angular/core';
import {HttpService} from "../services/http.service";
import {Point} from "./point";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

declare var redraw: any;
declare var listener: any;

@Component({
    selector: 'points-comp',
    templateUrl: './points.component.html',
    styleUrls: ['./points.component.css']
})


export class PointsComponent implements AfterViewInit {

    numbers: string[] = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "-", "Backspace", ","];

    error: { message: string, hidden: boolean } = {message: "", hidden: true};

    @ViewChild('canvas', {static: false}) myCanvas: ElementRef;
    context;

    @ViewChild('yinp', {static: false}) yinp: ElementRef;
    @ViewChild('yerror', {static: false}) yerror: ElementRef;

    x: number;
    y: number = 0;
    r: number = 2;
    points: Point[] = [];

    constructor(private hs: HttpService, private as: AuthService, private router: Router) {

    }

    ngAfterViewInit(): void {
        this.context = (<HTMLCanvasElement>this.myCanvas.nativeElement).getContext('2d');
        (async () => {
            let resp = await this.hs.getData("/points", true);
            if (resp.auth == "failed") {
                this.router.navigate(['']);
            } else {
                this.points = [];
                for (let point of resp) {
                    this.points.push(point);
                }
                this.draw();
            }
        })();


    }

    draw() {
        new redraw(this.context, this.r, this.points);
    }

    check() {

        let mes = "";

        let val = this.yinp.nativeElement.value.replace(",", ".");

        if (isNaN(val) || val == "") {
            mes += "Y-координата должна быть числом";
        } else {
            if (val > -5 && val < 5) {
            } else {
                mes += "Y-координата должна быть в диапозоне (-5 ... 5)";
            }
        }

        if (mes != "") {
            mes += "\n";
        }

        if (this.x == undefined) {
            mes += "Необходимо указать координату X";
        }

        if (mes != "") {
            mes += "\n";
        }

        if (this.r == undefined) {
            mes += "Необходимо указать радиус";
        }

        this.error.message = mes;
        this.error.hidden = mes == "";

        if (mes != "") {
            return;
        } else {
            this.y = val;
            this.postPoint(this.x, this.y, this.r);
        }

    }

    selectX(event) {
        this.x = event.target.value;
    }

    selectR(event) {
        this.r = event.target.value;
        this.draw();
    }

    keypress(e) {
        if (!this.numbers.includes(e.key)) {
            e.preventDefault();
        }
    }

    async postPoint(x, y, r) {
        let resp = await this.hs.postData("/points",
            JSON.stringify({x: x, y: y, r: r}), true);
        if (resp.auth == "failed") {

            alert("Для доступа к этому ресурсу необходимо авторизоваться");
            this.router.navigate(['']);

        } else {
            this.points.push(resp);
            this.draw();
        }
    }

    listener(e) {

        if (this.r == undefined) {
            this.error.message = "Необходимо указать радиус";
            this.error.hidden = false;
        } else {
            this.error.hidden = true;
            let res = new listener(e, this.myCanvas.nativeElement);
            this.postPoint(res.x, res.y, this.r);
        }
    }

    back() {
        this.as.removeToken();
        this.router.navigate(['']);
    }

    /*    keyup(e){
            let val = this.yinp.nativeElement.value.replace(",", ".");

            if (isNaN(val)){
                this.yerror.nativeElement.innerHTML="Y-координата должна быть числом";
                return false;
            } else {
                if (val > -5 && val < 5){
                    this.yerror.nativeElement.innerHTML="";
                    return true;
                } else {
                    this.yerror.nativeElement.innerHTML="Y-координата должна быть в диапозоне (-5 ... 5)";
                    return false;
                }
            }
        }*/

    /*    validateY(){

            let val = this.yinp.nativeElement.value.replace(",", ".");

            if (isNaN(val)){
                this.yerror.nativeElement.innerHTML="Y-координата должна быть числом";
                return false;
            } else {
                if (val > -5 && val < 5){
                    this.yerror.nativeElement.innerHTML="";
                    return true;
                } else {
                    this.yerror.nativeElement.innerHTML="Y-координата должна быть в диапозоне (-5 ... 5)";
                    return false;
                }
            }
        }*/

}