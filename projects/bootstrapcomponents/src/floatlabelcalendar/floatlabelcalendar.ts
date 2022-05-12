import { DOCUMENT } from '@angular/common';
import { Component, Renderer2, Input, ChangeDetectorRef, ChangeDetectionStrategy, Inject, SimpleChange } from '@angular/core';
import { FormattingService } from '@servoy/public';
import { LoggerFactory, ServoyPublicService } from '@servoy/public';
import { ServoyBootstrapCalendar } from '../calendar/calendar';

@Component({
    selector: 'bootstrapcomponents-floatlabelcalendar',
    templateUrl: './floatlabelcalendar.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServoyFloatLabelBootstrapCalendar extends ServoyBootstrapCalendar {

 @Input() floatLabelText: string;
 
    constructor(renderer: Renderer2,
        cdRef: ChangeDetectorRef,
        logFactory: LoggerFactory,
        protected formattingService: FormattingService,
        servoyService: ServoyPublicService,
        @Inject(DOCUMENT) doc: Document) {
        super(renderer, cdRef, logFactory, formattingService, servoyService,doc);
    }
    
    setPlaceHolderText(change : SimpleChange){
        // ignore, float label text is the placeholder text
    }

}
