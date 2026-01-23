
import { Component, ChangeDetectorRef, Renderer2, ChangeDetectionStrategy, Inject, SimpleChanges, SimpleChange, DOCUMENT, input, output, signal } from '@angular/core';
import { WindowRefService, FormattingService, ServoyPublicService, PopupStateService} from '@servoy/public';
import { ServoyBootstrapTypeahead } from '../typeahead/typeahead';

@Component({
    selector: 'bootstrapcomponents-floatlabeltypeahead',
    templateUrl: './floatlabeltypeahead.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class ServoyFloatLabelBootstrapTypeahead extends ServoyBootstrapTypeahead {
    
    readonly floatLabelText = input<string>(undefined);
    readonly errorMessage = input<string>(undefined);
    errorShow = signal<boolean>(undefined);
    readonly errorShowChange = output<boolean>();
     
    constructor(renderer: Renderer2, cdRef: ChangeDetectorRef, @Inject(DOCUMENT) doc: Document, 
		protected formatService: FormattingService, 
		protected servoyService: ServoyPublicService,
		protected windowService: WindowRefService,
        protected popupStateService: PopupStateService) {
        super(renderer, cdRef, doc, formatService, servoyService, windowService, popupStateService);
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
					nativeElement.classList.add('bts-floatlabeltypeahead-input-invalid');
					this.errorShowChange.emit(true);
				} else {
					nativeElement.classList.remove('bts-floatlabeltypeahead-input-invalid');
					this.errorShowChange.emit(false);
				}	
			}			
		}
	}

}
