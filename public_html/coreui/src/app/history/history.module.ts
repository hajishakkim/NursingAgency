import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoryListComponent } from './history-list/history-list.component';
import { HistoryRoutingModule } from './history-routing.module';



@NgModule({
  declarations: [HistoryListComponent],
  imports: [
    CommonModule,
    HistoryRoutingModule
  ]
})
export class HistoryModule { }
