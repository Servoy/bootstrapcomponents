import { DOCUMENT } from '@angular/common';
import { Component, ChangeDetectorRef, Renderer2, Input, ChangeDetectionStrategy, Inject, Output, EventEmitter, SimpleChanges, SimpleChange } from '@angular/core';
import { ServoyBootstrapTextarea } from '../textarea/textarea';

@Component({
    selector: 'bootstrapcomponents-floatlabeltextarea',
    templateUrl: './floatlabeltextarea.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServoyFloatLabelBootstrapTextarea extends ServoyBootstrapTextarea {
    
    @Input() floatLabelText: string;
    @Input() errorMessage: string;
    @Input() errorShow: boolean;
    @Output() errorShowChange = new EventEmitter();
     
    constructor(renderer: Renderer2, cdRef: ChangeDetectorRef, @Inject(DOCUMENT) doc: Document) {
        super(renderer, cdRef, doc);
    }

    svyOnInit() {
        super.svyOnInit();
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
					nativeElement.classList.add('bts-floatlabeltextarea-input-invalid');
					this.errorShowChange.emit(true);
				} else {
					nativeElement.classList.remove('bts-floatlabeltextarea-input-invalid');
					this.errorShowChange.emit(false);
				}	
			}			
		}
	}

}
