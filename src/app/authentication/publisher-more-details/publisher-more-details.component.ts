import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { LoadingAnimServiceService } from "src/app/shared/loading/loading-anim-service.service";
import { MatDialog } from "@angular/material/dialog";
import { AlertBoxComponent } from "src/app/shared/alert-box/alert-box.component";
import { AuthenticationService } from "src/app/services/authentication/authentication.service";
import * as config from "src/app/shared/config.json";
import { TranslateService } from "@ngx-translate/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-publisher-more-details",
  templateUrl: "./publisher-more-details.component.html",
  styleUrls: ["./publisher-more-details.component.scss"]
})
export class PublisherMoreDetailsComponent implements OnInit {
  publisherId: number;
  publisherMoreDetails: FormGroup = this.formBuilder.group({
    mobileNo: [null, [Validators.required, Validators.pattern("[0-9]{10}")]],
    bankName: [null, [Validators.required, Validators.pattern("[a-zA-Z ]+")]],
    branchName: [null, [Validators.required, Validators.pattern("[a-zA-Z ]+")]],
    accountNo: [null, [Validators.required, Validators.pattern("[0-9]+")]],
    ifscCode: [
      null,
      [Validators.required, Validators.pattern("[a-zA-Z]+[0-9]+")]
    ]
  });

  constructor(
    private loadingService: LoadingAnimServiceService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private authenticationService: AuthenticationService,
    private tranlateService: TranslateService,
    private activateRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.activateRoute.queryParams.subscribe((params: any) => {
      this.publisherId = params.id;
    });
  }

  skipTheStepAction() {
    this.dialog.open(AlertBoxComponent, {
      minWidth: "25%",
      maxWidth: "60%",
      data: {
        type: "warn",
        message:
          "All the details is nessasary for transfer of money! Skipping the step means you can enter it later for money transfer purpuses!!"
      }
    });
  }

  saveDetails() {
    let publisherAllDetails: any = this.publisherMoreDetails.value;
    this.authenticationService.mofifiedUserDetails = publisherAllDetails
    this.tranlateService
      .get("userTypes.publisher")
      .subscribe(
        (translation: string) =>
          (this.authenticationService.mofifiedUserDetails.type = translation)
      );
    this.authenticationService.mofifiedUserDetails.id = this.publisherId;
    this.authenticationService.modifyUsers(
      config.modifiedCommands.addPublisherDetail
    );
    this.router.navigateByUrl("/home")
  }
}
