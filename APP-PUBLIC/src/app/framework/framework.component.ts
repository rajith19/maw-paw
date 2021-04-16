import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
@Component({
  selector: 'app-framework',
  templateUrl: './framework.component.html',
  styleUrls: ['./framework.component.css'],
  providers: [MessageService]

})
export class FrameworkComponent implements OnInit {


  results: string[];

  eventsQuery : string;

  data: any[] = [
    { label: 'Berlin', value: 'Berlin' },
    { label: 'Frankfurt', value: 'Frankfurt' },
    { label: 'Hamburg', value: 'Hamburg' },
    { label: 'Munich', value: 'Munich' }
  ]
  constructor(private messageService: MessageService, private primengConfig: PrimeNGConfig) { }

  public pet : string = "";

  ngOnInit(): void {
    this.primengConfig.ripple = true;

  }

  search(event) {
    console.log(event.query);
    this.eventsQuery = event.query
    this.results = this.data.map(e => {
      return e.label
    });
    console.log(this.results);
  }


  showInfo() {
    this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Under Maintenance' });
  }
  clear() {
    this.messageService.clear();
  }

  public searchPet(pet): void {
    console.log("pet",pet);
   
  }


}
