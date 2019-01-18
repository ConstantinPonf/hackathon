import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public img_source = 'LogoFooter.png';
  public img_ua = 'UA.png';
  public img_ubt = 'UBT.png';
  public img_tum = 'TUM.png';

  public constructor(private titleService: Title) {
    this.setTitle();
  }

  public setTitle() {
    this.titleService.setTitle('Fair Pay');
  }
}
