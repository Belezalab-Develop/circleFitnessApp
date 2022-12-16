/* eslint-disable @typescript-eslint/naming-convention */
import { Component, Input, OnInit } from '@angular/core';
import { Directory, Filesystem} from '@capacitor/filesystem';
import { rejects } from 'assert';
import { HttpClient } from '@angular/common/http';





const CACHE_FOLDER = 'CACHED-IMG';

@Component({
  selector: 'app-cached-image',
  templateUrl: './cached-image.component.html',
  styleUrls: ['./cached-image.component.scss'],
})
export class CachedImageComponent implements OnInit {

  _src = '';
  // eslint-disable-next-line @typescript-eslint/member-ordering
  @Input() spinner = false;

  constructor() { }

  ngOnInit() { }


  // eslint-disable-next-line @typescript-eslint/member-ordering
  @Input()
  set src(imageUrl: string) {
    console.log('SET SOURCE:', imageUrl);

    const imageName = imageUrl.split('/').pop();
    const fileType = imageName.split('/').pop();

    Filesystem.readFile({
      directory: Directory.Cache,
      path: `${CACHE_FOLDER}/${imageName}`
    // eslint-disable-next-line @typescript-eslint/no-shadow
    }).then(readFile => {
      console.log('LOCAL FILE:', readFile);
       // eslint-disable-next-line no-underscore-dangle
       this._src =`data:image/${fileType};base64,${readFile.data}`;
    }).catch(async e=> {
      //Write the File
      await this.storeImage(imageUrl, imageName);
      Filesystem.readFile({
        directory: Directory.Cache,
        path: `${CACHE_FOLDER}/${imageName}`
      // eslint-disable-next-line @typescript-eslint/no-shadow
      }).then(readFile => {
        // eslint-disable-next-line no-underscore-dangle
        this._src =`data:image/${fileType};base64,${readFile.data}`;
      });

    });

  }

  async storeImage(url, path){
    const corsAnywhere = 'https://cors-anywhere.herokuapp.com/';
    const response = await fetch(url,{
      method: 'GET',
      mode: 'no-cors',
      headers: new Headers({
          'Content-Type': 'application/json',
          //'Access-Control-Allow-Origin': '*',
        }),
      });
    const blob = await response.blob();
    const base64Data = await this.convertBlobToBase64(blob) as string;

    const savedFile = await Filesystem.writeFile({
      path: `${CACHE_FOLDER}/${path},`,
      data: base64Data,
      directory: Directory.Cache

    });

    return savedFile;
  }


  async convertBlobToBase64(blob: Blob){
    return new Promise((resolve, reject)=>{
      const reader = new  FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);

    });
  }
}
