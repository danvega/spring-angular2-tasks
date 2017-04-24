import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import 'rxjs/Rx';

@Injectable()
export class TaskService {
    constructor(private http: Http) {
    }
    getTasks(){
        return this.http.get('http://localhost:8080/tasks')
            .map(
                (response: Response) => {
                    return response.json();
                }
            );
    }
}