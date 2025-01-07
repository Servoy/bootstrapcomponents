/* eslint-disable @typescript-eslint/no-unused-expressions */
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
                [styleClass]="styleClass"
                [placeholderText]="placeholderText"
                [selectOnEnter]="selectOnEnter"
                (dataProviderIDChange)="onDataProviderIDChange($event)"
                [onActionMethodID]="onActionMethodID"
                [onFocusGainedMethodID]="onFocusGainedMethodID"
                [onFocusLostMethodID]="onFocusLostMethodID"
                [onRightClickMethodID]="onRightClickMethodID"
                #element>
             </bootstrapcomponents-textarea>`
})
class WrapperComponent {
    servoyApi: ServoyApi;

    enabled = true;
    readOnly = false;
    findmode = false;

    maxLength = 100;
    editable = true;
    placeholderText = 'Enter text';
    styleClass;
    
    dataProviderID = 'initialValue';
    onDataProviderIDChange(newData: any) {
    }

    onActionMethodID(event: Event) {
    }

    onFocusGainedMethodID(event: Event) {
    }

    onFocusLostMethodID(event: Event) {
    }

    onRightClickMethodID(event: Event) {
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
            styleClass: null,
            enabled: true,
            readOnly: false,
            findmode: false,
            editable: true,
            placeholderText: 'Enter text',
        }
    });

    it('should mount and register the component', () => {
        const registerComponent = cy.stub(servoyApiSpy, 'registerComponent');
        cy.mount(WrapperComponent, config).then(() => {
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
        });
    });

    it('should be read-only', () => {
        config.componentProperties.readOnly = true;
        cy.mount(WrapperComponent, config).then(() => {
            cy.get('textarea').should('have.attr', 'readonly');
        });
    });

    it('should be editable', () => {
        config.componentProperties.editable = true;
        cy.mount(WrapperComponent, config).then(() => {
            cy.get('textarea').should('not.have.attr', 'readonly');
        });
    });

    it('should have max length', () => {
        cy.mount(WrapperComponent, config).then(wrapper => {
            cy.get('textarea').should('have.attr', 'maxlength', 100).then(() => {
                wrapper.component.maxLength = 200;
                wrapper.fixture.detectChanges();
                cy.get('textarea').should('have.attr', 'maxlength', 200)
            });
        });
    });

    it('should emit dataProviderIDChange event on input change', () => {
        const onDataProviderIDChange = cy.stub();
        config.componentProperties.onDataProviderIDChange = onDataProviderIDChange;
        cy.mount(WrapperComponent, config).then(() => {

            cy.get('textarea').should('have.value', 'initialValue').type('New Value').blur().then(() => {
                expect(onDataProviderIDChange).to.have.been.calledWith('initialValueNew Value');
            });
        });
    });

    it('should not emit dataProviderIDChange event dataprovder change', () => {
        const onDataProviderIDChange = cy.stub();
        config.componentProperties.onDataProviderIDChange = onDataProviderIDChange;
        cy.mount(WrapperComponent, config).then(wrapper => {

            cy.get('textarea').should('have.value', 'initialValue').then(() => {
                wrapper.component.dataProviderID = 'new value';
                wrapper.fixture.detectChanges();
                expect(onDataProviderIDChange).not.to.have.been.called;
                cy.get('textarea').should('have.value', 'new value')
            });
        });
    });


    // it('should emit dataProviderIDChange event on input change wiht select on enter', () => {
    //     config.componentProperties.selectOnEnter = true;
    //     cy.mount(WrapperComponent, config).then((wrapper) => {
    //         const component = wrapper.component;
    //         const spy = cy.spy(component, 'onDataProviderIDChange');

    //         cy.get('textarea').should('have.value', 'initialValue').focus().should('have.selection', 'initialValue').type('New Value').blur().then(() => {
    //             expect(spy).to.have.been.calledWith('New Value');
    //         });
    //     });
    // });

    it('should trigger onAction event on Enter key press', () => {
        const onActionMethodID = cy.stub();
        config.componentProperties.onActionMethodID = onActionMethodID;
        cy.mount(WrapperComponent, config).then(() => {
            cy.get('textarea').type('{enter}').then(() => {
                cy.wrap(onActionMethodID).should('have.been.called');
            });
        });
    });

    it('should trigger onFocusGained and onFocusLost events', () => {
        const focusGainedSpy = cy.stub();
        const focusLostSpy = cy.stub();
        config.componentProperties.onFocusGainedMethodID = focusGainedSpy;
        config.componentProperties.onFocusLostMethodID = focusLostSpy;
        cy.mount(WrapperComponent, config).then(() => {

            cy.get('textarea').should('have.value', 'initialValue').focus().then(() => {
                expect(focusGainedSpy).to.have.been.called;
            });

            cy.get('textarea').should('have.value', 'initialValue').blur().then(() => {
                expect(focusLostSpy).to.have.been.called;
            });
        });
    });

    it('should handle right click event', () => {
        const onRightClickMethodID = cy.stub();
        config.componentProperties.onRightClickMethodID = onRightClickMethodID;
        cy.mount(WrapperComponent, config).then(() => {
            cy.get('textarea').rightclick().then(() => {
                expect(onRightClickMethodID).to.have.been.called;
            });
        });
    })
});