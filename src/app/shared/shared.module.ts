import {NgModule} from "@angular/core";

import {HeaderComponent} from "./components/header/header.component";
import {PanelComponent} from "./components/panel/panel.component";
import {WelcomeComponent} from "./components/welcome/welcome.component";
import {RouterLinkWithHref} from "@angular/router";
import {CommonModule} from "@angular/common";
import {CalendarComponent} from "./components/calendar/calendar.component";

@NgModule({
  declarations: [
    HeaderComponent,
    PanelComponent,
    WelcomeComponent,
    CalendarComponent
  ],
  imports: [
    CommonModule,
    RouterLinkWithHref
  ],
  exports: [
    HeaderComponent,
    PanelComponent,
    WelcomeComponent,
    CalendarComponent
  ]
})
export class SharedModule {}
