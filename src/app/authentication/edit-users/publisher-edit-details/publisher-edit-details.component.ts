import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-publisher-edit-details',
  templateUrl: './publisher-edit-details.component.html',
  styleUrls: ['./publisher-edit-details.component.scss']
})
export class PublisherEditDetailsComponent implements OnInit {

  userType: string = 'PUBLISHER';
  
  constructor() { }

  ngOnInit() {
  }

}
