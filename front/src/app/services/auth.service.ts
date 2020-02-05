import {Injectable} from "@angular/core";

@Injectable()
export class AuthService{

    setToken(token: string){
        if (token == null){
            token = "";
        }
        localStorage.setItem("token", token);
    }

    getToken(){
        let token = localStorage.getItem("token");
        if (token == null){
            token = "";
        }
        return token;
    }

    removeToken(){
        localStorage.removeItem("token");
    }

}