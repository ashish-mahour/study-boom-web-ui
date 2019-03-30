import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-type',
  templateUrl: './user-type.component.html',
  styleUrls: ['./user-type.component.scss']
})
export class UserTypeComponent implements OnInit {
  
  loading: boolean = false;

  constructor(private titleService: Title) { 
    titleService.setTitle('User type - StudyBoom')
  }

  ngOnInit() {
  }

}
