
import { Component, ChangeDetectorRef, Renderer2, ChangeDetectionStrategy, Inject, SimpleChanges, SimpleChange, DOCUMENT, input, output, signal } from '@angular/core';
import { ServoyBootstrapTextarea } from '../textarea/textarea';

@Component({
    selector: 'bootstrapcomponents-floatlabeltextarea',
    templateUrl: './floatlabeltextarea.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class ServoyFloatLabelBootstrapTextarea extends ServoyBootstrapTextarea {
    
    readonly floatLabelText = input<string>(undefined);
    readonly errorMessage = input<string>(undefined);
    errorShow = signal<boolean>(undefined);
    readonly errorShowChange = output<boolean>();
     
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
		if (this.errorMessage()) {
			//designer
			if (this.servoyApi.isInDesigner()) {
				this.errorShow.set(true);
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
