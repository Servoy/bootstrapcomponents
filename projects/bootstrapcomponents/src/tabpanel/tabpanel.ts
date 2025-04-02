import { Component, Renderer2, SimpleChanges, Input, ChangeDetectorRef, ChangeDetectionStrategy, ViewChild, ElementRef, AfterViewInit, OnDestroy, EventEmitter, Output, HostListener } from '@angular/core';
import { LoggerFactory, LoggerService, WindowRefService } from '@servoy/public';

import { ServoyBootstrapBaseTabPanel, Tab } from '../bts_basetabpanel';
import { NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'bootstrapcomponents-tabpanel',
    templateUrl: './tabpanel.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class ServoyBootstrapTabpanel extends ServoyBootstrapBaseTabPanel<HTMLUListElement> {

    @Input() onTabClickedMethodID: (event: Event, tabIndex: number, datatarget: string) => Promise<boolean>;
    @Input() onTabCloseMethodID: (event: Event, tabIndex: number) => Promise<boolean>;

    @Input() showTabCloseIcon: boolean;
    @Input() closeIconStyleClass: string;
    @Input() cssPosition: { width: string; height: string };
    @Input() containerStyleClass: string;

    containerStyle = { position: 'relative', minHeight: '0px', overflow: 'auto' };

    private visibleTabIndex: number;

    constructor(renderer: Renderer2, cdRef: ChangeDetectorRef, windowRefService: WindowRefService) {
        super(renderer, cdRef, windowRefService);
    }
    
    @HostListener('window:resize')
      onResize(): void {
        if (!this.servoyApi.isInAbsoluteLayout()) {
            this.cdRef.detectChanges();
        }
      }

    svyOnInit() {
        super.svyOnInit();
        if (this.closeIconStyleClass === 'glyphicon glyphicon-remove close-icon') this.closeIconStyleClass = 'fas fa-times';
    }

    svyOnChanges(changes: SimpleChanges) {
        super.svyOnChanges(changes);
        if (this.closeIconStyleClass === 'glyphicon glyphicon-remove close-icon') this.closeIconStyleClass = 'fas fa-times';
    }

    onTabChange(event: NgbNavChangeEvent) {
        // do prevent it by default, so that the server side can decide of the swich can happen.
        event.preventDefault();
    }

    tabClicked(tab: Tab, tabIndexClicked: number, event: Event) {
        if ((event.target as HTMLElement).classList.contains('bts-tabpanel-close-icon')) {
            if (this.onTabCloseMethodID) {
                const promise = this.onTabCloseMethodID(event, tabIndexClicked + 1);
                promise.then((ok) => {
                    if (ok) {
                        this.servoyApi.callServerSideApi('removeTabAt', [tabIndexClicked + 1]);
                    }
                });
            } else {
                this.servoyApi.callServerSideApi('removeTabAt', [tabIndexClicked + 1]);
            }
        } else {
            if (tab.disabled === true) {
                return;
            }

            if (this.onTabClickedMethodID) {
                const dataTargetAttr = (event.target as Element).closest('[data-target]');
                const dataTarget = dataTargetAttr ? dataTargetAttr.getAttribute('data-target') : null;
                const promise = this.onTabClickedMethodID(event, tabIndexClicked + 1, dataTarget);
                promise.then((ok) => {
                    if (ok) {
                        this.servoyApi.callServerSideApi('setTabIndexInternal', [tabIndexClicked +1]);
                    }
                });
            } else {
               this.servoyApi.callServerSideApi('setTabIndexInternal', [tabIndexClicked +1]);
            }
        }
    }

    isTabDisabled(index: number) {
        return this.tabs && this.tabs[index] && this.tabs[index].disabled;
    }

	updateNavpaneTimeout: any;
	updateNavpaneTimeoutCounter: number = 0;
    getContainerStyle(element: HTMLElement) {
        const navpane = element.querySelector('[ngbnavpane]');
        const fullsize = (this.height === '100%');
		if (navpane) {
            if (this.height > 0) this.renderer.setStyle(navpane, 'min-height', this.height + 'px');
            else this.renderer.setStyle(navpane, 'height', '100%');
            this.renderer.setStyle(navpane, 'position', 'relative');
            if (fullsize) {
                const tabs = element.querySelector('ul');
                let calcHeight = tabs.clientHeight;
                const clientRects = tabs.getClientRects();
                if (clientRects && clientRects.length > 0) {
                    calcHeight = tabs.getClientRects()[0].height;
                }
                this.renderer.setStyle(navpane.parentElement, 'height', 'calc(100% - ' + calcHeight + 'px)');
            }
        } else {
            if(this.updateNavpaneTimeoutCounter < 10) {
                this.updateNavpaneTimeoutCounter++;
                this.updateNavpaneTimeout = setTimeout(() => {
                    this.getContainerStyle(element);
                }, 200);
            } 
        }
        
        if (this.cssPosition && this.servoyApi.isInAbsoluteLayout()) {
            const tabs = element.querySelector('ul');
            let calcHeight = tabs.clientHeight;
            const clientRects = tabs.getClientRects();
            if (clientRects && clientRects.length > 0) {
                calcHeight = tabs.getClientRects()[0].height;
            }
            this.containerStyle['height'] = 'calc(100% - ' + calcHeight + 'px)';
            // should we set this to absolute ? it cannot be relative
            delete this.containerStyle.position;
        } else {
            if (fullsize) {
                this.containerStyle['height'] = this.height;
                if (this.getNativeElement()) this.renderer.setStyle(this.getNativeElement(), 'height', '100%');
            } else {
                this.containerStyle['minHeight'] = this.height + 'px';
            }
        }
        this.containerStyle['marginTop'] = (element.offsetWidth < element.scrollWidth ? 8 : 0) + 'px';
        return this.containerStyle;
    }
    
    setCompStyleResponsiveFrm(element: HTMLElement, add: boolean) {
        if (add) {
            element.style.position = 'relative';
            element.style.overflow = 'hidden';
        } else {
            element.style.removeProperty('position');
            element.style.removeProperty('overflow');
        }
    }
    
    showArrows: boolean = false;
    tabHeight: number = 0;
    getNavStyle(element: HTMLElement): { [key: string]: string } {
        const tabs = element.querySelector('ul');
        const tabAnchor = tabs?.firstElementChild?.querySelector('a');
        this.tabHeight = tabAnchor?.getBoundingClientRect()?.height;
        if (tabAnchor) {
            const anchorStyle = getComputedStyle(tabAnchor);
            this.tabHeight = this.tabHeight + parseFloat(anchorStyle.marginTop) + parseFloat(anchorStyle.marginBottom);
        }
        let tabsSize = 0;
        const tabsArray = [...tabs.childNodes].filter(item => item instanceof HTMLElement);
        tabsArray.forEach((item: HTMLElement) => {
            tabsSize += item.getBoundingClientRect().width;
        });
        const style = {width: `${tabsSize}px`, position: 'relative', left: '15px', transition: 'left 0.5s ease-in-out', height: `${this.tabHeight}px`}
        const elementWidth = Math.ceil(element.getBoundingClientRect().width);
        if (Math.round(tabsSize) > elementWidth) {
            this.showArrows = true;
        } else {
            this.showArrows = false;
            delete style.left;
            delete style.width;
        }
        if (!this.servoyApi.isInAbsoluteLayout() && this.showArrows) {
            this.setCompStyleResponsiveFrm(element, true);
        } else {
            this.setCompStyleResponsiveFrm(element, false);
        }

        return style;
    }
    
    getArrowStyle(leftRight: 'left' | 'right'): { [key: string]: string } {
        const cursorStyle = leftRight === 'left' ? 'not-allowed' : 'pointer';
        return {
            width: '15px',
            position: 'absolute',
            top: '0px',
            height: `${this.tabHeight}px`,
            background: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: cursorStyle,
            [leftRight]: '0px'
        };
    }
    
    clickArrow(element: HTMLElement, moveRight: boolean) {
        const arrowLeft: HTMLElement = element.querySelector('#arrowLeft');
        const arrowRight: HTMLElement = element.querySelector('#arrowRight');
        if ((moveRight && arrowRight.style.cursor === 'not-allowed') || (!moveRight && arrowLeft.style.cursor === 'not-allowed')) return;
        const tabs: HTMLElement = element.querySelector('ul');
        const tabSize = tabs.firstElementChild.getBoundingClientRect().width;
        const oldValue = parseFloat(tabs.style.left) || 0;
        const compWidth = tabs.closest('bootstrapcomponents-tabpanel').getBoundingClientRect().width;
        const maxRight = tabs.clientWidth - compWidth;
        let newValue = oldValue + (moveRight ? -tabSize : tabSize);
        if (moveRight && newValue * -1 > maxRight) {
            newValue = -maxRight - 15;
            arrowRight.style.cursor = 'not-allowed';
        } else if (!moveRight && newValue * -1 < 15) {
            newValue = 15;
            arrowLeft.style.cursor = 'not-allowed';
        }
        moveRight ? (arrowLeft.style.cursor = 'pointer') : (arrowRight.style.cursor = 'pointer');
        tabs.style.left = `${newValue}px`;
    }

    onVisibleTab(tab: Tab) {
        this.visibleTabIndex = this.getTabIndex(tab);
    }

    getForm(tab: Tab) {
        return this.visibleTabIndex === this.getTabIndex(tab) ? super.getForm(tab) : null;
    }
}

