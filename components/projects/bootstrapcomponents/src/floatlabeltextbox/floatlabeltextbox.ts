
import { Component, ChangeDetectionStrategy, SimpleChanges, SimpleChange, input, output, signal } from '@angular/core';
import { ServoyBootstrapTextbox } from '../textbox/textbox';

@Component({
    selector: 'bootstrapcomponents-floatlabeltextbox',
    templateUrl: './floatlabeltextbox.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class ServoyFloatLabelBootstrapTextbox extends ServoyBootstrapTextbox {
    
    readonly floatLabelText = input<string | undefined>(undefined);
    readonly errorMessage = input<string | undefined>(undefined);
    readonly errorShow = signal<boolean | undefined>(undefined);
    readonly errorShowChange = output<boolean>();

    svyOnInit() {
        super.svyOnInit();
    }

    svyOnChanges(changes: SimpleChanges) {
        super.svyOnChanges(changes);
        if (this.servoyApi.isInDesigner()) {
			this.toggleErrorMessage(true);
		}
    }
    
    setPlaceHolderText(_change : SimpleChange){
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
					nativeElement.classList.add('bts-floatlabeltextbox-input-invalid');
					this.errorShowChange.emit(true);
				} else {
					nativeElement.classList.remove('bts-floatlabeltextbox-input-invalid');
					this.errorShowChange.emit(false);
				}	
			}			
		}
	}
}
