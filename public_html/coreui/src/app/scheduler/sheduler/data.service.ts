import {Injectable} from "@angular/core";
import {Observable, observable} from "rxjs";
import {DayPilot} from "daypilot-pro-angular";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  ResourceEvents: any[] = [
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

  ClientEvents: any[] = [
    {
      id: 1,
      start: DayPilot.Date.today().addHours(9),
      end: DayPilot.Date.today().addHours(11),
      resource : "c1",
      text: "1pm -5pm Shyju"
    },
    {
      id: 2,
      start: DayPilot.Date.today().addHours(12),
      end: DayPilot.Date.today().addHours(15),
      resource : "c2",
      text: "1pm -5pm Ajeesh"
    }
  ];

  resource : any[] = [
    {id:"rr1", name: "Shyju"},
    {id:"rr2", name: "Ajeesh"},
    {id:"rr3", name: "Ajo"},
    {id: "rr4", name: "Hajis"}
  ];

  clients : any[] = [
    {id:"c1", name: "careBee 1"},
    {id:"c2", name: "careBee 2"},
    {id:"c4", name: "careBee 3"},
  ]

  constructor(private http : HttpClient){
  }

  getEvents(from: DayPilot.Date, to: DayPilot.Date, viewType = "resource"): Observable<any[]> {

    // simulating an HTTP request
    return new Observable(observer => {
      setTimeout(() => {
        if(viewType == "resource"){
          observer.next(this.ResourceEvents);
        }else{
          observer.next(this.ClientEvents);
        }
      }, 200);
    });

    // return this.http.get("/api/events?from=" + from.toString() + "&to=" + to.toString());
  }

  getResource(viewType = "resource") : Observable<any[]> {
    return new Observable(ob => {
      setTimeout(() => {
        if(viewType == "resource"){
          ob.next(this.resource);
        }else{
          ob.next(this.clients);
        }
      }, 200);
    })
  }


}
