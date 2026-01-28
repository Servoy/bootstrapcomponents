
import { Component, ChangeDetectorRef, Renderer2, ChangeDetectionStrategy, Inject, DOCUMENT, signal } from '@angular/core';
import { ServoyBootstrapBasefield } from '../bts_basefield';

@Component({
    selector: 'bootstrapcomponents-textarea',
    templateUrl: './textarea.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class ServoyBootstrapTextarea extends ServoyBootstrapBasefield<HTMLTextAreaElement> {

    readonly maxLength = signal<number>(undefined);

    constructor(renderer: Renderer2, cdRef: ChangeDetectorRef, @Inject(DOCUMENT) doc: Document) {
        super(renderer, cdRef, doc);
    }

    svyOnInit() {
        super.svyOnInit();
        const maxLength = this.maxLength();
        if (!maxLength || maxLength === 0) {
            this.maxLength.set(524288);
        }
    }
    
    onModelChange(newValue) {
        this._dataProviderID.set(newValue);
        this.pushUpdate();
    }

}
