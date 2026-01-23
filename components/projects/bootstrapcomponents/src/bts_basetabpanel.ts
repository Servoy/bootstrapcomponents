import { Renderer2, SimpleChanges, TemplateRef, Directive, ChangeDetectorRef, input, output, contentChild } from '@angular/core';
import { WindowRefService, BaseCustomObject } from '@servoy/public';
import { ServoyBootstrapBaseComponent } from './bts_basecomp';

@Directive()
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export class ServoyBootstrapBaseTabPanel<T extends HTMLElement> extends ServoyBootstrapBaseComponent<T> {
	readonly onChangeMethodID = input<(previousIndex: number, event: Event, newIndex: number) => void>(undefined);

	readonly height = input<any>(undefined);
	readonly tabs = input<Array<Tab>>(undefined);

	readonly tabIndex = input<number>(undefined);
	readonly tabIndexChange = output();

	readonly activeTabIndex = input<number>(undefined);
	readonly activeTabIndexChange = output();

	readonly templateRef = contentChild(TemplateRef);

	constructor(renderer: Renderer2, protected cdRef: ChangeDetectorRef, protected windowRefService: WindowRefService) {
		super(renderer, cdRef);
	}

	ngOnInit() {
		super.ngOnInit();
		this.generateIDs();
	}

	svyOnChanges(changes: SimpleChanges) {
		if (changes['tabs']) {
			// quickly generate the id's for a the tab html id (and selecting it)
			this.generateIDs();
		}
		const onChangeMethodID = this.onChangeMethodID();
        if (changes['tabIndex'] && changes['tabIndex'].previousValue && changes['tabIndex'].previousValue !== changes['tabIndex'].currentValue && onChangeMethodID) {
            onChangeMethodID(changes['tabIndex'].previousValue, this.windowRefService.nativeWindow.event != null ? this.windowRefService.nativeWindow.event : null /* TODO $.Event("change") */, changes['tabIndex'].currentValue);
        }
		super.svyOnChanges(changes);
	}

	getForm(tab: Tab) {
		var selectedTab = this.tabs()[this.getRealTabIndex()];
		if (selectedTab && (tab.containedForm === selectedTab.containedForm) && (tab.relationName === selectedTab.relationName)) {
			return tab.containedForm;
		}
		return null;
	}

	getSelectedTabId() {
		const tabs = this.tabs();
        if (tabs && tabs.length > 0 && !tabs[0]._id) {
            this.generateIDs();
        }
		const tabIndex = this.getRealTabIndex();
		if (tabIndex > 0) {
			if (tabs[tabIndex]) {
				return tabs[tabIndex]._id;
			}
		} else if (tabs && tabs.length > 0) return tabs[0]._id;
		return null;
	}

	getRealTabIndex(): number {
		const tabIndex = this.tabIndex();
        if (tabIndex) {
            return tabIndex - 1;
        }
		const tabs = this.tabs();
        if (tabs && tabs.length > 0) return 0;
        return -1;
    }

    isValidTab(tab: Tab) {
        const tabs = this.tabs();
        if (tabs) {
            for (const t of tabs) {
                if (t === tab) {
                    return true;
                }
            }
        }
        return false;
    }

	getTabIndex(tab: Tab) {
		if (tab) {
			for (let i = 0; i < this.tabs().length; i++) {
				if (this.tabs()[i] === tab) {
					return i + 1;
				}
			}
		}
		return -1;
	}

    private generateIDs() {
        const tabs = this.tabs();
        if (tabs) {
            for (let i = 0;i < tabs.length;i++) {
                tabs[i]._id = this.servoyApi.getMarkupId() + '_tab_' + i;
            }
        }
    }
}

export class Tab extends BaseCustomObject {
	_id: string;
	name: string;
	containedForm: string;
	text: string;
	relationName: string;
	disabled: boolean;
	imageMediaID: string;
	hideCloseIcon: boolean;
	iconStyleClass: string;
	styleClass: string;
	toolTipText: string;
}
