import {Injectable} from "@angular/core";
import {Observable, observable} from "rxjs";
import {DayPilot} from "daypilot-pro-angular";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  events: any[] = [
    {
      id: 1,
      start: DayPilot.Date.today().addHours(9),
      end: DayPilot.Date.today().addHours(11),
      resource : "rr1",
      text: "1pm -5pm Client 1"
    },
    {
      id: 2,
      start: DayPilot.Date.today().addHours(12),
      end: DayPilot.Date.today().addHours(15),
      resource : "rr2",
      text: "1pm -5pm Client 2"
    }
  ];

  resource : any[] = [
    {id:"rr1", name: "Shyju"},
    {id:"rr2", name: "Ajeesh"},
    {id:"rr3", name: "Ajo"},
    {id: "rr4", name: "Hajis"}
  ];

  constructor(private http : HttpClient){
  }

  getEvents(from: DayPilot.Date, to: DayPilot.Date): Observable<any[]> {

    // simulating an HTTP request
    return new Observable(observer => {
      setTimeout(() => {
        observer.next(this.events);
      }, 200);
    });

    // return this.http.get("/api/events?from=" + from.toString() + "&to=" + to.toString());
  }

  getResource() : Observable<any[]> {
    return new Observable(ob => {
      setTimeout(() => {
        ob.next(this.resource);
      }, 200);
    })
  }


}
