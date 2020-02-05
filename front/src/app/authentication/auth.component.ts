import {AfterViewInit, Component, ElementRef, Host, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {User} from "../user";
import {HttpService} from "../services/http.service";
import {ErrorComponent} from "../error/error.component";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Component({
    selector: 'auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css'],
})


export class AuthComponent implements OnInit {

    logged: boolean = false;
    error: { message: string, hidden: boolean } = {message: "", hidden: true};

    constructor(private hs: HttpService, private as: AuthService, private router: Router) {

    }

    ngOnInit(): void {
        this.logged = this.as.getToken() != "";
    }


    login(login: string, password: string) {
        this.send(login, password, "login");
    }

    register(login: string, password: string) {
        this.send(login, password, "registration");
    }

    private async send(login: string, password: string, type: string) {

        if (login == undefined || password == undefined){
            this.error.message="Поля логина и пароля не могут быть пустыми";
            this.error.hidden=false;
            return;
        } else {
            let log = login.split(" ").join("");
            let pass = password.split(" ").join("");

            if (log == "" || pass == ""){
                this.error.message="Логин или пароль не может состоять только из пробелов";
                this.error.hidden=false;
                return;
            } else {
                this.error.hidden=true;
            }
        }


        let data = {login: login, password: password, type: type};

        let resp = await this.hs.postData("/users", JSON.stringify(data), false);

        if (resp.error) {
            this.error.message = resp.message;
            this.error.hidden = false;
        } else {
            this.error.hidden = true;
            alert(resp.message);
            this.as.setToken(resp.token);
            this.router.navigate(['/main']);
        }

    }

    exit() {
        this.as.removeToken();
        this.logged = false;
    }


}
