import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app'
import 'firebase/storage'
import * as config from '../../shared/config.json'
import { MatDialog } from '@angular/material/dialog';
import { AlertBoxComponent } from 'src/app/shared/alert-box/alert-box.component';
import { LoadingAnimServiceService } from 'src/app/shared/loading/loading-anim-service.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  appReference: firebase.app.App
  storageReference: firebase.storage.Reference

  constructor(
    private dialog: MatDialog,
    private loadingService: LoadingAnimServiceService
  ) {
    this.appReference = firebase.initializeApp(config.firebaseConfig, "study-boom-application")
    this.storageReference = this.appReference.storage().ref()

  }

  uploadFile(location: string, data: string, format: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this.loadingService.showLoading(true, "Uploading file...")
      const locationToSave = this.storageReference.child(location)
      const task = locationToSave.putString(data, format)
      task.on(firebase.storage.TaskEvent.STATE_CHANGED, (state: firebase.storage.UploadTaskSnapshot) => {
        const progress = Math.round((state.bytesTransferred / state.totalBytes) * 100);
        this.loadingService.progress = progress
        this.loadingService.text = "Uploaded"
      }, (error: Error) => {
        this.dialog.open(AlertBoxComponent, {
          minWidth: "25%",
          maxWidth: "60%",
          data: {
            type: "error",
            message: error.message
          }
        })
        reject(error.message)
      }, () => {
        this.loadingService.showLoading(false, null)
        task.snapshot.ref.getDownloadURL().then((url: string) => {
          resolve(url)
        })
      })
    })
  }
}
