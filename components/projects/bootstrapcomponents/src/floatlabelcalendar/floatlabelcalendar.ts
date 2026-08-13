
import { Component, ChangeDetectionStrategy, SimpleChanges, SimpleChange, input, output, signal } from '@angular/core';
import { ServoyBootstrapCalendar } from '../calendar/calendar';
import { ServoyPublicModule } from '@servoy/public';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'bootstrapcomponents-floatlabelcalendar',
    templateUrl: './floatlabelcalendar.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [ServoyPublicModule, FormsModule]
})
export class ServoyFloatLabelBootstrapCalendar extends ServoyBootstrapCalendar {

 	readonly floatLabelText = input<string | undefined>(undefined);
 	readonly errorMessage = input<string | undefined>(undefined);
    readonly errorShow = signal<boolean | undefined>(undefined);
    readonly errorShowChange = output<boolean>();
    
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
					nativeElement.querySelector('input')!.classList.add('bts-floatlabelcalendar-input-invalid');
					this.errorShowChange.emit(true);
				} else {
					nativeElement.querySelector('input')!.classList.remove('bts-floatlabelcalendar-input-invalid');
					this.errorShowChange.emit(false);
				}	
			}			
		}
	}

}
