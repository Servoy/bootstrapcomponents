import { Component, Renderer2, Input, SimpleChanges, ChangeDetectorRef, ViewChild, ViewChildren, QueryList, Output, EventEmitter, ElementRef, HostListener, ChangeDetectionStrategy, Inject } from '@angular/core';
import { ServoyBootstrapCombobox } from '../combobox/combobox';
import { FormattingService, ServoyPublicService} from '@servoy/public';
import { DOCUMENT } from '@angular/common';

@Component({
    selector: 'bootstrapcomponents-floatlabelcombobox',
    templateUrl: './floatlabelcombobox.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class ServoyFloatLabelBootstrapCombobox extends ServoyBootstrapCombobox{

    @Input() floatLabelText: string;
    @Input() errorMessage: string;
    @Input() errorShow: boolean;
    @Output() errorShowChange = new EventEmitter();

    constructor(renderer: Renderer2, protected cdRef: ChangeDetectorRef, protected formatService: FormattingService, @Inject(DOCUMENT) doc: Document, protected servoyService: ServoyPublicService) {
        super(renderer, cdRef,formatService, doc, servoyService);
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
    
    toggleErrorMessage(show: boolean) {
		if (this.errorMessage) {
			//designer
			if (this.servoyApi.isInDesigner()) {
				this.errorShow = true;
			} else {
				const nativeElement = this.elementRef.nativeElement as HTMLElement;
				if (show) {
					nativeElement.querySelector('button').classList.add('bts-floatlabelcombobox-input-invalid');
					this.errorShowChange.emit(true);
				} else {
					nativeElement.querySelector('button').classList.remove('bts-floatlabelcombobox-input-invalid');
					this.errorShowChange.emit(false);
				}	
			}			
		}
	}

}
