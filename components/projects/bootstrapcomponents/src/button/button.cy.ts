/* eslint-disable @typescript-eslint/no-unused-expressions */
import { ServoyBootstrapButton } from './button'
import { MountConfig } from 'cypress/angular'
import { ServoyApi, ServoyApiTesting, ServoyPublicTestingModule } from '@servoy/public'
import { Component, ViewChild, signal } from '@angular/core';

@Component({
    template: `
        <bootstrapcomponents-button 
            [servoyApi]="servoyApi" 
            [enabled]="enabled()"
            [text]="text()"
            [onActionMethodID]="onActionMethodID"
            [onDoubleClickMethodID]="onDoubleClickMethodID"
            [onRightClickMethodID]="onRightClickMethodID"
            [showAs]="showAs()"
            [imageStyleClass]="imageStyleClass()"
            [trailingImageStyleClass]="trailingImageStyleClass()"
            [styleClass]="styleClass()"
            [variant]="variant()"
            [tabSeq]="tabSeq()"
            [toolTipText]="toolTipText()"
            #element>
        </bootstrapcomponents-button>
    `,
    standalone: false
})

class WrapperComponent {
    enabled = signal<boolean>(undefined);
    text = signal<string>(undefined);
    onActionMethodID: (e: Event, data?: any) => void;
    onDoubleClickMethodID: (e: Event, data?: any) => void;
    onRightClickMethodID: (e: Event, data?: any) => void;
    showAs = signal<string | undefined>(undefined);
    imageStyleClass = signal<string | undefined>(undefined);
    trailingImageStyleClass = signal<string | undefined>(undefined);
    servoyApi: ServoyApi;

    styleClass = signal<string | undefined>(undefined);
    variant = signal<string[] | undefined>(undefined);
    tabSeq = signal<number | undefined>(undefined);
    toolTipText = signal<string | undefined>(undefined);

    @ViewChild('element') element: ServoyBootstrapButton;
}

