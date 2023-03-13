import { Component, Renderer2, ViewChild, SimpleChanges, ElementRef, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { WindowRefService } from '@servoy/public';

import { ServoyBootstrapBaseTabPanel,Tab } from '../bts_basetabpanel';
import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'bootstrapcomponents-accordion',
  templateUrl: './accordion.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServoyBootstrapAccordion extends ServoyBootstrapBaseTabPanel<HTMLDivElement> {

    @ViewChild('content', { static: false, read: ElementRef}) contentElementRef: ElementRef<HTMLDivElement>;
    panelHeight: number;

    constructor(renderer: Renderer2,protected cdRef: ChangeDetectorRef, windowRefService: WindowRefService) {
        super(renderer,cdRef, windowRefService);
     }

    svyOnChanges( changes: SimpleChanges ) {
        if ( changes['height']) {
            this.updateContentHeight();
        }
        super.svyOnChanges(changes);
    }

    svyOnInit() {
       super.svyOnInit();
       this.updateContentHeight();
    }

    private updateContentHeight() {
        let totalHeight = this.height;
        let paneHeight = 49;
        let borderWidth = 2;
        let wrapper = null;
        if (this.contentElementRef) {
            wrapper = this.contentElementRef.nativeElement.closest('.svy-wrapper');
        }
        if (wrapper) {
            totalHeight = wrapper.offsetHeight;
        }
        if (this.tabs && this.tabs.length > 0) {
            const headerElement = this.getNativeElement().querySelector('.accordion-header') as HTMLDivElement;
            if (headerElement){
                paneHeight = headerElement.offsetHeight;
            }
            totalHeight = totalHeight - paneHeight * this.tabs.length - borderWidth ;
        }
        this.panelHeight = totalHeight;
    }

    onTabChange( event: NgbPanelChangeEvent ) {
        // do prevent it by default, so that hte server side can decide of the swich can happen.
        event.preventDefault();
    }

    selectTabAt( selectionIndex: number ) {
        if ( selectionIndex >= 0 && selectionIndex < this.tabs.length ) {
            let tabToSelect = this.tabs[selectionIndex];
            if ( tabToSelect.disabled == true ) {
                return;
            }
            this.select( tabToSelect );
        }
    }
    
    getSelectedTabId() : any{
        let id = super.getSelectedTabId();
        if (id == null) return [];
        return id;
    }
    
    tabClicked(tab: Tab,tabIndexClicked: number, event){
        this.select( this.tabs[tabIndexClicked] );
    }
}
