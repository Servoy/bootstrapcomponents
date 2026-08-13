
import { Component, ChangeDetectionStrategy, SimpleChanges, SimpleChange, input, output, signal } from '@angular/core';
import { ServoyBootstrapTextarea } from '../textarea/textarea';
import { ServoyPublicModule } from '@servoy/public';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'bootstrapcomponents-floatlabeltextarea',
    templateUrl: './floatlabeltextarea.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [ServoyPublicModule, FormsModule]
})
export class ServoyFloatLabelBootstrapTextarea extends ServoyBootstrapTextarea {
    
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
