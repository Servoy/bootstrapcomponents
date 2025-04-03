/* eslint-disable @typescript-eslint/no-unused-expressions */
import { ServoyBootstrapTabpanel, BsTabpanelActiveTabVisibilityListener } from './tabpanel'
import { MountConfig } from 'cypress/angular'
import { ServoyApi, ServoyApiTesting, ServoyPublicTestingModule } from '@servoy/public'
import { Component, SimpleChange, ViewChild } from '@angular/core';
import { Tab } from '../bts_basetabpanel';
import { NgbModule, NgbNav, NgbNavItem, NgbNavOutlet, NgbNavLink, NgbNavContent } from '@ng-bootstrap/ng-bootstrap';

@Component({
    template: `
        <bootstrapcomponents-tabpanel
            [servoyApi]="servoyApi"
            [enabled]="enabled"
            [height]="height"
            [onChangeMethodID]="onChangeMethodID"
            [onTabClickedMethodID]="onTabClickedMethodID"
            [onTabCloseMethodID]="onTabCloseMethodID"
            [styleClass]="styleClass"
            [tabIndex]="tabIndex"
            [tabs]="tabs"
            [showTabCloseIcon]="showTabCloseIcon"
            [containerStyleClass]="containerStyleClass"
            [closeIconStyleClass]="closeIconStyleClass"
            #element>
        </bootstrapcomponents-tabpanel>
    `,
    standalone: false
})
class WrapperComponent {
    enabled: boolean;
    height: number;
    onChangeMethodID: (data?: any, e?: Event) => void;
    onTabClickedMethodID: (e?: Event, tabIndex?: number, datatarget?: string) => void;
    onTabCloseMethodID: (e?: Event, data?: any) => void;
    servoyApi: ServoyApi;

    tabIndex: number;
    styleClass: string;
    tabs: Tab[];
    showTabCloseIcon: boolean;
    containerStyleClass: string;
    closeIconStyleClass: string;

    @ViewChild('element') element: ServoyBootstrapTabpanel;
}

describe('ServoyBootstrapTabpanel', () => {
    const servoyApiSpy = new ServoyApiTesting();

    const config: MountConfig<ServoyBootstrapTabpanel> = {
        declarations: [ServoyBootstrapTabpanel, BsTabpanelActiveTabVisibilityListener],
        imports: [ServoyPublicTestingModule, NgbModule, NgbNav, NgbNavItem, NgbNavOutlet, NgbNavLink, NgbNavContent],
    }

    beforeEach(() => {
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
        config.componentProperties = {
            servoyApi: servoyApiSpy,
            enabled: true,
            tabs: tabs,
            height: 100,
        }
    });

    it('should mount and register the component', () => {
        const registerComponent = cy.stub(servoyApiSpy, 'registerComponent');
        cy.mount(WrapperComponent, config).then(() => {
            cy.get('.bts-tabpanel').should('exist').then(() => {
                cy.wrap(registerComponent).should('be.called');
            });
        });
    });


    it('should handle tabs', () => {
        const onChangeMethodID = cy.stub();
        config.componentProperties.onChangeMethodID = onChangeMethodID;

        cy.mount(WrapperComponent, config).then((wrapper) => {
            cy.get('li').should('have.length', 3);
            cy.get('li span').eq(0).should('have.text', 'tab1');
            cy.get('li span').eq(1).should('have.text', 'tab2');
            cy.get('li span').eq(2).should('have.text', 'tab3');

            cy.get('a').eq(1).click(0, 0, {force: true}).then(() => {
                wrapper.component.tabIndex = 2;
                cy.wrap(wrapper.component.element).should('have.property', 'tabIndex', 2);

                cy.then(() => {
                    wrapper.component.tabIndex = 1;
                    wrapper.fixture.detectChanges();
                    cy.wrap(wrapper.component.element).should('have.property', 'tabIndex', 1);
                });
            });
        });
    });

    it('should handle tabs edit', () => {
        cy.mount(WrapperComponent, config).then((wrapper) => {
            wrapper.component.tabIndex = 2;
			wrapper.fixture.detectChanges();
            cy.wrap(wrapper.component.element).should('have.property', 'tabIndex', 2);
						
            cy.then(() => {
                const tab = new Tab();
                tab.name = 'tab4';
                tab.containedForm = 'form4';
                tab.text = 'tab4';
                tab.disabled = false;
                const tabs = wrapper.component.tabs.slice();
                tabs.push(tab);
                wrapper.component.tabs = tabs;
                wrapper.fixture.detectChanges();
                cy.get('li').should('have.length', 4);
                cy.get('li span').eq(0).should('have.text', 'tab1');
                cy.get('li span').eq(1).should('have.text', 'tab2');
                cy.get('li span').eq(2).should('have.text', 'tab3');
                cy.get('li span').eq(3).should('have.text', 'tab4');
                cy.wrap(wrapper.component.element.tabIndex).should('eq', 2);

                cy.then(() => {
                    const tabs =wrapper.component.tabs.slice();
                    tabs.splice(1, 1);
                    wrapper.component.tabs = tabs;
                    wrapper.fixture.detectChanges();
                    cy.get('li').should('have.length', 3);
                    cy.get('li span').eq(0).should('have.text', 'tab1');
                    cy.get('li span').eq(1).should('have.text', 'tab3');
                    cy.get('li span').eq(2).should('have.text', 'tab4');
                    cy.wrap(wrapper.component.element.tabIndex).should('eq', 2);

                    cy.then(() => {
                        const tabs =wrapper.component.tabs.slice();
                        tabs.splice(0, 1);
                        wrapper.component.tabs = tabs;
                        wrapper.fixture.detectChanges();
                        cy.get('li').should('have.length', 2);
                        cy.get('li span').eq(0).should('have.text', 'tab3');
                        cy.get('li span').eq(1).should('have.text', 'tab4');
                        cy.wrap(wrapper.component.element.tabIndex).should('eq', 2);
                    });
                });
            });
        });
    });
});