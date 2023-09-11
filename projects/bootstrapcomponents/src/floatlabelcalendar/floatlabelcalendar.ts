import { DOCUMENT } from '@angular/common';
import { Component, Renderer2, Input, ChangeDetectorRef, ChangeDetectionStrategy, SimpleChanges, Inject, Output, EventEmitter, SimpleChange } from '@angular/core';
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
 	@Input() errorMessage: string;
    @Input() errorShow: boolean;
    @Output() errorShowChange = new EventEmitter();
 
    constructor(renderer: Renderer2,
        cdRef: ChangeDetectorRef,
        logFactory: LoggerFactory,
        protected formattingService: FormattingService,
        servoyService: ServoyPublicService,
        @Inject(DOCUMENT) doc: Document) {
        super(renderer, cdRef, logFactory, formattingService, servoyService,doc);
    }
    
    svyOnChanges(changes: SimpleChanges) {
        super.svyOnChanges(changes);
        if (this.servoyApi.isInDesigner()) {
			this.toggleErrorMessage(true);
		}
		if (changes.errorShow) {
			this.toggleErrorMessage(changes.errorShow.currentValue)
		}
    }
    
    setPlaceHolderText(change : SimpleChange){
        // ignore, float label text is the placeholder text
    }
    
    toggleErrorMessage(show: boolean) {
		if (this.errorMessage) {
			//designer
			if (this.servoyApi.isInDesigner()) {
				this.errorShow = true;
			} else {
				const nativeElement = this.elementRef.nativeElement as HTMLElement;
				if (show) {
					nativeElement.querySelector('input').classList.add('bts-floatlabelcalendar-input-invalid');
					this.errorShowChange.emit(true);
				} else {
					nativeElement.querySelector('input').classList.remove('bts-floatlabelcalendar-input-invalid');
					this.errorShowChange.emit(false);
				}	
			}			
		}
	}

}
