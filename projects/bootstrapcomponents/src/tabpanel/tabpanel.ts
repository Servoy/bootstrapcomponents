import { Component, Renderer2, SimpleChanges, Input, ChangeDetectorRef, ChangeDetectionStrategy, ViewChild, ElementRef, AfterViewInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { LoggerFactory, LoggerService, WindowRefService } from '@servoy/public';

import { ServoyBootstrapBaseTabPanel, Tab } from '../bts_basetabpanel';
import { NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'bootstrapcomponents-tabpanel',
    templateUrl: './tabpanel.html',
    changeDetection: ChangeDetectionStrategy.OnPush
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

    svyOnInit() {
        super.svyOnInit();
        if (this.closeIconStyleClass === 'glyphicon glyphicon-remove close-icon') this.closeIconStyleClass = 'fas fa-times';
		if (this.tabs && this.tabIndex > 0 && this.isTabDisabled(this.tabIndex -1)) {
			this.selectTabAt(this.getFirstEnabledTabIndex()-1);
		}
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
                        this.select(this.tabs[tabIndexClicked]);
                    }
                });
            } else {
                this.select(this.tabs[tabIndexClicked]);
            }
        }
    }

    selectTabAt(selectionIndex: number) {
        if (selectionIndex >= 0 && selectionIndex < this.tabs.length) {
            const tabToSelect = this.tabs[selectionIndex];
            if (tabToSelect.disabled === true) {
                return;
            }
            if (this.onTabClickedMethodID) {
                /*var dataTargetAttr = $(event.target).closest('[data-target]');
                var dataTarget = dataTargetAttr ? dataTargetAttr.attr('data-target') : null;*/
                const promise = this.onTabClickedMethodID(this.windowRefService.nativeWindow.event != null ?
                    this.windowRefService.nativeWindow.event : null /*$.Event("tabclicked")*/, selectionIndex, null);
                promise.then((ok) => {
                    if (ok) {
                        this.select(tabToSelect);
                    }
                });
            } else {
                this.select(tabToSelect);
            }
        }
    }

    getFirstEnabledTabIndex() {
        for (let i = 0; this.tabs && i < this.tabs.length; i++) {
            const tab = this.tabs[i];
            if (tab.disabled !== true) {
                return i + 1;
            }
        }
        return -1;
    }

    isTabDisabled(index: number) {
		return this.tabs && this.tabs[index] && this.tabs[index].disabled;
	}

    getContainerStyle(element: HTMLElement) {
        const navpane = element.querySelector('[ngbnavpane]');
        const fullsize = (this.height === '100%');
        if (navpane) {
            if (this.height > 0) this.renderer.setStyle(navpane, 'min-height', this.height + 'px');
            else this.renderer.setStyle(navpane, 'height', '100%');
            this.renderer.setStyle(navpane, 'position', 'relative');
            if (fullsize) {
                const tabs = element.querySelector('ul');
                this.renderer.setStyle(navpane.parentElement, 'height', 'calc(100% - ' + tabs.getClientRects()[0].height + 'px)');
            }
        }
        if (this.cssPosition && this.servoyApi.isInAbsoluteLayout()) {
            const tabs = element.querySelector('ul');
            this.containerStyle['height'] = 'calc(100% - ' + tabs.getClientRects()[0].height + 'px)';
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

    onVisibleTab(tab: Tab) {
        this.visibleTabIndex = this.getTabIndex(tab);
    }

    getForm(tab: Tab) {
        return this.visibleTabIndex === this.getTabIndex(tab) ? super.getForm(tab) : null;
    }
}

@Component({
    selector: 'bootstrapcomponents-tabpanel-active-tab-visibility-listener',
    template: '<div #element></div>'
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
