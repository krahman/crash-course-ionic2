import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { PeopleProvider } from '../../providers/people/people';
import { DetailPage } from '../../pages/detail/detail';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public people = [];
  public shouldReorder = false;

  constructor(
    public navCtrl: NavController,
    public service: PeopleProvider,
    public modalCtrl: ModalController
  ) {
    this.service.getPeople()
      .subscribe(
        data => this.people = data.results
      )
  }

  toggleReorder() {
    this.shouldReorder = !this.shouldReorder;
  }

  doRefresh(e) {
    this.service.getPeople()
      .subscribe(
        data => this.people.unshift(...data.results),
          error => console.log(error),
            () => e.complete()
      )
  }

  doInfinite(e) {
    this.service.getPeople()
      .subscribe(
        data => this.people.push(...data.results),
          error => console.log(error),
            () => e.complete()
      )
  }

  pushPage(user) {
    // this.modalCtrl.create(DetailPage, user).present();
    this.navCtrl.push(DetailPage, user);
  }
}
