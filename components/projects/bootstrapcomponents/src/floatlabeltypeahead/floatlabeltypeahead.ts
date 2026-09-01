
import { Component, ChangeDetectionStrategy, SimpleChanges, SimpleChange, input, model } from '@angular/core';
import { ServoyBootstrapTypeahead } from '../typeahead/typeahead';
import { ServoyPublicModule } from '@servoy/public';
import { FormsModule } from '@angular/forms';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { SvyNgbHighlight } from '../typeahead/highlight';

@Component({
    selector: 'bootstrapcomponents-floatlabeltypeahead',
    templateUrl: './floatlabeltypeahead.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [ServoyPublicModule, FormsModule, NgbTypeaheadModule, SvyNgbHighlight]
})
export class ServoyFloatLabelBootstrapTypeahead extends ServoyBootstrapTypeahead {
    
    readonly floatLabelText = input<string | undefined>(undefined);
    readonly errorMessage = input<string | undefined>(undefined);
    readonly errorShow = model<boolean>();

    svyOnInit() {
        super.svyOnInit();
    }

    svyOnChanges(changes: SimpleChanges) {
        super.svyOnChanges(changes);
        if (this.servoyApi().isInDesigner()) {
			this.toggleErrorMessage(true);
		}
    }
    
    setPlaceHolderText(_change : SimpleChange){
        // ignore, float label text is the placeholder text
    }
    
    toggleErrorMessage(show: boolean) {
		if (this.errorMessage()) {
			//designer
			if (this.servoyApi().isInDesigner()) {
				this.errorShow.set(true);
			} else {
				const nativeElement = this.elementRef()!.nativeElement as HTMLElement;
				if (show) {
					nativeElement.classList.add('bts-floatlabeltypeahead-input-invalid');
					this.errorShow.set(true);
				} else {
					nativeElement.classList.remove('bts-floatlabeltypeahead-input-invalid');
					this.errorShow.set(false);
				}	
			}			
		}
	}

}
