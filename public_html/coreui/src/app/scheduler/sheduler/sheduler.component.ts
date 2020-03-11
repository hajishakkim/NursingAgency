import {Component, ViewChild, AfterViewInit} from "@angular/core";
import {DayPilot, DayPilotSchedulerComponent} from "daypilot-pro-angular";
import {DataService} from "./data.service";
import SchedulerPropsAndEvents = DayPilot.SchedulerPropsAndEvents;

@Component({
  selector: 'app-sheduler',
  templateUrl: './sheduler.component.html',
  styleUrls: ['./sheduler.component.css']
})
export class ShedulerComponent implements AfterViewInit {

  @ViewChild("timesheet", {static: false})
  timesheet: DayPilotSchedulerComponent;

  events: any[] = [];
  resource : any[] = [];

  config: SchedulerPropsAndEvents = {
    locale: "en-us",
    timeHeaders: [{groupBy: 'Month'}, {groupBy: 'Day', format: 'd'}],
    scale: 'Day',
    startDate: DayPilot.Date.today().firstDayOfMonth(),
    days: DayPilot.Date.today().daysInMonth(),
    showNonBusiness: true,
    businessWeekends: false,
    allowEventOverlap: true,
    resources: this.resource,
    cellWidth: 120,
    height: 500,rowMinHeight : 60,

    timeRangeSelectedHandling: "Enabled",
    onTimeRangeSelected: args => {
      const dp = this.timesheet.control;
      DayPilot.Modal.prompt("Create a new event:", "Event 1").then(modal => {
        dp.clearSelection();
        if (!modal.result) { return; }
        dp.events.add(new DayPilot.Event({
          start: args.start,
          end: args.end,
          id: DayPilot.guid(),
          resource: args.resource,
          text: modal.result
        }));
      });
    },
  };

  constructor(private ds: DataService) {
    
  }

  ngAfterViewInit(): void {
    var from = this.timesheet.control.visibleStart();
    var to = this.timesheet.control.visibleEnd();

    this.ds.getEvents(from, to).subscribe(result => {
      this.events = result;
    });

    this.ds.getResource().subscribe(result => {
      this.timesheet.control.update({resources: result})
    });
  }

}
