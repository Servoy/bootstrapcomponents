import { Component, SimpleChanges, ElementRef, ChangeDetectorRef, ChangeDetectionStrategy, viewChild, inject } from '@angular/core';
import { ServoyPublicService, ServoyPublicModule } from '@servoy/public';
import { NgTemplateOutlet } from '@angular/common';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';

import { ServoyBootstrapBaseTabPanel,Tab } from '../bts_basetabpanel';

@Component({
    selector: 'bootstrapcomponents-accordion',
    templateUrl: './accordion.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [ServoyPublicModule, NgTemplateOutlet, NgbAccordionModule]
})
export class ServoyBootstrapAccordion extends ServoyBootstrapBaseTabPanel<HTMLDivElement> {

    readonly contentElementRef = viewChild('content', { read: ElementRef });
    panelHeight!: number;
    
    formHeightMap: Record<string, number> = {};

    protected readonly cdRef = inject(ChangeDetectorRef);
    protected readonly servoyPublic = inject(ServoyPublicService);

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
        const borderWidth = 2;
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
        
        if (this.servoyApi().isInDesigner()){
			if (tabs === undefined || tabs.length === 0 || (tabs.length > 0 && !contentElementRef)){
				this.elementRef()!.nativeElement.style.display = 'block';
				if (!this.servoyApi().isInAbsoluteLayout()) {  // responsive form
					this.elementRef()!.nativeElement.style.minHeight = `${this.height()}px`;
				} else { // css pos
					this.elementRef()!.nativeElement.style.height = '100%';
					this.elementRef()!.nativeElement.style.width = '100%';
				}
			}  	
	   	}
    }

    getSelectedTabId() : any{
        const id = super.getSelectedTabId();
        if (id == null) return [];
        return id;
    }
    
    tabClicked(_tab: Tab,tabIndexClicked: number, _event: any){
       this.servoyApi().callServerSideApi('setTabIndexInternal', [tabIndexClicked +1]);
    }
    
    private getFormState(form: string, tab: Tab, formWillShow: boolean) {
        if (formWillShow) {
            this.servoyApi().formWillShow(form, ('relationName' in tab) ? tab.relationName : undefined).then(() => {
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