@Component({
    selector: 'bootstrapcomponents-tabpanel-active-tab-visibility-listener',
    template: '<div #element></div>',
    standalone: false
})
export class BsTabpanelActiveTabVisibilityListener implements AfterViewInit, OnDestroy {

    @Input() tab: Tab;
    @Output() visibleTab: EventEmitter<Tab> = new EventEmitter();

    @ViewChild('element') elementRef: ElementRef;

    observer: MutationObserver;
    log: LoggerService;

    constructor(logFactory: LoggerFactory) {
        this.log = logFactory.getLogger('bts-tabpanel');
    }

    ngAfterViewInit(): void {
        if (typeof MutationObserver !== 'undefined') {
            const tabNode = this.elementRef.nativeElement.parentNode.parentNode;

            this.observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.attributeName === 'class') {
                        const oldValueA = mutation.oldValue ? mutation.oldValue.split(' ') : [];
                        if (oldValueA.indexOf('active') === -1 && mutation.target['classList'].contains('active')) {
                            this.visibleTab.emit(this.tab);
                        }
                    }
                });
            });

            this.observer.observe(tabNode, {
                attributes: true,
                attributeOldValue: true
            });
        } else {
            this.log.warn('MutationObserver not available, bootstrapcomponents-tabpanel may not work correctly.');
            this.visibleTab.emit(this.tab);
        }
    }

    ngOnDestroy(): void {
        if (this.observer) {
            this.observer.disconnect();
        }
    }
}
