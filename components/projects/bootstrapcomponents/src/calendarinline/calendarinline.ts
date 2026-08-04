
import { Component, SimpleChanges, ChangeDetectionStrategy, input, inject } from '@angular/core';
import { Format, LoggerFactory } from '@servoy/public';
import { ServoyBootstrapBaseCalendar } from '../calendar/basecalendar';
import { DateTime } from '@eonasdan/tempus-dominus';

@Component({
    selector: 'bootstrapcomponents-calendarinline',
    templateUrl: './calendarinline.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class ServoyBootstrapCalendarinline extends ServoyBootstrapBaseCalendar {

    readonly format = input<Format | undefined>(undefined);

    override readonly log = inject(LoggerFactory).getLogger('bts-inlinecalendar');

    constructor() {
        super();
        this.config.display!.inline = true;
        this.config.display!.buttons!.close = false;
    }

    public svyOnInit() {
        super.svyOnInit();
        const dataProviderID = this._dataProviderID();
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
                        this.picker = null as any;
                        this.initializePicker();
                        const dataProviderID = this._dataProviderID();
                        const value = (dataProviderID instanceof Date) ? DateTime.convert(dataProviderID, undefined, this.config.localization) : null;
                        this.picker.dates.setValue(value as any);
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
