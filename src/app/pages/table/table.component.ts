import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MqttService } from '../../__service/mqtt.service';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  subscribeData: any;
  displayedColumns: any;


  constructor(private mqttService: MqttService, private changeDetectorRefs: ChangeDetectorRef) {


  }



  ngOnInit() {
    this.displayedColumns = ['message', 'topic', 'publishedOn'];
    setInterval(() => {
      this.mqttService.getMqttData().subscribe((res: any) => {
        console.log(res);
        this.changeDetectorRefs.detectChanges();
        this.subscribeData = res;
      });
    }, 1800000);
  }



  public publicFormData = (form) => {
    console.log(form);
    this.mqttService.sendMqttData(form).subscribe((res: any) => {
      console.log(res);
    });
  }
}
