import { Component, Renderer2, SimpleChanges, ChangeDetectorRef, ViewChild, ViewChildren, QueryList, ElementRef, HostListener, ChangeDetectionStrategy, Inject, DOCUMENT, input, output, model } from '@angular/core';
import { ServoyBootstrapCombobox } from '../combobox/combobox';
import { FormattingService, ServoyPublicService, PopupStateService} from '@servoy/public';


@Component({
    selector: 'bootstrapcomponents-floatlabelcombobox',
    templateUrl: './floatlabelcombobox.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class ServoyFloatLabelBootstrapCombobox extends ServoyBootstrapCombobox{

    readonly floatLabelText = input<string>(undefined);
    readonly errorMessage = input<string>(undefined);
    errorShow = model<boolean>(undefined);
    readonly errorShowChange = output<boolean>();

    constructor(renderer: Renderer2, protected cdRef: ChangeDetectorRef, protected formatService: FormattingService, 
        @Inject(DOCUMENT) doc: Document, protected servoyService: ServoyPublicService, protected popupStateService: PopupStateService) {
        super(renderer, cdRef,formatService, doc, servoyService, popupStateService);
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
		if (this.errorMessage()) {
			//designer
			if (this.servoyApi.isInDesigner()) {
				this.errorShow.set(true);
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
