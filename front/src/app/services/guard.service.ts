import {Injectable} from "@angular/core";
import {HttpService} from "./http.service";
import {CanActivate, Router} from "@angular/router";

@Injectable()
export class GuardService implements CanActivate {

    constructor(private hs: HttpService, private router: Router) {

    }

    async canActivate(): Promise<boolean> {

        let data = await this.hs.getData("/auth", true);

        if (data.auth == "successful") {
            return true;
        } else if (data.auth == "failed") {
            alert("Для доступа к этому ресурсу необходимо авторизоваться");
            this.router.navigate(["/"]);
            return false;
        }
    }


}