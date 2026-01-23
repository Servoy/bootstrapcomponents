import { Component, Renderer2, SimpleChanges, ElementRef, ChangeDetectorRef, ChangeDetectionStrategy, viewChild } from '@angular/core';
import { WindowRefService, ServoyPublicService } from '@servoy/public';

import { ServoyBootstrapBaseTabPanel,Tab } from '../bts_basetabpanel';

@Component({
    selector: 'bootstrapcomponents-accordion',
    templateUrl: './accordion.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class ServoyBootstrapAccordion extends ServoyBootstrapBaseTabPanel<HTMLDivElement> {

    readonly contentElementRef = viewChild('content', { read: ElementRef });
    panelHeight: number;
    
    formHeightMap: { [formName: string]: number } = {};

    constructor(renderer: Renderer2,protected cdRef: ChangeDetectorRef, windowRefService: WindowRefService, protected servoyPublic: ServoyPublicService) {
        super(renderer,cdRef, windowRefService);
     }

    svyOnChanges( changes: SimpleChanges ) {
        if (changes['height'] || changes['tabs'] || changes['tabIndex']) {
            const currentTab = this.tabs()?.[this.getRealTabIndex()];
            const formName = currentTab?.containedForm;

            if (formName) {
                const cachedHeight = this.formHeightMap[formName];
                if (cachedHeight) {
                    this.updateContentHeight();
                } else {
                    this.getFormState(formName, currentTab, true);
                }
            }
        }
        super.svyOnChanges(changes);
    }

    svyOnInit() {
       super.svyOnInit();
       this.updateContentHeight();
    }

    private updateContentHeight() {
        const tabs = this.tabs();
        const currentTab = tabs?.[this.getRealTabIndex()];
        const formName = currentTab?.containedForm;
        if (formName && this.formHeightMap[formName]) {
            this.panelHeight = this.formHeightMap[formName];
            this.cdRef.detectChanges();
            return;
        }
        
        const height = this.height();
        let totalHeight = typeof height === 'string' ? parseInt(height, 10) : height;
        let paneHeight = 49;
        let borderWidth = 2;
        let wrapper = null;
        const contentElementRef = this.contentElementRef();
        if (contentElementRef) {
            wrapper = contentElementRef.nativeElement.closest('.svy-wrapper');
        }
        if (wrapper) {
            totalHeight = wrapper.offsetHeight;
        }
        if (tabs && tabs.length > 0) {
            const headerElement = this.getNativeElement().querySelector('.accordion-header') as HTMLDivElement;
            if (headerElement){
                paneHeight = headerElement.offsetHeight;
            }

            if (paneHeight * tabs.length + borderWidth + 50 <= totalHeight) {
                // If all headers fit, use remaining space
                totalHeight = totalHeight - paneHeight * tabs.length - borderWidth;
            } else {
                // Not enough space: show current tab + one extra
                totalHeight = totalHeight - (paneHeight * 2) - (borderWidth * 2);
            }
        }
        this.panelHeight = totalHeight;
        
        if (this.servoyApi.isInDesigner()){
			if (tabs === undefined || tabs.length === 0 || (tabs.length > 0 && !contentElementRef)){
				this.elementRef.nativeElement.style.display = "block";
				if (!this.servoyApi.isInAbsoluteLayout()) {  // responsive form
					this.elementRef.nativeElement.style.minHeight = `${this.height()}px`;
				} else { // css pos
					this.elementRef.nativeElement.style.height = '100%';
					this.elementRef.nativeElement.style.width = '100%';
				}
			}  	
	   	}
    }

    getSelectedTabId() : any{
        let id = super.getSelectedTabId();
        if (id == null) return [];
        return id;
    }
    
    tabClicked(tab: Tab,tabIndexClicked: number, event){
       this.servoyApi.callServerSideApi('setTabIndexInternal', [tabIndexClicked +1]);
    }
    
    private getFormState(form: string, tab: Tab, formWillShow: boolean) {
        if (formWillShow) {
            this.servoyApi.formWillShow(form, ('relationName' in tab) ? tab.relationName : null).then(() => {
                const formCache = this.servoyPublic.getFormCacheByName(form);
                if (formCache && formCache.absolute) {
                    this.formHeightMap[form] = formCache.size.height;
                    this.panelHeight = this.formHeightMap[form];
                    this.cdRef.detectChanges();
                }
            });
        }
    }
}
