import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { MqttService } from '../../__service/mqtt.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {

  subscribeData: any;
  displayedColumns: any;
  lineChart: any;

  @ViewChild('tempChart', { static: false }) lineChartElement: ElementRef;

  constructor(private mqttService: MqttService, private changeDetectorRefs: ChangeDetectorRef) {


  }



  ngOnInit() {
    this.displayedColumns = ['message', 'topic', 'publishedOn'];
    setInterval(() => {
      this.mqttService.getMqttData().subscribe((res: any) => {
        console.log(res);
        this.changeDetectorRefs.detectChanges();
        this.subscribeData = res;
        this.lineChartData(res);
      });
    }, 1800000);


  }



  public publicFormData = (form) => {
    console.log(form);
    this.mqttService.sendMqttData(form).subscribe((res: any) => {
      console.log(res);
    });
  }

  public lineChartData = (data) => {
    console.log(data.temp);


    let dateSet = [];
    let timeSet = [];
    let tempSet = [];


    for (let i = 0; i < data.length; i++) {

      let dateCol = new Date(data[i].publishedOn);

      let dd = dateCol.getDate();
      let mm = dateCol.getUTCMonth();

      let hh = dateCol.getHours();
      let mi = dateCol.getMinutes();

      let tempDate = dd + '/' + mm;
      let tempTime = hh + ':' + mi;

      dateSet.push(tempDate);
      timeSet.push(tempTime);
      tempSet.push(parseFloat(data[i].temp).toFixed(2));
    }

    console.log(dateSet)
    console.log(timeSet)


    // Chart Value
    let ctx = this.lineChartElement.nativeElement;
    this.lineChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: timeSet,
        datasets: [{
          label: 'Temperature',
          data: tempSet,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                min: 28
                , max: 30
                , callback: function (val) {
                  if (val == 0 || val == 40) {
                    return null;
                  }
                  return Number.isInteger(val) ? val : null;
                }
              }
            }
          ]
        }
      }
    });
  }


}
