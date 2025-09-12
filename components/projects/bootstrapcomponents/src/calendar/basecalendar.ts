import { Renderer2, ChangeDetectorRef, Inject, Input, Directive, EventEmitter, Output, SimpleChanges, DOCUMENT } from '@angular/core';
import { ServoyBootstrapBasefield } from '../bts_basefield';

import { getFirstDayOfWeek, LoggerService, ServoyPublicService } from '@servoy/public';
import { DateTime as LuxonDateTime } from 'luxon';
import { Namespace, TempusDominus, DateTime, Options } from '@eonasdan/tempus-dominus';
import { Localization } from '@eonasdan/tempus-dominus/types/utilities/options';

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

	@Input() options: Options;

	picker: TempusDominus;

	readonly config: Options = {
		allowInputToggle: false,
		useCurrent: false,
		display: {
			keyboardNavigation: true,
			components: {
				calendar: true,
				decades: true,
				year: true,
				month: true,
				date: true,
				clock: true,
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
			dayViewHeaderFormat: { month: 'long', year: 'numeric' },
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
		if (this.theme) {
			this.config.display.theme = this.theme as 'auto' | 'light' | 'dark';
		}
		this.initializePicker();
		super.svyOnInit();
	}

	svyOnChanges(changes: SimpleChanges) {
		super.svyOnChanges(changes);
		if (changes.options) {
			Object.assign(this.config, this.options);
		}
		if (changes.dataProviderID && this.picker && !this.findmode) {
			const value = (this.dataProviderID instanceof Date) ? DateTime.convert(this.dataProviderID, null, this.config.localization) : null;
			this.picker.dates.setValue(value);
		}
		if (this.dataProviderID) {
			const value = (this.dataProviderID instanceof Date) ? DateTime.convert(this.dataProviderID, null, this.config.localization) : null;
			if (value)
				this.config.viewDate = value;
			else delete this.config.viewDate;
		}
		if (changes.calendarWeeks && changes.calendarWeeks.currentValue != undefined)
			this.config.display.calendarWeeks = changes.calendarWeeks.currentValue;
		if (changes.minDate && changes.minDate.currentValue)
			this.config.restrictions.minDate = DateTime.convert(changes.minDate.currentValue, null, this.config.localization);
		if (changes.maxDate && changes.maxDate.currentValue)
			this.config.restrictions.maxDate = DateTime.convert(changes.maxDate.currentValue, null, this.config.localization);
		if (changes.disabledDays) {
			if (changes.disabledDays.currentValue) {
				this.config.restrictions.daysOfWeekDisabled = changes.disabledDays.currentValue;
			}
			else if (changes.disabledDays.previousValue) {
				this.config.restrictions.daysOfWeekDisabled = [];
			}
		}
		if (changes.disabledDates) {
			if (changes.disabledDates.currentValue) {
				this.config.restrictions.disabledDates = this.convertDateArray(changes.disabledDates.currentValue);
			}
			else if (changes.disabledDates.previousValue) {
				this.config.restrictions.disabledDates = [];
			}
		}

		if (changes.keepInvalid && changes.keepInvalid.currentValue !== undefined)
			this.config.keepInvalid = changes.keepInvalid.currentValue;
		if (this.picker && (changes.calendarWeeks || changes.minDate || changes.options
			|| changes.maxDate || changes.disabledDays || changes.disabledDates)) this.picker.updateOptions(this.config);
	}

	initializePicker() {
		if (!this.picker) {
			this.picker = new TempusDominus(this.getNativeElement(), this.config);
			this.picker.subscribe(Namespace.events.change, (event) => this.dateChanged(event));
		}
	}

	public updateConfig(format: string) {
		const showYear = format.indexOf('y') >= 0;
		const showMonth = format.indexOf('M') >= 0;
		const showDate = format.indexOf('d') >= 0;
		const showHour = format.indexOf('h') >= 0 || format.indexOf('H') >= 0;
		const showMinute = format.indexOf('m') >= 0;
		const showSecond = format.indexOf('s') >= 0;
		this.config.display.components.calendar = showYear || showMonth || showDate;
		this.config.display.components.decades = showYear;
		this.config.display.components.year = showYear;
		this.config.display.components.month = showMonth;
		this.config.display.components.date = showDate;
		this.config.display.components.clock = showHour || showMinute || showSecond;
		this.config.display.components.hours = showHour;
		this.config.display.components.minutes = showMinute;
		this.config.display.components.seconds = showSecond;
		if (format.indexOf('a') >= 0 || format.indexOf('A') >= 0 || format.indexOf('am') >= 0 || format.indexOf('AM') >= 0) {
			this.config.localization.hourCycle = 'h12';
		} else if (format.indexOf('H') >= 0) {
			this.config.localization.hourCycle = 'h23';
		} else if (format.indexOf('h') >= 0) {
			this.config.localization.hourCycle = 'h12';
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
			this.dataProviderID = !event.date ? null : event.date;
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
		let language = locale.toLowerCase();
		if (index > 0 && language !== 'ar-sa' && language !== 'sr-latn') {
			language = locale.substring(0, index);
		}

		const moduleLoader = (module: { default: { localization: { [key: string]: string | number } } }) => {
			const copy = Object.assign({}, module.default.localization);
			copy.startOfTheWeek = this.config.localization.startOfTheWeek;
			copy.hourCycle = this.config.localization.hourCycle;
			this.config.localization = copy;
			if (this.picker) this.picker.updateOptions(this.config);
		}
		const errorHandler = () => {
			this.log.info('Locale ' + locale + ' for calendar not found, default to english');
		}
		switch (language) {
			case 'ar-sa': import('@eonasdan/tempus-dominus/dist/locales/ar-SA.js').then(moduleLoader, errorHandler); break;
			case 'ar': import('@eonasdan/tempus-dominus/dist/locales/ar.js').then(moduleLoader, errorHandler); break;
			case 'ca': import('@eonasdan/tempus-dominus/dist/locales/ca.js').then(moduleLoader, errorHandler); break;
			case 'cs': import('@eonasdan/tempus-dominus/dist/locales/cs.js').then(moduleLoader, errorHandler); break;
			case 'de': import('@eonasdan/tempus-dominus/dist/locales/de.js').then(moduleLoader, errorHandler); break;
			case 'es': import('@eonasdan/tempus-dominus/dist/locales/es.js').then(moduleLoader, errorHandler); break;
			case 'fi': import('@eonasdan/tempus-dominus/dist/locales/fi.js').then(moduleLoader, errorHandler); break;
			case 'fr': import('@eonasdan/tempus-dominus/dist/locales/fr.js').then(moduleLoader, errorHandler); break;
			case 'hr': import('@eonasdan/tempus-dominus/dist/locales/hr.js').then(moduleLoader, errorHandler); break;
			case 'hy': import('@eonasdan/tempus-dominus/dist/locales/hy.js').then(moduleLoader, errorHandler); break;
			case 'it': import('@eonasdan/tempus-dominus/dist/locales/it.js').then(moduleLoader, errorHandler); break;
			case 'nl': import('@eonasdan/tempus-dominus/dist/locales/nl.js').then(moduleLoader, errorHandler); break;
			case 'pl': import('@eonasdan/tempus-dominus/dist/locales/pl.js').then(moduleLoader, errorHandler); break;
			case 'ro': import('@eonasdan/tempus-dominus/dist/locales/ro.js').then(moduleLoader, errorHandler); break;
			case 'ru': import('@eonasdan/tempus-dominus/dist/locales/ru.js').then(moduleLoader, errorHandler); break;
			case 'sl': import('@eonasdan/tempus-dominus/dist/locales/sl.js').then(moduleLoader, errorHandler); break;
			case 'sr': import('@eonasdan/tempus-dominus/dist/locales/sr.js').then(moduleLoader, errorHandler); break;
			case 'sr-latn': import('@eonasdan/tempus-dominus/dist/locales/sr-Latn.js').then(moduleLoader, errorHandler); break;
			case 'tr': import('@eonasdan/tempus-dominus/dist/locales/tr.js').then(moduleLoader, errorHandler); break;
		}
	}

}
