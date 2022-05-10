import { Component, Renderer2, Input, SimpleChanges, ChangeDetectorRef, ViewChild, ViewChildren, QueryList, ElementRef, HostListener, ChangeDetectionStrategy, Inject } from '@angular/core';
import { ServoyBootstrapCombobox } from '../combobox/combobox';
import { FormattingService} from '@servoy/public';
import { DOCUMENT } from '@angular/common';

@Component({
    selector: 'bootstrapcomponents-floatlabelcombobox',
    templateUrl: './floatlabelcombobox.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServoyFloatLabelBootstrapCombobox extends ServoyBootstrapCombobox{

    @Input() floatLabelText: string;

    constructor(renderer: Renderer2, protected cdRef: ChangeDetectorRef, protected formatService: FormattingService, @Inject(DOCUMENT) doc: Document) {
        super(renderer, cdRef,formatService, doc);
    }

}
