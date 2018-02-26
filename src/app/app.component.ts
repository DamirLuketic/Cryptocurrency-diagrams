import {Component, OnDestroy, OnInit } from '@angular/core';
import {CryptoDataService} from './shared/services/crypto-data.service';
import {FormBuilder, Validators} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';
import {Subject} from 'rxjs/Subject';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  public cryptoData = null;
  public currentData = [];
  private cryptoDataSubscribe: Subscription = null;
  private currentDataSubscribe: Subscription = null;
  public compareCurrency: string = null;
  private startDateSubject = new Subject();
  private endDateSubject = new Subject();
  private startDate = null;
  private endDate = null;

  constructor(
      private cryptoDataService: CryptoDataService,
      private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
     this.startDateSubject.subscribe(
     (data) => { this.startDate = data; }
     );
     this.endDateSubject.subscribe(
         (data) => { this.endDate = data; }
     );
    if (this.cryptoDataService.cryptoData == null) {
        this.cryptoDataSubscribe = this.cryptoDataService.getCryptoData().subscribe(
            (data) => {
              const dataRecived = data['Data'];
              const dataArray = [];
              for (const c in dataRecived) {
                const object = [];
                object['id'] = dataRecived[c].Id;
                object['name'] = dataRecived[c].Name;
                object['img'] = dataRecived[c].ImageUrl;
                dataArray.push(object);
              }
                this.cryptoDataService.cryptoData = dataArray;
                this.cryptoData = this.cryptoDataService.cryptoData;
            },
            (error) => { console.log(error); }
        );
    } else {
      this.cryptoData = this.cryptoDataService.cryptoData;
    }
  }

  public cryptoForm = this.formBuilder.group({
      cryptoSelect: ['', Validators.required],
      compare: ['', Validators.required],
      dateStart: ['', Validators.required],
      dateEnd: ['', Validators.required]
  });

  currentDate() {
      return new Date().toISOString().slice(0, 10);
  }

  addDays(currentDate, addDays = 1) {
      const date = new Date(currentDate);
      date.setDate(date.getDate() + addDays);
      return date;
  }

  getDates(startDate, endDate) {
      const dates = [];
      let currentDate = startDate;
      while (currentDate <= endDate) {
          dates.push(currentDate);
          currentDate = this.addDays(currentDate);
      }
      return dates;
  }

  submitForm() {
      this.currentData = [];
      const formData = this.cryptoForm.value;
      this.compareCurrency = formData.compare;
      const currency = formData.cryptoSelect;
      const dateStart = new Date(formData.dateStart);
      const dateEnd = new Date(formData.dateEnd);
      const dates = this.getDates(dateStart, dateEnd);
      for (const d of dates) {
          this.currentDataSubscribe = this.cryptoDataService.getDailyData(currency, this.compareCurrency, (d.getTime() / 1000)).subscribe(
              (data) => {
                  this.currentData.push([d.toLocaleDateString('en-US'), data[currency][this.compareCurrency].toFixed(2)]);
              }
          );
      }
  }

  ngOnDestroy() {
    if (this.cryptoDataSubscribe != null) {
      this.cryptoDataSubscribe.unsubscribe();
    }
    if (this.currentDataSubscribe != null) {
        this.currentDataSubscribe.unsubscribe();
    }
  }
}
