import { Component, OnInit, Input } from '@angular/core';
import { LoadingService } from 'src/app/servicios/loading.service';

@Component({
  selector: 'loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.sass']
})
export class LoadingComponent implements OnInit {

  mostrar:boolean = false;
  constructor(
    private loadingService:LoadingService
  ) { }

  ngOnInit() {
    this.loadingService.change.subscribe(show => {
      this.mostrar = show;
    });
  }

}
