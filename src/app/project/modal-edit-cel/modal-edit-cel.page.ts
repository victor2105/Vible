import { Component, OnInit, Input } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { Cel } from 'src/models/cel';
import { Group } from '../../../models/group';

@Component({
  selector: 'app-modal-edit-cel',
  templateUrl: './modal-edit-cel.page.html',
  styleUrls: ['./modal-edit-cel.page.scss'],
})
export class ModalEditCelPage implements OnInit {

  @Input() cel: Cel;
  @Input() index: number;
  @Input() group: Group;

  name;
  value;
  signal;

  constructor(public modalController: ModalController, public navParams: NavParams) {
    if(!this.cel) {
      this.cel = this.navParams.get("cel");
      this.index = this.navParams.get("index");
      this.group = this.navParams.get("group");
    }
    this.name = this.cel.name;
    if(this.cel.value < 0){
      this.value = this.cel.value * -1;
      this.signal = -1;
    }else{
      this.value = this.cel.value;
      this.signal = 1;
    }
  }

  ngOnInit() {
  }

  valueSignal(s){
    this.signal = s.detail.value;
    console.log(s);
  }

  save() {
    const cel = {name: this.name, value: this.signal * this.value};
    this.modalController.dismiss({cel: cel, group: this.group});
  }

  dismiss() {
    this.modalController.dismiss();
  }

  delete(){
    this.modalController.dismiss({delete: true, index: this.index, group: this.group});
  }

}
