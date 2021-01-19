import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnDestroy,
  OnInit,
  ViewChild
} from "@angular/core";
import { MatCalendar } from "@angular/material/datepicker";
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MatDateFormats
} from "@angular/material/core";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

import { CalendarService } from "./calendar-service";

@Component({
  selector: "example-header",
  styles: [
    `
      .example-header {
        display: flex;
        align-items: center;
        padding: 0.5em;
      }

      .example-header-label {
        flex: 1;
        height: 1em;
        font-weight: 500;
        text-align: center;
      }

      .example-double-arrow .mat-icon {
        margin: -22%;
      }
    `
  ],
  template: `
    <div class="example-header">
      <span class="example-header-label">{{ periodLabel }}</span>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleHeader<D> implements OnDestroy {
  private _destroyed = new Subject<void>();
  // @ViewChild('picker', {static: false}) picker: ElementRef;

  constructor(
    private calendarService: CalendarService,
    private _calendar: MatCalendar<D>,
    private _dateAdapter: DateAdapter<D>,
    @Inject(MAT_DATE_FORMATS) private _dateFormats: MatDateFormats,
    cdr: ChangeDetectorRef
  ) {
    _calendar.stateChanges
      .pipe(takeUntil(this._destroyed))
      .subscribe(() => cdr.markForCheck());
  }

  ngOnDestroy() {
    this._destroyed.next();
    this._destroyed.complete();
  }

  get periodLabel() {
    return this._dateAdapter
      .format(
        this._calendar.activeDate,
        this._dateFormats.display.monthYearLabel
      )
      .toLocaleUpperCase();
  }
}
