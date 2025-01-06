import { Component, ViewChild } from '@angular/core';
import { ServoyBootstrapTextarea } from './textarea';
import { ServoyApi, ServoyApiTesting, ServoyPublicTestingModule } from '@servoy/public';
import { MountConfig } from 'cypress/angular';
import { FormsModule } from '@angular/forms';

@Component({
    template: `<bootstrapcomponents-textarea
                [servoyApi]="servoyApi" 
                [maxLength]="maxLength"
                [dataProviderID]="dataProviderID"
                [enabled]="enabled"
                [readOnly]="readOnly"
                [findmode]="findmode"
                [editable]="editable"
                [placeholderText]="placeholderText"
                [selectOnEnter]="selectOnEnter"
                (dataProviderIDChange)="onDataProviderIDChange($event)"
                [onActionMethodID]="onAction"
                [onFocusGainedMethodID]="onFocusGained"
                [onFocusLostMethodID]="onFocusLost"
                #element>
             </bootstrapcomponents-textarea>`
})
class WrapperComponent {
    servoyApi: ServoyApi;

    enabled = true;

    maxLength = 100;
    dataProviderID = 'initialValue';
    readOnly = false;
    findmode = false;
    editable = true;
    placeholderText = 'Enter text';
    selectOnEnter = false;

    onDataProviderIDChange(newData: any) {
        console.log('dataProviderIDChange', newData);
    }

    onAction(event: Event) {
        console.log('Action triggered', event);
    }

    onFocusGained(event: Event) {
        console.log('Focus gained', event);
    }

    onFocusLost(event: Event) {
        console.log('Focus lost', event);
    }

    @ViewChild('element') element: ServoyBootstrapTextarea;
}

describe('ServoyBootstrapTextarea Component', () => {
    const servoyApiSpy = new ServoyApiTesting();

    const config: MountConfig<WrapperComponent> = {
        declarations: [WrapperComponent, ServoyBootstrapTextarea],
        imports: [ServoyPublicTestingModule, FormsModule]
    }

    beforeEach(() => {
        config.componentProperties = {
            servoyApi: servoyApiSpy,
            maxLength: 100,
            dataProviderID: 'initialValue',
            enabled: true,
            readOnly: false,
            findmode: false,
            editable: true,
            placeholderText: 'Enter text',
            selectOnEnter: false
        }
    });

    it('should mount and register the component', () => {
        const registerComponent = cy.stub(servoyApiSpy, 'registerComponent');
        cy.mount(WrapperComponent, config).then((wrapper) => {
            // you need to test if the value is there for the component to be fully initialized
            // just getting the textarea can result in that it is not fully mounted yet (svnOnchanges not called yet)
            cy.get('textarea').should('have.value', 'initialValue').then(_ => {
                expect(registerComponent).to.have.been.called;
            });
        });
    });

    it('should have correct initial input properties', () => {
        cy.mount(WrapperComponent, config).then((wrapper) => {
            const component = wrapper.component;
            expect(component.maxLength).to.equal(100);
            expect(component.dataProviderID).to.equal('initialValue');
            expect(component.enabled).to.be.true;
            expect(component.readOnly).to.be.false;
            expect(component.findmode).to.be.false;
            expect(component.editable).to.be.true;
            expect(component.placeholderText).to.equal('Enter text');
            expect(component.selectOnEnter).to.be.false;
        });
    });

    it('should emit dataProviderIDChange event on input change', () => {
        cy.mount(WrapperComponent, config).then((wrapper) => {
            const component = wrapper.component;
            const spy = cy.spy(component, 'onDataProviderIDChange');

            cy.get('textarea').should('have.value', 'initialValue').type('New Value').blur().then(() => {
                expect(spy).to.have.been.calledWith('initialValueNew Value');
            });
        });
    });


    it('should emit dataProviderIDChange event on input change wiht select on enter', () => {
        config.componentProperties.selectOnEnter = true;
        cy.mount(WrapperComponent, config).then((wrapper) => {
            const component = wrapper.component;
            const spy = cy.spy(component, 'onDataProviderIDChange');

            cy.get('textarea').should('have.value', 'initialValue').focus().should('have.selection', 'initialValue').type('New Value').blur().then(() => {
                expect(spy).to.have.been.calledWith('New Value');
            });
        });
    });

    it('should trigger onAction event on Enter key press', () => {
        cy.mount(WrapperComponent, config).then((wrapper) => {
            const component = wrapper.component;
            const spy = cy.spy(component, 'onAction');

            cy.get('textarea').type('{enter}').then(() => {
                cy.wrap(spy).should('have.been.called');
            });
        });
    });

    it('should trigger onFocusGained and onFocusLost events', () => {
        cy.mount(WrapperComponent, config).then((wrapper) => {
            const component = wrapper.component;
            const focusGainedSpy = cy.spy(component, 'onFocusGained');
            const focusLostSpy = cy.spy(component, 'onFocusLost');

            cy.get('textarea').should('have.value', 'initialValue').focus().then(() => {
                expect(focusGainedSpy).to.have.been.called;
            });

            cy.get('textarea').should('have.value', 'initialValue').blur().then(() => {
                expect(focusLostSpy).to.have.been.called;
            });
        });
    });
});