import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Platform } from '@ionic/angular';
import { Project } from '../models/project';
import { Home } from '../models/home';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private nativeStorage: NativeStorage,
    private platform: Platform,
    private storage: Storage) {
    
    this.android = this.platform.is('android');
    this.ios = this.platform.is("ios");

    this.platform.ready().then(() => {
      this.platReady = true;
    });
}

  android = false;
  ios = false;
  platReady = false;


  async get(key){
    if(this.android || this.ios){
      return await this.nativeStorage.getItem(key);
    }else{
      return await this.storage.get(key);
    }
  }

  async getHome() {
    console.log("Init");
    let home: Home = new Home();
    
    if(this.android || this.ios){
      const keys = await this.nativeStorage.keys()
      for(let i=0;i<keys.length;i++){
        const value = await this.nativeStorage.getItem(keys[i]);          
        let p: Project = JSON.parse(value);
        p.key = keys[i];
        console.log(p);
        home.push(p);
      }
    }else{
      await this.storage.ready()
      const keys = await this.storage.keys()
      for(let i=0;i<keys.length;i++){
        const value = await this.storage.get(keys[i]);
        let p: Project = JSON.parse(value);
        p.key = keys[i];
        console.log(p);
        home.push(p);
      }
    }
    return home;
  }

  async set(key, value){
    if(this.android || this.ios){
      await this.saveIntoNative(key, value);
    }else{
      await this.storage.set(key, value);
    }
  }

  async delete(key){
    if(this.android || this.ios){
      await this.nativeStorage.remove(key);
    }else{
      await this.storage.remove(key);
    }
  }

  async getFromNative(key){
    if(this.platReady){
      return await this.nativeStorage.getItem(key);
    }
    // await this.platform.ready();
    this.platReady = true;
    return await this.nativeStorage.getItem(key);
  }

  async saveIntoNative(key, value) {
    if(this.platReady){
      return await this.nativeStorage.setItem(key, value);
    }
    //await this.platform.ready();
    this.platReady = true;
    return await this.nativeStorage.setItem(key, value);
  }
}
