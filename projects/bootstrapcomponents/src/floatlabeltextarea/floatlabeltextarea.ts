import { DOCUMENT } from '@angular/common';
import { Component, ChangeDetectorRef, Renderer2, Input, ChangeDetectionStrategy, Inject, SimpleChanges, SimpleChange } from '@angular/core';
import { ServoyBootstrapTextarea } from '../textarea/textarea';

@Component({
    selector: 'bootstrapcomponents-floatlabeltextarea',
    templateUrl: './floatlabeltextarea.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServoyFloatLabelBootstrapTextarea extends ServoyBootstrapTextarea {
    
    @Input() floatLabelText: string;
     
    constructor(renderer: Renderer2, cdRef: ChangeDetectorRef, @Inject(DOCUMENT) doc: Document) {
        super(renderer, cdRef, doc);
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
