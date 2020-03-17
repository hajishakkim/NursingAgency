import {Component, ViewChild, AfterViewInit, OnInit} from "@angular/core";
import {DayPilot, DayPilotSchedulerComponent} from "daypilot-pro-angular";
import {DataService} from "./data.service";
import SchedulerPropsAndEvents = DayPilot.SchedulerPropsAndEvents;
import * as $ from 'jquery';

declare function refreshSelectpicker(): void;

@Component({
  selector: 'app-sheduler',
  templateUrl: './sheduler.component.html',
  styleUrls: ['./sheduler.component.css']
})
export class ShedulerComponent implements AfterViewInit{

  @ViewChild("timesheet", {static: false})
  timesheet: DayPilotSchedulerComponent;

  events: any[] = [];
  resource : any[] = [];
  showPopUp : boolean = false;
  eventTitle : string;
  startTime : string;
  endTime : string;
  resourceId : string;
  eventId : string;
  viewType = "client";

  config: SchedulerPropsAndEvents = {
    locale: "en-us",
    timeHeaders: [
      {groupBy: 'Month'},
      {groupBy: 'Day', format: 'ddd M/d/yyyy'}
    ],
    scale: 'Day',
    startDate: DayPilot.Date.today().firstDayOfWeek(),
    days: DayPilot.Date.today().daysInMonth(),
    showNonBusiness: true,
    businessWeekends: false,
    allowEventOverlap: true,
    resources: this.resource,
    cellWidth: 120,
    height: 500,rowMinHeight : 60,

    timeRangeSelectedHandling: "Enabled",
    onTimeRangeSelected: args => {
      this.startTime =  args.start;
      this.endTime = args.end;
      this.resourceId = args.resource;
      this.eventTitle = "";
      this.eventId = DayPilot.guid();
      this.showPopUp = true;
      refreshSelectpicker();
    },
    onEventClick : (args : any) => {
      this.startTime =  args.e.data.start;
      this.endTime = args.e.data.end;
      this.resourceId = args.e.data.resource;
      this.eventTitle = args.e.data.text;
      this.eventId = DayPilot.guid();
      this.showPopUp = true;
      refreshSelectpicker();
    }
  };

  constructor(private ds: DataService) {
    
  }

  ngAfterViewInit(): void {
    this.renderEvent();
  }

  previous(): void {
    this.config.startDate = new DayPilot.Date(this.config.startDate).addDays(-7);
    this.config.days = this.config.startDate.daysInMonth();
  }

  today(): void {
    this.config.startDate = DayPilot.Date.today().firstDayOfMonth();
    this.config.days = this.config.startDate.daysInMonth();
  }

  next(): void {
    this.config.startDate = new DayPilot.Date(this.config.startDate).addDays(7);
    this.config.days = this.config.startDate.daysInMonth();
  }

  schedulerViewChanged(args) {
    if (args.visibleRangeChanged) {
      const from = this.timesheet.control.visibleStart();
      const to = this.timesheet.control.visibleEnd();
      this.ds.getEvents(from, to, this.viewType).subscribe(result => {
        this.events = result;
      });

      this.timesheet.control.update({resources: this.resource})
    }
  }

  addEvent()
  {
    const dp = this.timesheet.control;

    dp.events.add(new DayPilot.Event({
      start: this.startTime,
      end: this.endTime,
      id: this.eventId,
      resource: this.resourceId,
      text: this.eventTitle
    }));
    

    this.showPopUp = false;
  }

  onViewChage()
  {
    debugger;
    if(this.viewType == "client"){
      this.viewType = "resource";
    }else{
      this.viewType = "client";
    }

    this.renderEvent();
  }

  renderEvent()
  {
    var from = this.timesheet.control.visibleStart();
    var to = this.timesheet.control.visibleEnd();

    this.ds.getEvents(from, to, this.viewType).subscribe(result => {
      this.events = result;
    });

    this.ds.getResource(this.viewType).subscribe(result => {
      this.resource = result;
      refreshSelectpicker();
      this.timesheet.control.update({resources: this.resource})
    });
  }

}
