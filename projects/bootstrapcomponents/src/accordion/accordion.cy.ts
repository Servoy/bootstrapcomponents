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
            [tabIndex]="tabIndex"
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

	tabIndex: number;
	tabs: Tab[];
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
                wrapper.component.tabIndex = 2;
                wrapper.fixture.detectChanges();
                cy.wrap(wrapper.component.element.tabIndex).should('eq', 2);

                cy.then(() => {
                    wrapper.component.element.tabIndex = 1;
                    wrapper.fixture.detectChanges();
                    cy.wrap(wrapper.component.element.tabIndex).should('eq', 1);
                });
            });
		});
	});

	it('should handle tabs edit', () => {
		cy.mount(WrapperComponent, config).then((wrapper) => {
			wrapper.component.tabIndex = 2;
            wrapper.fixture.detectChanges();
            cy.wrap(wrapper.component.element.tabIndex).should('eq', 2);

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
				cy.get('button').should('have.length', 4);
				cy.get('button').eq(0).should('have.text', 'tab1');
				cy.get('button').eq(1).should('have.text', 'tab2');
				cy.get('button').eq(2).should('have.text', 'tab3');
				cy.get('button').eq(3).should('have.text', 'tab4');
				cy.wrap(wrapper.component.element.tabIndex).should('eq', 2);

				cy.then(() => {
					const tabs = wrapper.component.tabs.slice();
					tabs.splice(1, 1);
					wrapper.component.tabs = tabs;
					wrapper.fixture.detectChanges();
					cy.get('button').should('have.length', 3);
					cy.get('button').eq(0).should('have.text', 'tab1');
					cy.get('button').eq(1).should('have.text', 'tab3');
					cy.get('button').eq(2).should('have.text', 'tab4');
					cy.wrap(wrapper.component.element.tabIndex).should('eq', 2);

					cy.then(() => {
						const tabs = wrapper.component.tabs.slice();
						tabs.splice(0, 1);
						wrapper.component.tabs = tabs;
						wrapper.fixture.detectChanges();
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