const defaultValues = {
    servoyApi: new ServoyApiTesting(),
    enabled: true,
    text: 'MyButton',
    onActionMethodID: undefined,
    onDoubleClickMethodID: undefined,
    onRightClickMethodID: undefined,
    showAs: undefined,
    imageStyleClass: undefined,
    trailingImageStyleClass: undefined,
    styleClass: undefined,
    variant: undefined,
    tabSeq: undefined,
    toolTipText: undefined
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

describe('ServoyBootstrapButton', () => {
    const configWrapper: MountConfig<WrapperComponent> = {
        declarations: [ServoyBootstrapButton],
        imports: [ServoyPublicTestingModule]
    };

    it('when button is mounted, registered, and text is updated through wrapper', () => {
        const servoyApiSpy = defaultValues.servoyApi;
        const registerComponent = cy.stub(servoyApiSpy, 'registerComponent');
        cy.mount(WrapperComponent, configWrapper).then(wrapper => {
            applyDefaultProps(wrapper);
            cy.get('button').should('contain.text', 'MyButton').then(() => {
                wrapper.component.text.set('Button2');
                cy.get('button').should('contain.text', 'Button2');
                cy.wrap(registerComponent).should('have.been.calledOnce');
            });
        });
    });
    
    it('when button enabled state is changed through wrapper', () => {
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            applyDefaultProps(wrapper);
            cy.get('button').should('be.enabled').then(() => {
                wrapper.component.enabled.set(false);
                cy.get('button').should('be.disabled');
            });
        });
    });
    
    it('can mount and has text set', () => {
        const servoyApiSpy = defaultValues.servoyApi;
        const registerComponent = cy.stub(servoyApiSpy, 'registerComponent');
        cy.mount(WrapperComponent, configWrapper).then(wrapper => {
            applyDefaultProps(wrapper);
            cy.get('button').should('contain.text', 'MyButton');
            cy.wrap(registerComponent).should('be.called');
        });
    });
    
    it('when button is clicked', () => {
        expect(defaultValues.onActionMethodID).to.be.undefined;
        defaultValues.onActionMethodID = cy.spy().as('onActionMethodID');
        cy.mount(WrapperComponent, configWrapper).then(wrapper => {
            applyDefaultProps(wrapper);
            cy.get('button').click().then(_ => {
                expect(defaultValues.onActionMethodID).to.be.calledOnce;
                wrapper.component.enabled.set(false);
                cy.get('button').should('be.disabled');
            });
        })
    });
    
    it('when button is double clicked', () => {
        expect(defaultValues.onDoubleClickMethodID).to.be.undefined;
        defaultValues.onDoubleClickMethodID = cy.spy().as('onDoubleClickMethodID');
        cy.mount(WrapperComponent, configWrapper).then(wrapper => {
            applyDefaultProps(wrapper);
        });
        cy.get('button').dblclick();
        cy.wrap(defaultValues.onDoubleClickMethodID).should('be.called');
    });

    it('when button is right clicked', () => {
        expect(defaultValues.onRightClickMethodID).to.be.undefined;
        defaultValues.onRightClickMethodID = cy.spy().as('onRightClickMethodID');
        cy.mount(WrapperComponent, configWrapper).then(wrapper => {
            applyDefaultProps(wrapper);
        });
        cy.get('button').rightclick()
        cy.wrap(defaultValues.onRightClickMethodID).should('be.called');
    });

    it('when datatarget is clicked', () => {
        defaultValues.text = 'MyButton <label data-target="test">Click me</label>';
        defaultValues.showAs = 'trusted_html';
        cy.mount(WrapperComponent, configWrapper).then(wrapper => {
            applyDefaultProps(wrapper);
        });
        cy.get('button label').click()
        cy.wrap(defaultValues.onActionMethodID).should('be.calledWith', Cypress.sinon.match.any, 'test');
        cy.get('button').click()
        cy.wrap(defaultValues.onActionMethodID).should('be.calledWith', Cypress.sinon.match.any, null);
    })

    it('when datatarget is clicked not trusted html', () => {
        defaultValues.showAs = 'html';
        cy.mount(WrapperComponent, configWrapper).then(wrapper => {
            applyDefaultProps(wrapper);
        });
        cy.get('button label').click()
        cy.wrap(defaultValues.onActionMethodID).should('be.calledWith', Cypress.sinon.match.any, null);
        cy.get('button').click()
        cy.wrap(defaultValues.onActionMethodID).should('be.calledWith', Cypress.sinon.match.any, null);
    });

    it('show a style class', () => {
        cy.mount(WrapperComponent, configWrapper).then(wrapper => {
            applyDefaultProps(wrapper);
            cy.get('button').should('not.have.class', 'mystyleclass').then(_ => {
                wrapper.component.styleClass.set('mystyleclass');
                cy.get('button').should('have.class', 'mystyleclass')
            });
        });
    });

    it('show more then 1 style class', () => {
        defaultValues.styleClass = 'mystyleclass';
        cy.mount(WrapperComponent, configWrapper).then(wrapper => {
            applyDefaultProps(wrapper);
            cy.get('button').should('have.class', 'mystyleclass').then(_ => {
                wrapper.component.styleClass.set('classA classB');
                cy.get('button').should('have.class', 'classA').should('have.class', 'classB');
            });
        });
    });

    it('show more variant classes', () => {
        cy.mount(WrapperComponent, configWrapper).then(wrapper => {
            applyDefaultProps(wrapper);
            cy.get('button').should('not.have.class', 'varianta').then(_ => {
                wrapper.component.variant.set(['variantA', 'variantB']);
                cy.get('button').should('have.class', 'variantA').should('have.class', 'variantB');
            });
        });
    });

    it('show a image style class', () => {
        defaultValues.text = 'MyButton';
        defaultValues.imageStyleClass = 'imageStyleClass';
        defaultValues.trailingImageStyleClass = 'trailingImageStyleClass';
        cy.mount(WrapperComponent, configWrapper).then(wrapper => {
            applyDefaultProps(wrapper);
            cy.get('button span').should('have.class', 'imageStyleClass');
            cy.get('button span').should('have.class', 'trailingImageStyleClass').then(_ => {
                wrapper.component.trailingImageStyleClass.set(null);
                wrapper.component.imageStyleClass.set(null);
                cy.get('button span').should('not.have.class', 'imageStyleClass');
                cy.get('button span').should('not.have.class', 'trailingImageStyleClass');
            });
        });
    });

    it('show a image style class with trusted html', () => {
        defaultValues.imageStyleClass = 'imageStyleClass';
        defaultValues.showAs = 'trusted_html';
        cy.mount(WrapperComponent, configWrapper).then(wrapper => {
            applyDefaultProps(wrapper);
            cy.get('button span').should('have.class', 'imageStyleClass');
        });
    });

    it('should update the tooltip dynamically', () => {
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            applyDefaultProps(wrapper);
            wrapper.component.toolTipText.set('Updated tooltip');
            cy.get('button').trigger('pointerenter').then(() => {
                cy.get('div[id="mktipmsg"]').should('have.text', 'Updated tooltip');
            });
        });
    });

    it('should focus the button when requestFocus is called', () => {
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            applyDefaultProps(wrapper);
            cy.get('button').should('contain.text', 'MyButton').then(_ => {
                wrapper.component.element.requestFocus(false);
                cy.get('button').should('have.focus');
            });
        });
    });
});
