import { DOCUMENT } from '@angular/common';
import { Component, Renderer2, Input, ChangeDetectorRef, SimpleChanges, ChangeDetectionStrategy, Inject } from '@angular/core';
import { Format, LoggerFactory, ServoyPublicService } from '@servoy/public';
import { ServoyBootstrapBaseCalendar } from '../calendar/basecalendar';

@Component({
    selector: 'bootstrapcomponents-calendarinline',
    templateUrl: './calendarinline.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServoyBootstrapCalendarinline extends ServoyBootstrapBaseCalendar {

	@Input() format: Format;

    constructor(renderer: Renderer2, cdRef: ChangeDetectorRef,
        servoyService: ServoyPublicService, logFactory: LoggerFactory, @Inject(DOCUMENT) doc: Document) {
        super(renderer, cdRef, servoyService,logFactory.getLogger('bts-inlinecalendar'),  doc);
        this.config.display.inline = true;
        this.config.display.buttons.close = false;
    }

    public svyOnInit() {
        super.svyOnInit();
        if (this.dataProviderID)
            this.picker.dates.setFromInput(this.dataProviderID);
    }

    svyOnChanges(changes: SimpleChanges) {
        if (changes.format) {
            const change = changes.format;
            if (change.currentValue) {
                if (change.currentValue.type === 'DATETIME' && change.currentValue.display) {
                    const format = change.currentValue.display;
                    const showCalendar = format.indexOf('y') >= 0 || format.indexOf('M') >= 0;
                    const showTime = format.indexOf('h') >= 0 || format.indexOf('H') >= 0 || format.indexOf('m') >= 0;
                    const showSecondsTimer = format.indexOf('s') >= 0;
                    this.config.display.components.decades = showCalendar;
                    this.config.display.components.year = showCalendar;
                    this.config.display.components.month = showCalendar;
                    this.config.display.components.date = showCalendar;
                    this.config.display.components.hours = showTime;
                    this.config.display.components.minutes = showTime;
                    this.config.display.components.seconds = showTime;
                    this.config.display.components.seconds = showSecondsTimer;
                    if (format.indexOf('a') >= 0 || format.indexOf('A') >= 0 || format.indexOf('am') >= 0 || format.indexOf('AM') >= 0) {
						this.config.localization.hourCycle = 'h12';
					} else if (format.indexOf('H') >= 0) {
						this.config.localization.hourCycle = 'h23';
					} else if (format.indexOf('h') >= 0) {
						this.config.localization.hourCycle = 'h12';
					}
                    if (this.picker !== null) this.picker.updateOptions(this.config);
                } else {
                    this.log.warn('wrong format or type given into the calendar field ' + JSON.stringify(change.currentValue));
                }
            }
        }
        super.svyOnChanges(changes);
    }
}
