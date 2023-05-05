import { Renderer2, ChangeDetectorRef, Inject, Input, Directive, EventEmitter, Output, SimpleChanges } from '@angular/core';
import { ServoyBootstrapBasefield } from '../bts_basefield';
import { DOCUMENT } from '@angular/common';
import { getFirstDayOfWeek, LoggerService, ServoyPublicService } from '@servoy/public';
import { DateTime as LuxonDateTime } from 'luxon';
import { Namespace, TempusDominus, DateTime, Options } from '@eonasdan/tempus-dominus';

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
    @Input() theme: string;

    picker: TempusDominus;

    readonly config: Options = {
        allowInputToggle: false,
        useCurrent: false,
        display: {
            components: {
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
            inline: false,
            theme: 'light'
        },
        restrictions: {
        },
        localization: {
            startOfTheWeek: 1,
            locale: 'en',
            hourCycle: 'h23'
        }
    };

    constructor(renderer: Renderer2, cdRef: ChangeDetectorRef,
        servoyService: ServoyPublicService,
        public log: LoggerService,
        @Inject(DOCUMENT) doc: Document) {
        super(renderer, cdRef, doc);
        this.config.localization.locale = servoyService.getLocale();
        this.loadCalendarLocale(this.config.localization.locale);
        this.config.localization.startOfTheWeek = getFirstDayOfWeek(servoyService.getLocaleObject() ? servoyService.getLocaleObject().full : servoyService.getLocale());
        const lts = LuxonDateTime.now().setLocale(servoyService.getLocale()).toLocaleString(LuxonDateTime.DATETIME_FULL).toUpperCase();
        if (lts.indexOf('AM') >= 0 || lts.indexOf('PM') >= 0) {
			this.config.localization.hourCycle = 'h12';
		}
    }

    public svyOnInit() {
        if (this.theme){
            this.config.display.theme = this.theme as "auto" | "light" | "dark";
        }
        this.initializePicker();
        super.svyOnInit();
    }

    svyOnChanges(changes: SimpleChanges) {
        super.svyOnChanges(changes);
        if (changes.dataProviderID && this.picker && !this.findmode) {
            const value = (this.dataProviderID instanceof Date) ? DateTime.convert(this.dataProviderID, null, this.config.localization) : null;
            this.picker.dates.setValue(value);
        }
        if (this.dataProviderID) {
            const value = (this.dataProviderID instanceof Date) ? DateTime.convert(this.dataProviderID, null, this.config.localization) : null;
            this.config.viewDate = value;
       }
        if (changes.calendarWeeks && changes.calendarWeeks.currentValue)
            this.config.display.calendarWeeks = changes.calendarWeeks.currentValue;
        if (changes.minDate && changes.minDate.currentValue)
            this.config.restrictions.minDate = DateTime.convert(changes.minDate.currentValue, null, this.config.localization);
        if (changes.maxDate && changes.maxDate.currentValue)
            this.config.restrictions.maxDate = DateTime.convert(changes.maxDate.currentValue, null, this.config.localization);
        if (changes.disabledDays && changes.disabledDays.currentValue)
            this.config.restrictions.daysOfWeekDisabled = changes.disabledDays.currentValue;
        if (changes.disabledDates && changes.disabledDates.currentValue)
            this.config.restrictions.disabledDates = this.convertDateArray(changes.disabledDates.currentValue);
        if (changes.keepInvalid && changes.keepInvalid.currentValue !== undefined)
            this.config.keepInvalid = changes.keepInvalid.currentValue;
        if (this.picker && (changes.calendarWeeks || changes.minDate
            || changes.maxDate || changes.disabledDays || changes.disabledDates)) this.picker.updateOptions(this.config);
    }

    initializePicker() {
        if (!this.picker) {
            this.picker = new TempusDominus(this.getNativeElement(), this.config);
            this.picker.subscribe(Namespace.events.change, (event) => this.dateChanged(event));
        }
    }

    public dateChanged(event: any) {
        if (event.type === 'change.td') {
            if ((event.date && this.dataProviderID && event.date.getTime() === this.dataProviderID.getTime()) ||
                (!event.date && !this.dataProviderID)) return;

            // do not push invalid date, revert to old value
            if (event.date && isNaN(event.date.getTime())) {
                const value = (this.dataProviderID instanceof Date) ? DateTime.convert(this.dataProviderID, null, this.config.localization) : null;
                this.picker.dates.setValue(value);
                return;
            }
            this.dataProviderID = !event.date ? null : event.date;;
        } else this.dataProviderID = null;
        super.pushUpdate();
    }


    ngOnDestroy() {
        super.ngOnDestroy();
        if (this.picker) this.picker.dispose();
    }

    private checkInvalidAndPicker(keepInvalid: boolean) {
        if (keepInvalid !== undefined) {
            this.config.keepInvalid = keepInvalid;
            this.keepInvalid = keepInvalid;
            this.keepInvalidChange.emit(keepInvalid);
        }
        if (this.picker) this.picker.updateOptions(this.config);
    }

    private convertDateArray(dates: Date[]): DateTime[] {
        const datetimeArray: DateTime[] = dates ? [] : null;
        if (dates) {
            dates.forEach((date, index) => {
                datetimeArray[index] = DateTime.convert(date, null, this.config.localization);
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
        import(`@eonasdan/tempus-dominus/dist/locales/${language}.js`).then(
            (module: { localization: { [key: string]: string } }) => {
                this.config.localization = module.localization;
                if (this.picker) this.picker.updateOptions(this.config);
            },
            () => {
                this.log.info('Locale ' + locale + ' for calendar not found, default to english');
            });
    }
}
