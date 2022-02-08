import { DOCUMENT } from '@angular/common';
import { Component, Renderer2, ChangeDetectorRef, ChangeDetectionStrategy, Inject, SimpleChanges } from '@angular/core';
import { DateTime } from '@eonasdan/tempus-dominus';
import { ServoyPublicService } from '@servoy/public';
import { ServoyBootstrapBaseCalendar } from '../calendar/basecalendar';

@Component({
    selector: 'bootstrapcomponents-calendarinline',
    templateUrl: './calendarinline.html',
    styleUrls: ['./calendarinline.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServoyBootstrapCalendarinline extends ServoyBootstrapBaseCalendar {

    constructor(renderer: Renderer2, cdRef: ChangeDetectorRef,
        servoyService: ServoyPublicService, @Inject(DOCUMENT) doc: Document) {
        super(renderer, cdRef, servoyService, doc);
        this.config.display.inline = true;
        this.config.display.buttons.close = false;
    }

    public svyOnInit() {
        super.svyOnInit();
        if (this.dataProviderID)
            this.picker.dates.set(this.dataProviderID);
    }
}
