import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'megaphotogallery';
  isLoading = false;
  isAuthenticated: boolean;
  previousUrl: string;
  currentUser: any;
  isRootPage: any;
  permissionObject: any = [];
  isLoader = false;
  reauthenticate: any;
  refretoken: any;
  constructor(public translate: TranslateService) {
    translate.addLangs(['en', 'ch']);
    this.translate.use('en');
  }

  ngOnInit(): void {

  }


}
