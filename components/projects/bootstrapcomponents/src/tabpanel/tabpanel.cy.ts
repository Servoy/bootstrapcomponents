/* eslint-disable @typescript-eslint/no-unused-expressions */
import { ServoyBootstrapTabpanel, BsTabpanelActiveTabVisibilityListener } from './tabpanel'
import { MountConfig } from 'cypress/angular'
import { ServoyApi, ServoyApiTesting, ServoyPublicTestingModule } from '@servoy/public'
import { Component, ViewChild, signal } from '@angular/core';
import { Tab } from '../bts_basetabpanel';
import { NgbModule, NgbNav, NgbNavItem, NgbNavOutlet, NgbNavLink, NgbNavContent } from '@ng-bootstrap/ng-bootstrap';

@Component({
    template: `
        <bootstrapcomponents-tabpanel
            [servoyApi]="servoyApi"
            [enabled]="enabled()"
            [height]="height()"
            [onChangeMethodID]="onChangeMethodID"
            [onTabClickedMethodID]="onTabClickedMethodID"
            [onTabCloseMethodID]="onTabCloseMethodID"
            [styleClass]="styleClass()"
            [tabIndex]="tabIndex()"
            [tabs]="tabs()"
            [showTabCloseIcon]="showTabCloseIcon()"
            [containerStyleClass]="containerStyleClass()"
            [closeIconStyleClass]="closeIconStyleClass()"
            #element>
        </bootstrapcomponents-tabpanel>
    `,
    standalone: false
})
class WrapperComponent {
    enabled = signal<boolean>(undefined);
    height = signal<number>(undefined);
    onChangeMethodID: (data?: any, e?: Event) => void;
    onTabClickedMethodID: (e?: Event, tabIndex?: number, datatarget?: string) => void;
    onTabCloseMethodID: (e?: Event, data?: any) => void;
    servoyApi: ServoyApi;

    tabIndex = signal<number>(undefined);
    styleClass = signal<string>(undefined);
    tabs = signal<Tab[]>(undefined);
    showTabCloseIcon = signal<boolean>(undefined);
    containerStyleClass = signal<string>(undefined);
    closeIconStyleClass = signal<string>(undefined);

    @ViewChild('element') element: ServoyBootstrapTabpanel;
}

const defaultValues = {
    servoyApi: new ServoyApiTesting(),
    enabled: true,
    height: 100,
    tabIndex: undefined,
    styleClass: undefined,
    showTabCloseIcon: undefined,
    containerStyleClass: undefined,
    closeIconStyleClass: undefined,
    onChangeMethodID: undefined,
    onTabClickedMethodID: undefined,
    onTabCloseMethodID: undefined,
    tabs: [] as Tab[]
};

function createDefaultTabs(): Tab[] {
    const tabs = [];
    let tab = new Tab();
    tab.name = 'tab1';
    tab.containedForm = 'form1';
    tab.text = 'tab1';
    tab.disabled = false;
    tabs[0] = tab;
    tab = new Tab();
    tab.name = 'tab2';
    tab.containedForm = 'form2';
    tab.text = 'tab2';
    tab.disabled = false;
    tabs[1] = tab;
    tab = new Tab();
    tab.name = 'tab3';
    tab.containedForm = 'form3';
    tab.text = 'tab3';
    tab.disabled = false;
    tabs[2] = tab;
    return tabs;
}

function applyDefaultProps(wrapper) {
    for (const key in defaultValues) {
        if (wrapper.component.hasOwnProperty(key) && typeof wrapper.component[key] === 'function') {
            // If the property is a signal, update it using .set()
            if (key === 'tabs' && (!defaultValues[key] || defaultValues[key].length === 0)) {
                wrapper.component[key].set(createDefaultTabs());
            } else {
                wrapper.component[key].set(defaultValues[key]);
            }
        }
        else {
            // Otherwise assign it as a normal property
            wrapper.component[key] = defaultValues[key];
        }
    }
}

