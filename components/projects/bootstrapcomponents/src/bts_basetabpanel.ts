import { Renderer2, Input, Output, EventEmitter, SimpleChanges, ContentChild, TemplateRef, Directive, ChangeDetectorRef } from '@angular/core';
import { WindowRefService, BaseCustomObject } from '@servoy/public';
import { ServoyBootstrapBaseComponent } from './bts_basecomp';

@Directive()
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export class ServoyBootstrapBaseTabPanel<T extends HTMLElement> extends ServoyBootstrapBaseComponent<T> {
	@Input() onChangeMethodID: (previousIndex: number, event: Event) => void;

	@Input() height: any;
	@Input() tabs: Array<Tab>;

	@Input() tabIndex: number;
	@Output() tabIndexChange = new EventEmitter();

	@Input() activeTabIndex: number;
	@Output() activeTabIndexChange = new EventEmitter();

	@ContentChild(TemplateRef, { static: true })
	templateRef: TemplateRef<any>;

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
		if (changes['tabIndex'] && changes['tabIndex'].previousValue && changes['tabIndex'].previousValue !== changes['tabIndex'].currentValue && this.onChangeMethodID) {
			this.onChangeMethodID(changes['tabIndex'].previousValue, this.windowRefService.nativeWindow.event != null ? this.windowRefService.nativeWindow.event : null /* TODO $.Event("change") */);
		}
		super.svyOnChanges(changes);
	}

	getForm(tab: Tab) {
		var selectedTab = this.tabs[this.getRealTabIndex()];
		if (selectedTab && (tab.containedForm === selectedTab.containedForm) && (tab.relationName === selectedTab.relationName)) {
			return tab.containedForm;
		}
		return null;
	}

	getSelectedTabId() {
		if (this.tabs && this.tabs.length > 0 && !this.tabs[0]._id) {
			this.generateIDs();
		}
		const tabIndex = this.getRealTabIndex();
		if (tabIndex > 0) {
			if (this.tabs[tabIndex]) {
				return this.tabs[tabIndex]._id;
			}
		} else if (this.tabs && this.tabs.length > 0) return this.tabs[0]._id;
		return null;
	}

	getRealTabIndex(): number {
		if (this.tabIndex) {
			return this.tabIndex - 1;
		}
		if (this.tabs && this.tabs.length > 0) return 0;
		return -1;
	}

	isValidTab(tab: Tab) {
		if (this.tabs) {
			for (const t of this.tabs) {
				if (t === tab) {
					return true;
				}
			}
		}
		return false;
	}

	getTabIndex(tab: Tab) {
		if (tab) {
			for (let i = 0; i < this.tabs.length; i++) {
				if (this.tabs[i] === tab) {
					return i + 1;
				}
			}
		}
		return -1;
	}

	private generateIDs() {
		if (this.tabs) {
			for (let i = 0; i < this.tabs.length; i++) {
				this.tabs[i]._id = this.servoyApi.getMarkupId() + '_tab_' + i;
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
