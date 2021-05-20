import { Renderer2, ChangeDetectorRef, Inject } from '@angular/core';
import { Moment } from 'moment';
import { ServoyBootstrapBasefield } from '../bts_basefield';
import { DateTimeAdapter } from '@danielmoncada/angular-datetime-picker';
import { DOCUMENT } from '@angular/common';
import { getFirstDayOfWeek, ServoyPublicService } from '@servoy/public';
import { DateTime } from 'luxon';

export class ServoyBootstrapBaseCalendar extends ServoyBootstrapBasefield<HTMLDivElement> {

    public filter: any;
    public min: Date;
    public max: Date;

    public globalDayArray: number[];
    public globalDateArray: Date[];

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

    public disableDays(dateArray: number[]) {
        this.globalDayArray = dateArray;
        this.filter = this.globalDateArray || this.globalDayArray ? this.filterImpl : null;
        this.cdRef.detectChanges();
    }

    public disableDates(dateArray: Date[]) {
        this.globalDateArray = dateArray;
        this.filter = this.globalDateArray || this.globalDayArray ? this.filterImpl : null;
        this.cdRef.detectChanges();
    }

    public setMinMaxDate(minDate: Date, maxDate: Date) {
        if (minDate) this.min = minDate;
        if (maxDate) this.max = maxDate;
    }

    private filterImpl = (d: Date): boolean => {
        let result = true;
        if (this.globalDateArray) {
            this.globalDateArray.forEach(el => {
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
        if (result && this.globalDayArray) {
            result = !this.globalDayArray.includes(d.day());
        }
        return result;
    }
}
