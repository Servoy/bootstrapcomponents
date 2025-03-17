/* eslint-disable @typescript-eslint/no-unused-expressions */
import { ServoyBootstrapAccordion } from './accordion'
import { MountConfig } from 'cypress/angular'
import { ServoyApi, ServoyApiTesting, ServoyPublicTestingModule } from '@servoy/public'
import { Component, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { Tab } from '../bts_basetabpanel';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
    template: `
        <bootstrapcomponents-accordion
            [servoyApi]="servoyApi"
            [enabled]="enabled"
            [height]="height"
            [onChangeMethodID]="onChangeMethodID"
            [styleClass]="styleClass"
            [tabSeq]="tabSeq"
            [tabs]="tabs"
            #element>
        </bootstrapcomponents-accordion>
    `,
    standalone: false
})
class WrapperComponent {
    enabled: boolean;
    height: number;

    onChangeMethodID: (data?: any, e?: Event) => void;
    servoyApi: ServoyApi;

    tabSeq: number;
    styleClass: string;

    @ViewChild('element') element: ServoyBootstrapAccordion;
}

describe('ServoyBootstrapAccordion', () => {
    const servoyApiSpy = new ServoyApiTesting();

    const config: MountConfig<ServoyBootstrapAccordion> = {
        declarations: [ServoyBootstrapAccordion],
        imports: [ServoyPublicTestingModule, NgbModule],
    }

    beforeEach(() => {
        const tabs = [];
        let tab = new Tab();
        tab.name = 'tab1';
        tab.containedForm = 'form1';
        tab.text = 'tab1';
        tabs[0] = tab;
        tab = new Tab();
        tab.name = 'tab2';
        tab.containedForm = 'form2';
        tab.text = 'tab2';
        tabs[1] = tab;
        tab = new Tab();
        tab.name = 'tab3';
        tab.containedForm = 'form3';
        tab.text = 'tab3';
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
            cy.get('.bts-accordion').should('exist').then(() => {
                cy.wrap(registerComponent).should('be.called');
            });
        });
    });


    it('should handle tabs', () => {
        const onChangeMethodID = cy.stub();
        config.componentProperties.onChangeMethodID = onChangeMethodID;

        cy.mount(WrapperComponent, config).then((wrapper) => {
            // Check if all tabs exist and have correct text
            cy.get('button').should('have.length', 3);
            cy.get('button').eq(0).should('have.text', 'tab1');
            cy.get('button').eq(1).should('have.text', 'tab2');
            cy.get('button').eq(2).should('have.text', 'tab3');

            cy.get('button').eq(1).click().then(() => {
                cy.wrap(onChangeMethodID).should('have.been.called');
                cy.wrap(wrapper.component.element).should('have.property', 'tabIndex', 2);

                cy.wrap(wrapper).then(() => {
                    wrapper.component.element.tabIndex = 1;
                    wrapper.component.element.svyOnChanges({ 'tabIndex': new SimpleChange(2, 1, false) });
                    wrapper.fixture.detectChanges();

                    cy.wrap(onChangeMethodID).should('have.been.calledTwice');
                });
            });
        });
    });

    it('should handle tabs edit', () => {
        cy.mount(WrapperComponent, config).then((wrapper) => {
            cy.wrap(wrapper.component.element.tabIndex).should('eq', 1);

            wrapper.component.element.selectTabAt(1);
            cy.wrap(wrapper).then(() => {
                cy.wrap(wrapper.component.element.tabIndex).should('eq', 2);
            });

            cy.wrap(wrapper).then(() => {
                const tab = new Tab();
                tab.name = 'tab4';
                tab.containedForm = 'form4';
                tab.text = 'tab4';
                wrapper.component.element.tabs.push(tab);
                wrapper.component.element.svyOnChanges({ 'tabs': new SimpleChange(null, wrapper.component.element.tabs, false) });
                wrapper.fixture.detectChanges();

                cy.wrap(wrapper).then(() => {
                    cy.get('button').should('have.length', 4);
                    cy.get('button').eq(0).should('have.text', 'tab1');
                    cy.get('button').eq(1).should('have.text', 'tab2');
                    cy.get('button').eq(2).should('have.text', 'tab3');
                    cy.get('button').eq(3).should('have.text', 'tab4');
                    cy.wrap(wrapper.component.element.tabIndex).should('eq', 2);

                    wrapper.component.element.tabs.splice(1, 1);
                    wrapper.component.element.svyOnChanges({ 'tabs': new SimpleChange(null, wrapper.component.element.tabs, false) });
                    wrapper.fixture.detectChanges();
                    cy.wrap(wrapper).then(() => {
                        cy.get('button').should('have.length', 3);
                        cy.get('button').eq(0).should('have.text', 'tab1');
                        cy.get('button').eq(1).should('have.text', 'tab3');
                        cy.get('button').eq(2).should('have.text', 'tab4');
                        cy.wrap(wrapper.component.element.tabIndex).should('eq', 2);

                        wrapper.component.element.tabs.splice(0, 1);
                        wrapper.component.element.svyOnChanges({ 'tabs': new SimpleChange(null, wrapper.component.element.tabs, false) });
                        wrapper.fixture.detectChanges();
                        cy.wrap(wrapper).then(() => {
                            cy.get('button').should('have.length', 2);
                            cy.get('button').eq(0).should('have.text', 'tab3');
                            cy.get('button').eq(1).should('have.text', 'tab4');
                            cy.wrap(wrapper.component.element.tabIndex).should('eq', 2);
                        });
                    });
                });
            });
        });
    });
});