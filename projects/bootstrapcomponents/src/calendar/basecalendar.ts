import { Renderer2, ChangeDetectorRef, Inject, Input, Directive, EventEmitter, Output, SimpleChanges } from '@angular/core';
import { ServoyBootstrapBasefield } from '../bts_basefield';
import { DOCUMENT } from '@angular/common';
import { getFirstDayOfWeek, LoggerService, ServoyPublicService } from '@servoy/public';
import { DateTime as LuxonDateTime } from 'luxon';
import { Namespace, TempusDominus, Options, DateTime } from '@servoy/tempus-dominus';
import { ChangeEvent } from '@servoy/tempus-dominus/types/utilities/event-types';

@Directive()
export class ServoyBootstrapBaseCalendar extends ServoyBootstrapBasefield<HTMLDivElement> {

    @Input() disabledDays: number[];
    @Output() disabledDaysChange = new EventEmitter();
    @Input() disabledDates: Date[];
    @Output() disabledDatesChange = new EventEmitter();
    @Input() maxDate: Date;
    @Output() maxDateChange = new EventEmitter();
    @Input() minDate: Date;
    @Output() minDateChange = new EventEmitter();
    @Input() keepInvalid: boolean;
    @Output() keepInvalidChange = new EventEmitter();

    @Input() calendarWeeks: boolean;

    picker: TempusDominus;

    readonly config: Options = {
        allowInputToggle: false,
        useCurrent: false,
        display: {
            components: {
                useTwentyfourHour: true,
                decades: true,
                year: true,
                month: true,
                date: true,
                hours: true,
                minutes: true,
                seconds: true
            },
            calendarWeeks: true,
            buttons: {
                today: true,
                close: true,
                clear: true,
            },
            inline: false
        },
        restrictions: {
        },
        localization: {
            startOfTheWeek: 1,
            locale: 'en'
        }
    };

    constructor(renderer: Renderer2, cdRef: ChangeDetectorRef,
        servoyService: ServoyPublicService,
        public log: LoggerService,
        @Inject(DOCUMENT) doc: Document) {
        super(renderer, cdRef, doc);
        this.config.localization.locale = servoyService.getLocale();
        this.loadCalendarLocale(this.config.localization.locale);
        this.config.localization.startOfTheWeek = getFirstDayOfWeek(servoyService.getLocale());
        const lts = LuxonDateTime.now().setLocale(servoyService.getLocale()).toLocaleString(LuxonDateTime.DATETIME_FULL).toUpperCase();
        this.config.display.components.useTwentyfourHour = lts.indexOf('AM') >= 0 || lts.indexOf('PM') >= 0;
    }

    public svyOnInit() {
        this.initializePicker();
        super.svyOnInit();
    }

    svyOnChanges(changes: SimpleChanges) {
        super.svyOnChanges(changes);
         if (changes.dataProviderID && this.picker && !this.findmode) {
            const value = (this.dataProviderID instanceof Date) ? this.dataProviderID: null;
            if (value) this.picker.dates.setValue(DateTime.convert(value));
            else this.picker.dates.clear();
            if (value) this.config.viewDate = value as DateTime;;
        }
        if (changes.calendarWeeks && changes.calendarWeeks.currentValue)
            this.config.display.calendarWeeks = changes.calendarWeeks.currentValue;
        if (changes.minDate && changes.minDate.currentValue)
            this.config.restrictions.minDate = DateTime.convert(changes.minDate.currentValue);
        if (changes.maxDate && changes.maxDate.currentValue)
            this.config.restrictions.maxDate = DateTime.convert(changes.maxDate.currentValue);
        if (changes.disabledDays && changes.disabledDays.currentValue)
            this.config.restrictions.daysOfWeekDisabled = changes.disabledDays.currentValue;
        if (changes.disabledDates && changes.disabledDates.currentValue)
            this.config.restrictions.disabledDates = this.convertDateArray(changes.disabledDates.currentValue);
        if (changes.keepInvalid && changes.keepInvalid.currentValue !== undefined)
            this.config.keepInvalid =  changes.keepInvalid.currentValue;
        if (this.picker && (changes.calendarWeeks || changes.minDate
             || changes.maxDate || changes.disabledDays || changes.disabledDates)) this.picker.updateOptions(this.config);
    }
    public disableDays(dateArray: number[], keepInvalid?: boolean) {
        this.disabledDaysChange.emit(dateArray);
        this.config.restrictions.daysOfWeekDisabled = dateArray;
        this.checkInvalidAndPicker(keepInvalid);
    }

    public disableDates(dateArray: Date[], keepInvalid?: boolean) {
        this.disabledDatesChange.emit(dateArray);

        this.config.restrictions.disabledDates = this.convertDateArray(dateArray);
        this.checkInvalidAndPicker(keepInvalid);
    }

    public setMinMaxDate(minDate: Date, maxDate: Date, keepInvalid?: boolean) {
        this.minDateChange.emit(minDate);
        this.maxDateChange.emit(maxDate);
        this.config.restrictions.minDate = DateTime.convert(minDate);
        this.config.restrictions.maxDate = DateTime.convert(maxDate);
        this.checkInvalidAndPicker(keepInvalid);
    }

    initializePicker() {
        if (!this.picker) {
            this.picker = new TempusDominus(this.getNativeElement(), this.config);
            this.picker.subscribe(Namespace.events.change, (event) => this.dateChanged(event));
        }
    }

    public dateChanged(event: ChangeEvent) {
        if (event.type === 'change.td') {
            if ( (event.date && this.dataProviderID && event.date.getTime() === this.dataProviderID.getTime()) ||
             (!event.date && !this.dataProviderID)) return;
            this.dataProviderID = event.date;
        } else this.dataProviderID = null;
        super.pushUpdate();
    }


    ngOnDestroy() {
        super.ngOnDestroy();
        if (this.picker !== null) this.picker.dispose();
    }

    private checkInvalidAndPicker(keepInvalid: boolean) {
        if (keepInvalid !== undefined) {
            this.config.keepInvalid= keepInvalid;
            this.keepInvalid = keepInvalid;
            this.keepInvalidChange.emit(keepInvalid);
        }
        if (this.picker) this.picker.updateOptions(this.config);
    }

    private convertDateArray(dates: Date[]): DateTime[] {
        const datetimeArray: DateTime[] = dates ? [] : null;
        if (dates) {
            dates.forEach((date, index) => {
                datetimeArray[index] = DateTime.convert(date);
            });
        }
        return datetimeArray;
    }

      private loadCalendarLocale(locale: string) {
        const index = locale.indexOf('-');
        let language = locale;
        if (index > 0) {
            language = locale.substring(0, index);
        }
        language = language.toLowerCase();
        import(`@servoy/tempus-dominus/dist/locales/${language}.js`).then(
            (module: { localization: { [key: string]: string } }) => {
                this.config.localization = module.localization;
                if (this.picker !== null) this.picker.updateOptions(this.config);
            },
            () => {
                this.log.info('Locale ' + locale + ' for calendar not found, default to english');
            });
    }
}
