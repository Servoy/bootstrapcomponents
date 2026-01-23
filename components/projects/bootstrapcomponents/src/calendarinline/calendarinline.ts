
import { Component, Renderer2, ChangeDetectorRef, SimpleChanges, ChangeDetectionStrategy, Inject, DOCUMENT, input } from '@angular/core';
import { Format, LoggerFactory, ServoyPublicService } from '@servoy/public';
import { ServoyBootstrapBaseCalendar } from '../calendar/basecalendar';
import { DateTime } from '@eonasdan/tempus-dominus';

@Component({
    selector: 'bootstrapcomponents-calendarinline',
    templateUrl: './calendarinline.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class ServoyBootstrapCalendarinline extends ServoyBootstrapBaseCalendar {

    readonly format = input<Format>(undefined);

    constructor(renderer: Renderer2, cdRef: ChangeDetectorRef,
        servoyService: ServoyPublicService, logFactory: LoggerFactory, @Inject(DOCUMENT) doc: Document) {
        super(renderer, cdRef, servoyService, logFactory.getLogger('bts-inlinecalendar'), doc);
        this.config.display.inline = true;
        this.config.display.buttons.close = false;
    }

    public svyOnInit() {
        super.svyOnInit();
        const dataProviderID = this.dataProviderID();
        if (dataProviderID)
            this.picker.dates.setFromInput(dataProviderID);
    }

    svyOnChanges(changes: SimpleChanges) {
        super.svyOnChanges(changes);
        if (changes.format) {
            const change = changes.format;
            if (change.currentValue) {
                if (change.currentValue.type === 'DATETIME' && change.currentValue.display) {
                    this.updateConfig(change.currentValue.display);
                    if (this.picker !== null) {
                        this.picker.dispose();
                        this.picker = null;
                        this.initializePicker();
                        const dataProviderID = this.dataProviderID();
                        const value = (dataProviderID instanceof Date) ? DateTime.convert(dataProviderID, null, this.config.localization) : null;
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
