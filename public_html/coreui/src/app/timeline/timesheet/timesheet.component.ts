import {Component, ViewChild, AfterViewInit} from "@angular/core";
import {DayPilot, DayPilotSchedulerComponent} from "daypilot-pro-angular";
import {DataService} from "./data.service";
import SchedulerPropsAndEvents = DayPilot.SchedulerPropsAndEvents;

@Component({
  selector: 'timesheet-component',
  template: `
    <div class="toolbar">
        Timesheet config:
        
    </div>
   
  `,
  styles: [`
      .toolbar {
          margin: 10px 0px;
          font-size: 14px;
          display: flex;
          align-items: center;
      }
      
      .toolbar-item {
          display: flex;
          align-items: center;
          margin-left: 5px;
      }
      
  `]
})
export class TimesheetComponent implements AfterViewInit {

  @ViewChild("timesheet", {static: false})
  timesheet: DayPilotSchedulerComponent;

  events: any[] = [];

  config: SchedulerPropsAndEvents = {
    locale: "en-us",
    timeHeaders: [
      {groupBy:"Hour"},
      {groupBy:"Cell", format:"mm"}
      ],
    scale: "CellDuration",
    cellDuration: 15,
    cellWidthSpec: "Auto",
    cellWidthMin: 20,
    eventHeight: 40,
    startDate: DayPilot.Date.today().firstDayOfMonth(),
    days: DayPilot.Date.today().daysInMonth(),
    viewType: "Days",
    showNonBusiness: true,
    businessWeekends: false,
    allowEventOverlap: true,
    rowHeaderColumns: [
      {title: "Date"},
      {title: "Day of week", width: 100},
    ],
    onBeforeRowHeaderRender: function (args) {
      args.row.columns[0].text = args.row.start.toString("dddd");
    },
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
    console.log(this.config)
    console.log(this.events)
  }

  ngAfterViewInit(): void {
    var from = this.timesheet.control.visibleStart();
    var to = this.timesheet.control.visibleEnd();
    this.ds.getEvents(from, to).subscribe(result => {
      this.events = result;
    });
    console.log(this.events)
  }

}

