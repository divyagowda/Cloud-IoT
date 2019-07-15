import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { MqttService } from '../../__service/mqtt.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  subscribeData: any;
  displayedColumns: any;
  lineChart: any;
  lineChart2: any;
  barChart: any;

  @ViewChild('tempChart', { static: false }) lineChartElement: ElementRef;
  @ViewChild('humidChart', { static: false }) humidChartElement: ElementRef;
  @ViewChild('weightChart', { static: false }) weightChartElement: ElementRef;

  constructor(private mqttService: MqttService, private changeDetectorRefs: ChangeDetectorRef) {

  }



  ngOnInit() {
    this.displayedColumns = ['temp', 'humid', 'weight', 'publishedOn'];
    this.mqttService.getMqttData().subscribe((res: any) => {
      console.log(res);
      this.changeDetectorRefs.detectChanges();
      this.subscribeData = res;
      this.lineChartData(res);
      this.barChartData(res);
      this.lineChartData2(res);
    });
   this.refresh();


  }

  public refresh = () => {
    setInterval(() => {
      this.mqttService.getMqttData().subscribe((res: any) => {
        console.log(res);
        this.changeDetectorRefs.detectChanges();
        this.subscribeData = res;
        this.lineChartData(res);
        this.barChartData(res);
        this.lineChartData2(res);

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
    let humidSet = [];


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
      humidSet.push(parseFloat(data[i].humid).toFixed(2));
    }

    console.log(dateSet)
    console.log(timeSet)
    console.log(humidSet)


    // Chart Value
    let ctx = this.lineChartElement.nativeElement;
    this.lineChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: timeSet,
        datasets: [
          {
          label: 'Temperature',
          data: tempSet,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }
      ]
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                min: 28
                , max: 32
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

  public lineChartData2 = (data) => {
    console.log(data.temp);


    let dateSet = [];
    let timeSet = [];
    let humidSet = [];


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
      humidSet.push(parseFloat(data[i].humid).toFixed(2));
    }

    console.log(dateSet)
    console.log(timeSet)
    console.log(humidSet)


    // Chart Value
    let ctx = this.humidChartElement.nativeElement;
    this.lineChart2 = new Chart(ctx, {
      type: 'line',
      data: {
        labels: timeSet,
        datasets: [{
          label: 'Humid',
          data: humidSet,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }
      ]
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                min: 65
                , max: 70
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


  public barChartData = (data) => {
    console.log(data.temp);


    let dateSet = [];
    let timeSet = [];    
    let weightSet = [];


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
      weightSet.push(parseFloat(data[i].weight).toFixed(2));
    }



    // Chart Value
    let ctx = this.weightChartElement.nativeElement;
    this.barChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: timeSet,
        datasets: [
          {
          label: 'Weight',
          data: weightSet,
          backgroundColor: 'rgba(153, 102, 255, 0.2)',
          borderColor: 'rgba(153, 102, 255, 1)',
          borderWidth: 1
        }
      ]
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                min: 0
                , max: 400
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
