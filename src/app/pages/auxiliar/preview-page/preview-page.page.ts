import { PopoverController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-preview-page',
  templateUrl: './preview-page.page.html',
  styleUrls: ['./preview-page.page.scss'],
})
export class PreviewPagePage implements OnInit {
  previews = [];
  constructor(
    private popoverCtrl: PopoverController,
  ) {
    this.previews = JSON.parse(sessionStorage.getItem('previews'));
  }

  ngOnInit() {
  }

  bytesToSize(bytes) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    for (const size of sizes) {
      if (bytes <= 1024) {
        return bytes + '' + size;
      } else {
        bytes = parseFloat(String(bytes / 1024)).toFixed(2);
      }
    }
  }

  getIcon(type: string) {
    if (type.startsWith('image')) {
      return 'image-outline';
    }
    else if (type.startsWith('video')) {
      return 'videocam-outline';
    }
    else if (type.startsWith('audio')) {
      return 'musical-note-outline';
    }
    else {
      return 'document-outline';
    }

  }

  send(){
    sessionStorage.setItem('send', 'true');

    this.popoverCtrl.dismiss();
  }

}
