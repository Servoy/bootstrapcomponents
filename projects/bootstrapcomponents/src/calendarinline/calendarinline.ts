import { DOCUMENT } from '@angular/common';
import { Component, Renderer2, ChangeDetectorRef, ChangeDetectionStrategy, Inject } from '@angular/core';
import { LoggerFactory, ServoyPublicService } from '@servoy/public';
import { ServoyBootstrapBaseCalendar } from '../calendar/basecalendar';

@Component({
    selector: 'bootstrapcomponents-calendarinline',
    templateUrl: './calendarinline.html',
    styleUrls: ['./calendarinline.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServoyBootstrapCalendarinline extends ServoyBootstrapBaseCalendar {

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
}
