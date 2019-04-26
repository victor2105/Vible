import { Component, OnInit } from '@angular/core';
import { PopoverController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss'],
})
export class OptionsComponent implements OnInit {
  options = [];
  constructor(
    public popoverController: PopoverController, public navParams: NavParams
  ) {
    this.options = this.navParams.get("options");
  }

  ngOnInit() {}

  select(index) {
    this.popoverController.dismiss(this.options[index]);
  }

  dismiss(){
    this.popoverController.dismiss();
  }

}
