import { DOCUMENT } from '@angular/common';
import { Component, ChangeDetectorRef, Renderer2, Input, ChangeDetectionStrategy, Inject, SimpleChanges, SimpleChange } from '@angular/core';
import { WindowRefService } from '@servoy/public';
import { ServoyBootstrapTextbox } from '../textbox/textbox';

@Component({
    selector: 'bootstrapcomponents-floatlabeltextbox',
    templateUrl: './floatlabeltextbox.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServoyFloatLabelBootstrapTextbox extends ServoyBootstrapTextbox {
    
    @Input() floatLabelText: string;
     
    constructor(renderer: Renderer2, cdRef: ChangeDetectorRef, @Inject(DOCUMENT) doc: Document, protected windowService: WindowRefService) {
        super(renderer, cdRef, doc, windowService);
    }

    svyOnInit() {
        super.svyOnInit();
    }

    svyOnChanges(changes: SimpleChanges) {
        super.svyOnChanges(changes);
    }
    
    setPlaceHolderText(change : SimpleChange){
        // ignore, float label text is the placeholder text
    }

}
