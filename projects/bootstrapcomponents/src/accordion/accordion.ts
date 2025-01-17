import { Component, Renderer2, ViewChild, SimpleChanges, ElementRef, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { WindowRefService } from '@servoy/public';

import { ServoyBootstrapBaseTabPanel,Tab } from '../bts_basetabpanel';

@Component({
    selector: 'bootstrapcomponents-accordion',
    templateUrl: './accordion.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class ServoyBootstrapAccordion extends ServoyBootstrapBaseTabPanel<HTMLDivElement> {

    @ViewChild('content', { static: false, read: ElementRef}) contentElementRef: ElementRef<HTMLDivElement>;
    panelHeight: number;

    constructor(renderer: Renderer2,protected cdRef: ChangeDetectorRef, windowRefService: WindowRefService) {
        super(renderer,cdRef, windowRefService);
     }

    svyOnChanges( changes: SimpleChanges ) {
        if (changes['height'] || changes['tabs']) {
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
        
        if (this.servoyApi.isInDesigner()){
			if (this.tabs === undefined || this.tabs.length === 0 || (this.tabs.length > 0 && !this.contentElementRef)){
				this.elementRef.nativeElement.style.display = "block";
				if (!this.servoyApi.isInAbsoluteLayout()) {  // responsive form
					this.elementRef.nativeElement.style.minHeight = `${this.height}px`;
				} else { // css pos
					this.elementRef.nativeElement.style.height = '100%';
					this.elementRef.nativeElement.style.width = '100%';
				}
			}  	
	   	}
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
