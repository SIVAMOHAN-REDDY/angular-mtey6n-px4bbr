import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild
} from "@angular/core";

import { CalendarService } from "./calendar-service";
import { ExampleHeader } from "./calender-header";

/** @title Datepicker with custom calendar header */
@Component({
  selector: "datepicker-custom-header-example",
  templateUrl: "datepicker-custom-header-example.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CalendarService]
})
export class DatepickerCustomHeaderExample implements OnInit {
  @ViewChild("picker", { static: false }) picker;
  exampleHeader = ExampleHeader;

  constructor(private calendarService: CalendarService) {}

  ngOnInit() {}
}

/**  Copyright 2019 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */
