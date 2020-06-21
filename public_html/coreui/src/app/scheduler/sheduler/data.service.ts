import {Injectable} from "@angular/core";
import {Observable, observable} from "rxjs";
import {DayPilot} from "daypilot-pro-angular";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from '../../../environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http : HttpClient){
  }

  getEvents(from, to, viewType = "resource") {
    var url = environment.APIUrl + '/timesheet.php/events?viewType=' + viewType + "&from=" + from.toString() + "&to=" + to.toString();

    return this.http.get<any[]>(url).pipe(
      tap(resData => {
        console.log(resData);
      })
    );
  }

  getResource(viewType = "resource") {
    var url = environment.APIUrl + '/timesheet.php/resource?viewType=' + viewType;

    return this.http.get<any[]>(url).pipe(
      tap(resData => {
        console.log(resData);
      })
    );
  }
}
