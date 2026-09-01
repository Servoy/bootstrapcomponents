import { Component, SimpleChanges, ChangeDetectionStrategy, input, model } from '@angular/core';
import { ServoyBootstrapCombobox } from '../combobox/combobox';
import { ServoyPublicModule } from '@servoy/public';
import { NgbDropdownModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'bootstrapcomponents-floatlabelcombobox',
    templateUrl: './floatlabelcombobox.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [ServoyPublicModule, NgbDropdownModule, NgbTooltipModule]
})
export class ServoyFloatLabelBootstrapCombobox extends ServoyBootstrapCombobox{

    readonly floatLabelText = input<string | undefined>(undefined);
    readonly errorMessage = input<string | undefined>(undefined);
    readonly errorShow = model<boolean>();
    
    svyOnChanges(changes: SimpleChanges) {
        super.svyOnChanges(changes);
        if (this.servoyApi().isInDesigner()) {
			this.toggleErrorMessage(true);
		}
    }
    
    toggleErrorMessage(show: boolean) {
		if (this.errorMessage()) {
			//designer
			if (this.servoyApi().isInDesigner()) {
				this.errorShow.set(true);
			} else {
				const nativeElement = this.elementRef()!.nativeElement as HTMLElement;
				if (show) {
					nativeElement.querySelector('button')!.classList.add('bts-floatlabelcombobox-input-invalid');
					this.errorShow.set(true);
				} else {
					nativeElement.querySelector('button')!.classList.remove('bts-floatlabelcombobox-input-invalid');
					this.errorShow.set(false);
				}	
			}			
		}
	}

}