describe('ServoyBootstrapTabpanel', () => {
    const configWrapper: MountConfig<WrapperComponent> = {
        declarations: [ServoyBootstrapTabpanel, BsTabpanelActiveTabVisibilityListener],
        imports: [ServoyPublicTestingModule, NgbModule, NgbNav, NgbNavItem, NgbNavOutlet, NgbNavLink, NgbNavContent],
    }

    beforeEach(() => {
        defaultValues.tabs = createDefaultTabs();
    });

    it('should mount and register the component', () => {
        const servoyApiSpy = defaultValues.servoyApi;
        const registerComponent = cy.stub(servoyApiSpy, 'registerComponent');
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            applyDefaultProps(wrapper);
            cy.get('.bts-tabpanel').should('exist').then(() => {
                cy.wrap(registerComponent).should('be.called');
            });
        });
    });


    it('should handle tabs', () => {
        const onChangeMethodID = cy.stub();
        defaultValues.onChangeMethodID = onChangeMethodID;

        const callServerSideApiSpy = cy.stub(defaultValues.servoyApi, 'callServerSideApi');

        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            applyDefaultProps(wrapper);
            cy.get('li').should('have.length', 3);
            cy.get('li span').eq(0).should('have.text', 'tab1');
            cy.get('li span').eq(1).should('have.text', 'tab2');
            cy.get('li span').eq(2).should('have.text', 'tab3');

            cy.get('a').eq(1).click(0, 0, { force: true }).then(() => {
                cy.wrap(callServerSideApiSpy).should('be.calledWith', 'setTabIndexInternal', [2]);
                wrapper.component.tabIndex.set(2);
                wrapper.fixture.detectChanges();
                cy.wrap(wrapper.component.element.tabIndex()).should('eq', 2);

                cy.then(() => {
                    wrapper.component.tabIndex.set(1);
                    wrapper.fixture.detectChanges();
                    cy.wrap(wrapper.component.element.tabIndex()).should('eq', 1);
                });
            });
        });
    });

    it('should handle tabs edit', () => {
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            applyDefaultProps(wrapper);
            wrapper.component.tabIndex.set(2);
            wrapper.fixture.detectChanges();
            cy.wrap(wrapper.component.element.tabIndex()).should('eq', 2);

            cy.then(() => {
                const tab = new Tab();
                tab.name = 'tab4';
                tab.containedForm = 'form4';
                tab.text = 'tab4';
                tab.disabled = false;
                const tabs = wrapper.component.tabs().slice();
                tabs.push(tab);
                wrapper.component.tabs.set(tabs);
                cy.get('li').should('have.length', 4);
                cy.get('li span').eq(0).should('have.text', 'tab1');
                cy.get('li span').eq(1).should('have.text', 'tab2');
                cy.get('li span').eq(2).should('have.text', 'tab3');
                cy.get('li span').eq(3).should('have.text', 'tab4');
                cy.wrap(wrapper.component.element.tabIndex()).should('eq', 2);

                cy.then(() => {
                    const tabs = wrapper.component.tabs().slice();
                    tabs.splice(1, 1);
                    wrapper.component.tabs.set(tabs);
                    cy.get('li').should('have.length', 3);
                    cy.get('li span').eq(0).should('have.text', 'tab1');
                    cy.get('li span').eq(1).should('have.text', 'tab3');
                    cy.get('li span').eq(2).should('have.text', 'tab4');
                    cy.wrap(wrapper.component.element.tabIndex()).should('eq', 2);

                    cy.then(() => {
                        const tabs = wrapper.component.tabs().slice();
                        tabs.splice(0, 1);
                        wrapper.component.tabs.set(tabs);
                        cy.get('li').should('have.length', 2);
                        cy.get('li span').eq(0).should('have.text', 'tab3');
                        cy.get('li span').eq(1).should('have.text', 'tab4');
                        cy.wrap(wrapper.component.element.tabIndex()).should('eq', 2);
                    });
                });
            });
        });
    });

    it('should handle tabs delete', () => {
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            applyDefaultProps(wrapper);
            wrapper.component.tabIndex.set(2);
            wrapper.fixture.detectChanges();
            cy.wrap(wrapper.component.element.tabIndex()).should('eq', 2);

            cy.then(() => {
                const tabs = wrapper.component.tabs().slice();
                tabs.splice(0, 1);
                wrapper.component.tabs.set(tabs);
                wrapper.component.tabIndex.set(1);
                wrapper.fixture.detectChanges();
                cy.get('li').should('have.length', 2);
                cy.get('li span').eq(0).should('have.text', 'tab2');
                cy.get('li span').eq(1).should('have.text', 'tab3');
                cy.wrap(wrapper.component.element.tabIndex()).should('eq', 1);
            });
        });
    });
});
