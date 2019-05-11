import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-alert-box',
  templateUrl: './alert-box.component.html',
  styleUrls: ['./alert-box.component.scss']
})
export class AlertBoxComponent implements OnInit {

  type: string;
  message: string;
  routerLinkArray: any[];
  dialogYesNo: boolean;
  dialogNoYes: boolean;

  constructor(private dialogRef: MatDialogRef<AlertBoxComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any) {
    this.type = data.type;
    this.message = data.message;
    this.routerLinkArray = data.routerLinkArray;
    this.dialogNoYes = data.dialogNoYes;
    this.dialogYesNo = data.dialogYesNo;
  }

  ngOnInit() {
  }
}
