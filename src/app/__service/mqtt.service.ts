import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MqttService {

  constructor(private http: HttpClient) { }

  
  sendMqttData(a) {
    return this.http.post('https://cloud-data.herokuapp.com/publish', a);
  }

  getMqttData() {
    return this.http.get('https://cloud-data.herokuapp.com/subscribe');
  }


}
