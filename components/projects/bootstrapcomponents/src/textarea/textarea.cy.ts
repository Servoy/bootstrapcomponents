/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Component, ViewChild, signal, output } from '@angular/core';
import { ServoyBootstrapTextarea } from './textarea';
import { ServoyApi, ServoyApiTesting, ServoyPublicTestingModule } from '@servoy/public';
import { MountConfig } from 'cypress/angular';
import { FormsModule } from '@angular/forms';

@Component({
    template: `<bootstrapcomponents-textarea
                [servoyApi]="servoyApi" 
                [maxLength]="maxLength()"
                [dataProviderID]="dataProviderID()"
                [enabled]="enabled()"
                [readOnly]="readOnly()"
                [findmode]="findmode()"
                [editable]="editable()"
                [styleClass]="styleClass()"
                [placeholderText]="placeholderText()"
                [selectOnEnter]="selectOnEnter()"
                (dataProviderIDChange)="dataProviderIDChange.emit($event)"
                [onActionMethodID]="onActionMethodID"
                [onFocusGainedMethodID]="onFocusGainedMethodID"
                [onFocusLostMethodID]="onFocusLostMethodID"
                [onRightClickMethodID]="onRightClickMethodID"
                #element>
             </bootstrapcomponents-textarea>`,
    standalone: false
})
class WrapperComponent {
    servoyApi: ServoyApi;

    enabled = signal<boolean>(undefined);
    readOnly = signal<boolean>(undefined);
    findmode = signal<boolean>(undefined);

    maxLength = signal<number>(undefined);
    editable = signal<boolean>(undefined);
    placeholderText = signal<string>(undefined);
    styleClass = signal<string>(undefined);

    dataProviderID = signal<string>(undefined);
    selectOnEnter = signal<boolean>(undefined);
    dataProviderIDChange = output<any>();

    onActionMethodID: (event: Event) => void;
    onFocusGainedMethodID: (event: Event) => void;
    onFocusLostMethodID: (event: Event) => void;
    onRightClickMethodID: (event: Event) => void;

    @ViewChild('element') element: ServoyBootstrapTextarea;
}

const defaultValues = {
    servoyApi: new ServoyApiTesting(),
    maxLength: 100,
    dataProviderID: 'initialValue',
    styleClass: null,
    enabled: true,
    readOnly: false,
    findmode: false,
    editable: true,
    placeholderText: 'Enter text',
    selectOnEnter: undefined,
    onActionMethodID: undefined,
    onFocusGainedMethodID: undefined,
    onFocusLostMethodID: undefined,
    onRightClickMethodID: undefined
};

function applyDefaultProps(wrapper) {
    for (const key in defaultValues) {
        if (wrapper.component.hasOwnProperty(key) && typeof wrapper.component[key] === 'function') {
            // If the property is a signal, update it using .set()
            wrapper.component[key].set(defaultValues[key]);
        }
        else {
            // Otherwise assign it as a normal property
            wrapper.component[key] = defaultValues[key];
        }
    }
}

describe('ServoyBootstrapTextarea Component', () => {
    const configWrapper: MountConfig<WrapperComponent> = {
        declarations: [WrapperComponent, ServoyBootstrapTextarea],
        imports: [ServoyPublicTestingModule, FormsModule]
    };

    it('should mount and register the component', () => {
        const servoyApiSpy = defaultValues.servoyApi;
        const registerComponent = cy.stub(servoyApiSpy, 'registerComponent');
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            applyDefaultProps(wrapper);
            // you need to test if the value is there for the component to be fully initialized
            // just getting the textarea can result in that it is not fully mounted yet (svnOnchanges not called yet)
            cy.get('textarea').should('have.value', 'initialValue').then(_ => {
                expect(registerComponent).to.have.been.called;
            });
        });
    });

    it('should have correct initial input properties', () => {
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            applyDefaultProps(wrapper);
            expect(wrapper.component.maxLength()).to.equal(100);
            expect(wrapper.component.dataProviderID()).to.equal('initialValue');
            expect(wrapper.component.enabled()).to.be.true;
            expect(wrapper.component.readOnly()).to.be.false;
            expect(wrapper.component.findmode()).to.be.false;
            expect(wrapper.component.editable()).to.be.true;
            expect(wrapper.component.placeholderText()).to.equal('Enter text');
        });
    });

    it('should be read-only', () => {
        defaultValues.readOnly = true;
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            applyDefaultProps(wrapper);
            cy.get('textarea').should('have.attr', 'readonly');
        });
    });

    it('should be editable', () => {
        defaultValues.editable = true;
        defaultValues.readOnly = false;
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            applyDefaultProps(wrapper);
            cy.get('textarea').should('not.have.attr', 'readonly');
        });
    });

    it('should have max length', () => {
        cy.mount(WrapperComponent, configWrapper).then(wrapper => {
            applyDefaultProps(wrapper);
            cy.get('textarea').should('have.attr', 'maxlength', 100).then(() => {
                wrapper.component.maxLength.set(200);
                wrapper.component.element._maxLength.set(200);
                cy.get('textarea').should('have.attr', 'maxlength', 200)
            });
        });
    });

    it('should emit dataProviderIDChange event on input change', () => {
        defaultValues.dataProviderID = 'initialValue';
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            applyDefaultProps(wrapper);
            const dataProviderIDChange = cy.spy();
            wrapper.component.dataProviderIDChange.subscribe(dataProviderIDChange);
            cy.get('textarea').should('have.value', 'initialValue').type('New Value').blur().then(() => {
                cy.wrap(dataProviderIDChange).should('have.been.calledWith', 'initialValueNew Value');
            });
        });
    });

    it('should not emit dataProviderIDChange event dataprovder change', () => {
        defaultValues.dataProviderID = 'initialValue';
        cy.mount(WrapperComponent, configWrapper).then(wrapper => {
            applyDefaultProps(wrapper);
            const dataProviderIDChange = cy.spy();
            wrapper.component.dataProviderIDChange.subscribe(dataProviderIDChange);
            cy.get('textarea').should('have.value', 'initialValue').then(() => {
                wrapper.component.dataProviderID.set('new value');
                expect(dataProviderIDChange).not.to.have.been.called;
                cy.get('textarea').should('have.value', 'new value')
            });
        });
    });

    it('should trigger onAction event on Enter key press', () => {
        const onActionMethodID = cy.stub();
        defaultValues.onActionMethodID = onActionMethodID;
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            applyDefaultProps(wrapper);
            cy.get('textarea').type('{enter}').then(() => {
                cy.wrap(onActionMethodID).should('have.been.called');
            });
        });
    });

    it('should trigger onFocusGained and onFocusLost events', () => {
        const focusGainedSpy = cy.stub();
        const focusLostSpy = cy.stub();
        defaultValues.onFocusGainedMethodID = focusGainedSpy;
        defaultValues.onFocusLostMethodID = focusLostSpy;
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            applyDefaultProps(wrapper);
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
        defaultValues.onRightClickMethodID = onRightClickMethodID;
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            applyDefaultProps(wrapper);
            cy.get('textarea').rightclick().then(() => {
                expect(onRightClickMethodID).to.have.been.called;
            });
        });
    })
});
