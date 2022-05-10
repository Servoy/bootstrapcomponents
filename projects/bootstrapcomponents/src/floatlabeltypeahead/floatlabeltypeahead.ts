import { DOCUMENT } from '@angular/common';
import { Component, ChangeDetectorRef, Renderer2, Input, ChangeDetectionStrategy, Inject, SimpleChanges, SimpleChange } from '@angular/core';
import { WindowRefService, FormattingService } from '@servoy/public';
import { ServoyBootstrapTypeahead } from '../typeahead/typeahead';

@Component({
    selector: 'bootstrapcomponents-floatlabeltypeahead',
    templateUrl: './floatlabeltypeahead.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServoyFloatLabelBootstrapTypeahead extends ServoyBootstrapTypeahead {
    
    @Input() floatLabelText: string;
     
    constructor(renderer: Renderer2, cdRef: ChangeDetectorRef, @Inject(DOCUMENT) doc: Document, protected formatService: FormattingService, protected windowService: WindowRefService) {
        super(renderer, cdRef, doc, formatService, windowService);
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
