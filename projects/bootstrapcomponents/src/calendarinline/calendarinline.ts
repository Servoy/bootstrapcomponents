import { DOCUMENT } from '@angular/common';
import { Component, Renderer2, Input, ChangeDetectorRef, SimpleChanges, ChangeDetectionStrategy, Inject } from '@angular/core';
import { Format, LoggerFactory, ServoyPublicService } from '@servoy/public';
import { ServoyBootstrapBaseCalendar } from '../calendar/basecalendar';
import { DateTime } from '@eonasdan/tempus-dominus';

@Component({
    selector: 'bootstrapcomponents-calendarinline',
    templateUrl: './calendarinline.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServoyBootstrapCalendarinline extends ServoyBootstrapBaseCalendar {

    @Input() format: Format;

    constructor(renderer: Renderer2, cdRef: ChangeDetectorRef,
        servoyService: ServoyPublicService, logFactory: LoggerFactory, @Inject(DOCUMENT) doc: Document) {
        super(renderer, cdRef, servoyService, logFactory.getLogger('bts-inlinecalendar'), doc);
        this.config.display.inline = true;
        this.config.display.buttons.close = false;
    }

    public svyOnInit() {
        super.svyOnInit();
        if (this.dataProviderID)
            this.picker.dates.setFromInput(this.dataProviderID);
    }

    svyOnChanges(changes: SimpleChanges) {
        super.svyOnChanges(changes);
        if (changes.format) {
            const change = changes.format;
            if (change.currentValue) {
                if (change.currentValue.type === 'DATETIME' && change.currentValue.display) {
                    const format = change.currentValue.display;
                    const showYear = format.indexOf('y') >= 0 || format.indexOf('Y') >= 0;
                    const showMonth = (format.indexOf('m') >= 0 || format.indexOf('M') >= 0) && (format.indexOf('-') >= 0 || format.indexOf('/') >= 0);
                    const showDate = format.indexOf('d') >= 0 || format.indexOf('D') >= 0;
                    const showHour = format.indexOf('h') >= 0 || format.indexOf('H') >= 0;
                    const showMinute = (format.indexOf('m') >= 0 || format.indexOf('M') >= 0) && format.indexOf(':') >= 0;
                    const showSecond = format.indexOf('s') >= 0 || format.indexOf('S') >= 0;
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
                    if (this.picker !== null) {
                        this.picker.dispose();
                        this.picker = null;
                        this.initializePicker();
                        const value = (this.dataProviderID instanceof Date) ? DateTime.convert(this.dataProviderID, null, this.config.localization) : null;
                        this.picker.dates.setValue(value);
                    }
                }
            } else {
                this.log.warn('wrong format or type given into the calendar field ' + JSON.stringify(change.currentValue));
            }
        }
        if (changes.enabled) {
            const nativeElem = this.elementRef.nativeElement;
            if (changes.enabled.currentValue === true) {
                nativeElem.classList.remove('bts-calendar-inline-disabled');
            } else {
                nativeElem.classList.add('bts-calendar-inline-disabled');
            }
        }
    }
}
