import { Component, forwardRef, HostListener, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { KEY_CODE } from '../../enum/key-code.enum';

@Component({
  selector: 'app-future-month-selector',
  templateUrl: './future-month-selector.component.html',
  styleUrls: ['./future-month-selector.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FutureMonthSelectorComponent),
      multi: true
    }
  ]
})
export class FutureMonthSelectorComponent implements OnInit, ControlValueAccessor {
  @Input() label: string = '';
  month: string = '';
  year: number = 0;

  private date: Date;

  constructor() {}

  ngOnInit(): void {
    this.date = new Date();
    this.date.setMonth(this.date.getMonth() + 1);

    this.setDates();
  }

  changeNextMonth(): void {
    this.date.setMonth(this.date.getMonth() + 1);

    this.setDates();
  }

  changePreviousMonth(): void {
    if (this.monthDiffFromNow(this.date) > 1) {
      this.date.setMonth(this.date.getMonth() - 1);

      this.setDates();
    }
  }

  writeValue(): void {}

  propagateChange = (x: any) => {};
  propagateTouched = () => {};

  registerOnChange(fn): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn): void {
    this.propagateTouched = fn;
  }

  @HostListener('window:keyup', ['$event'])
  onKeyEvent({ key }: KeyboardEvent, element = 'future-month-selector'): void {
    const focusedElement: HTMLCollectionOf<Element> = document.activeElement.getElementsByClassName(element);

    if(focusedElement.length){
      switch (key) {
        case KEY_CODE.RIGHT_ARROW:
          this.changeNextMonth();
          break;

        case KEY_CODE.LEFT_ARROW:
          this.changePreviousMonth();
          break;

        default:
          break;
      }
    }
  }

  private monthDiffFromNow(dateTo: Date): number {
    const dateFrom = new Date();
    return dateTo.getMonth() - dateFrom.getMonth() + 12 * (dateTo.getFullYear() - dateFrom.getFullYear());
  }

  private setDates(): void {
    this.month = this.date.toLocaleDateString('en', { month: 'long' });
    this.year = this.date.getFullYear();

    this.propagateChange({
      date: this.date,
      monthDiff: this.monthDiffFromNow(this.date)
    });
    this.propagateTouched();
  }
}
