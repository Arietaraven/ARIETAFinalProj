import { Component } from '@angular/core';
import { BackEndService } from '../back-end.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private backEndService:BackEndService) {}
  
  ngOnInit(): void {

  }

  onsave() {
    this.backEndService.saveData();
  }
  onfetch(){
    this.backEndService.fetchData();
  }
}
