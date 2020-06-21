import {Component, ViewChild, AfterViewInit, OnInit} from "@angular/core";
import {DayPilot, DayPilotSchedulerComponent} from "daypilot-pro-angular";
import {DataService} from "./data.service";
import SchedulerPropsAndEvents = DayPilot.SchedulerPropsAndEvents;

import { ApiService } from '../../services/api.service';
import { EventModel } from './event.model';
import {environment} from '../../../environments/environment';

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
  curesponse : any[];
  showPopUp : boolean = false;
  eventTitle : string;
  startTime : string;
  endTime : string;
  resourceId : string;
  curesponseId : string;
  eventId : string;
  comment : string;
  isUpdateEvent : boolean;
  viewType = "client";
  resourceTitle = "Client";
  curesponseTitle = "Resource";
  settings = {
        bigBanner: true,
        timePicker: true,
        format: 'yyyy-mm-dd hh:mm',
        defaultOpen: false,
    };

  public resourceFilter : any[];
  
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
      this.resourceId = args.resource;
      this.eventTitle = "";
      this.eventId = DayPilot.guid();
      this.isUpdateEvent = false;
      this.showPopUp = true;
      refreshSelectpicker();
    },
    onEventClick : (args : any) => {
      this.startTime =  args.e.data.start;
      this.endTime = args.e.data.end;
      this.resourceId =  args.e.data.resource;
      this.curesponseId = args.e.data.curesponse;
      this.eventTitle = args.e.data.text;
      this.eventId = args.e.id();
      this.comment = args.e.data.comment;
      this.isUpdateEvent = true;
      this.showPopUp = true;
      refreshSelectpicker();
    },
    onRowFilter: args => {
      let visibility = this.resourceFilter.indexOf(args.row.value);
      args.visible = (visibility > -1 ) ? true : false;
    },
  };

  constructor(private ds: DataService, private apiService : ApiService) {
    
  }

  ngAfterViewInit(): void {
    this.renderEvent();
    //$("div:contains(DEMO)")[5].css('dispaly','none');
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
        this.timesheet.control.update({resources: this.resource});
        this.events = result;
      });
    }
  }

  addEvent()
  {
    const dp = this.timesheet.control;

    if(!this.eventTitle){
      this.createEventTitle();
    }

    let url = 'timesheet.php/';
    let client = (this.viewType == 'client' ) ? this.resourceId : this.curesponseId;
    let candidate = (this.viewType == 'client' ) ? this.curesponseId : this.resourceId;
    let postData = new EventModel(
      this.eventTitle, 
      this.startTime, 
      this.endTime, 
      client, 
      candidate,
      this.comment
    );

    this.apiService.post(url, postData).subscribe(result => {
      console.log('id' + result);
      this.eventId = result;
    });

    dp.events.add(new DayPilot.Event({
      start: this.formateDate(this.startTime),
      end: this.formateDate(this.endTime),
      id: this.eventId,
      resource: this.resourceId,
      text: this.eventTitle
    }));
    
    var e = dp.events.find(this.eventId);
    e.data.curesponse = this.curesponseId;
    e.data.comment    = this.comment;
    dp.events.update(e);

    this.showPopUp = false;
  }

  updateEvent()
  {
    const dp      = this.timesheet.control;
    var e         = dp.events.find(this.eventId);
    e.data.text   = this.eventTitle;
    e.data.start  = this.formateDate(this.startTime);
    e.data.end    = this.formateDate(this.endTime);
    e.data.resource   = this.resourceId;
    e.data.curesponse = this.curesponseId;
    e.data.comment    = this.comment;
    
    dp.events.update(e);
    this.showPopUp = false;

    let url = 'timesheet.php/';
    let client = (this.viewType == 'client' ) ? this.resourceId : this.curesponseId;
    let candidate = (this.viewType == 'client' ) ? this.curesponseId : this.resourceId;
    let postData = new EventModel(
      this.eventTitle, 
      this.startTime, 
      this.endTime, 
      client, 
      candidate,
      this.comment,
      this.eventId
    );

    this.apiService.put(url, postData).subscribe(result => {
      console.log('id' + result);
    });
  }

  onViewChage()
  {
    if(this.viewType == "client"){
      this.viewType = "resource";
      this.resourceTitle = "Resource";
      this.curesponseTitle = "Client";
    }else{
      this.viewType = "client";
      this.resourceTitle = "Client";
      this.curesponseTitle = "Resource";
    }

    this.renderEvent();
  }

  renderEvent()
  {
    var from = this.timesheet.control.visibleStart();
    var to = this.timesheet.control.visibleEnd(); 
    let url = environment.APIUrl + '/timesheet.php/resource?viewType=' + this.viewType;

    this.ds.getResource(this.viewType).subscribe(result => {
      this.resource = result['resource'];
      this.curesponse = result['curesponse'];

      this.ds.getEvents(from, to, this.viewType).subscribe(result => {
        let self:any = this;
        let data =  result.map((value) => {
          let startDateObj = self.formateDate(value['start']);
          let endDateObj  = self.formateDate(value['end']);
          value['start']  = startDateObj;
          value['end']    = endDateObj;
  
          return value;
        });
  
        this.events = data;

        refreshSelectpicker();
        this.timesheet.control.update({resources: this.resource});
      });
    });
  }

  resourceFilterChange(ev): void {
    this.timesheet.control.rows.filter({});
  }

  onSelectAll() {
    const selected = this.resource.map(item => item.id);
    this.resourceFilter = selected;
  }

  onClearAll() {
    this.resourceFilter = [];
  }

  formateDate(date)  {
    const dateObj = new Date(date);
    var DaydateObj = new DayPilot.Date(dateObj);
    return DaydateObj;
  }

  createEventTitle() {
    const startDateObj = new Date(this.startTime);
    const endtDateObj = new Date(this.endTime);
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    };

    const start = new Intl.DateTimeFormat('en-US', options).format(startDateObj);
    const end = new Intl.DateTimeFormat('en-US', options).format(startDateObj);
    const curesponseId = this.curesponseId;
    const SelectedCuresponse = this.curesponse.filter(function(item) {
          return item.id == curesponseId;
        });

    this.eventTitle = start + '-' + end + ' ' + SelectedCuresponse['0']['name'];
  }

}
