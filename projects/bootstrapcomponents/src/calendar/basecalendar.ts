import { Renderer2, ChangeDetectorRef, Inject, Input, Directive, EventEmitter, Output } from '@angular/core';
import { ServoyBootstrapBasefield } from '../bts_basefield';
import { DateTimeAdapter } from '@danielmoncada/angular-datetime-picker';
import { DOCUMENT } from '@angular/common';
import { getFirstDayOfWeek, ServoyPublicService } from '@servoy/public';
import { DateTime } from 'luxon';

@Directive()
export class ServoyBootstrapBaseCalendar extends ServoyBootstrapBasefield<HTMLDivElement> {

    @Input() disabledDays: number[];
    @Output() disabledDaysChange = new EventEmitter();

    @Input() disabledDates: Date[];
    @Output() disabledDatesChange = new EventEmitter();

    public filter: any;
    public min: Date;
    public max: Date;


    public firstDayOfWeek = 1;
    public hour12Timer = false;

    constructor(renderer: Renderer2, cdRef: ChangeDetectorRef,
            servoyService: ServoyPublicService,
            dateTimeAdapter: DateTimeAdapter<any>, @Inject(DOCUMENT) doc: Document) {
        super(renderer, cdRef, doc);
        dateTimeAdapter.setLocale(servoyService.getLocale());
        this.firstDayOfWeek = getFirstDayOfWeek(servoyService.getLocale());
        const lts = DateTime.now().setLocale(servoyService.getLocale()).toLocaleString(DateTime.DATETIME_FULL).toUpperCase();
        this.hour12Timer = lts.indexOf('AM') >= 0 || lts.indexOf('PM') >= 0;

    }

    public svyOnInit() {
        super.svyOnInit();
        this.filter = this.disabledDays || this.disabledDays ? this.filterImpl : null;
    }

    public disableDays(dateArray: number[]) {
        this.disabledDays = dateArray;
        this.disabledDaysChange.emit(dateArray);
        this.filter = this.disabledDays || this.disabledDays ? this.filterImpl : null;
        this.cdRef.detectChanges();
    }

    public disableDates(dateArray: Date[]) {
        this.disabledDates = dateArray;
        this.disabledDatesChange.emit(dateArray);
        this.filter = this.disabledDates || this.disabledDates ? this.filterImpl : null;

        this.cdRef.detectChanges();
    }

    public setMinMaxDate(minDate: Date, maxDate: Date) {
        if (minDate) this.min = minDate;
        if (maxDate) this.max = maxDate;
    }

    private filterImpl = (d: Date): boolean => {
        let result = true;
        if (this.disabledDates) {
            this.disabledDates.forEach(el => {
                const year = d.getUTCFullYear().toString();
                const month = d.getUTCMonth().toString();
                const day = d.getUTCDate() + 1;
                if (el.getUTCFullYear().toString() === year &&
                    el.getUTCMonth().toString() === month &&
                    el.getUTCDate() === day) {
                    result = false;
                }
            });
        }
        if (result && this.disabledDays) {
            let weekday = DateTime.fromJSDate(d).weekday; // 1 == monday, 7 == sunday
            if (weekday === 7) weekday = 0;
            result = !this.disabledDays.includes(weekday);
        }
        return result;
    };
}
