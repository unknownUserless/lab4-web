import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from "./auth.service";

@Injectable()
export class HttpService {

    private serverUrl = "/api";

    constructor(private http: HttpClient, private as: AuthService) {
    }

    async postData(path: string, data: string, token: boolean): Promise<any> {
        let ret;
        if (token) {
            ret = await this.http.post(this.serverUrl + path, data, this.options()).toPromise();
        } else {
            ret = await this.http.post(this.serverUrl + path, data).toPromise();
        }
        return ret;
    }

    async getData(path: string, token: boolean): Promise<any> {
        let ret;
        if (token) {
            ret = await this.http.get(this.serverUrl + path, this.options()).toPromise();
        } else {
            ret = await this.http.get(this.serverUrl + path).toPromise();
        }
        return ret;
    }

    private options(): any {
        let headers = new HttpHeaders();
        headers = headers.set("token", this.as.getToken());
        return {headers: headers};
    }


}