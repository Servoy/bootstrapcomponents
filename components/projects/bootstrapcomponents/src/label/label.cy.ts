/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Component, ViewChild, signal } from '@angular/core';
import { ServoyApi, ServoyApiTesting, ServoyPublicTestingModule } from '@servoy/public';
import { ServoyBootstrapLabel } from './label';
import { MountConfig } from 'cypress/angular';
import { FormsModule } from '@angular/forms';

@Component({
    template: `<bootstrapcomponents-label
                [servoyApi]="servoyApi"
                [enabled]="enabled()"
                [onActionMethodID]="onActionMethodID"
                [onDoubleClickMethodID]="onDoubleClickMethodID"
                [onRightClickMethodID]="onRightClickMethodID"
                [styleClass]="styleClass()"
                [toolTipText]="toolTipText()"
                [tabSeq]="tabSeq()"
                [showAs]="showAs()"
                [text]="text()"
                [variant]="variant()"
                [trailingImageStyleClass]="trailingImageStyleClass()"
                [labelFor]="labelFor()"
                [imageStyleClass]="imageStyleClass()"
                [styleClassExpression]="styleClassExpression()"
                #element>
                </bootstrapcomponents-label>`,
    standalone: false
})
class WrapperComponent {
    servoyApi: ServoyApi;

    enabled = signal<boolean>(undefined);
    styleClass = signal<string>(undefined);
    tabSeq = signal<number>(undefined);
    toolTipText = signal<string>(undefined);

    onActionMethodID: (e: Event, data?: unknown) => void;
    onDoubleClickMethodID: (e: Event, data?: unknown) => void;
    onRightClickMethodID: (e: Event, data?: unknown) => void;

    placeholderText = signal<string>(undefined);
    showAs = signal<string>(undefined);
    text = signal<string>(undefined);
    variant = signal<string[]>(undefined);
    trailingImageStyleClass = signal<string>(undefined);
    labelFor = signal<string>(undefined);
    imageStyleClass = signal<string>(undefined);
    styleClassExpression = signal<string>(undefined);

    @ViewChild('element') element: ServoyBootstrapLabel;
}

const defaultValues = {
    servoyApi: new ServoyApiTesting(),
    enabled: true,
    showAs: 'text',
    text: 'Label',
    styleClass: undefined,
    tabSeq: undefined,
    toolTipText: undefined,
    placeholderText: undefined,
    variant: undefined,
    trailingImageStyleClass: undefined,
    labelFor: undefined,
    imageStyleClass: undefined,
    onActionMethodID: undefined,
    onDoubleClickMethodID: undefined,
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

describe('ServoyBootstrapLabel', () => {
    const configWrapper: MountConfig<WrapperComponent> = {
        declarations: [ServoyBootstrapLabel],
        imports: [ServoyPublicTestingModule, FormsModule]
    };

    it('should mount and register the component', () => {
        const servoyApiSpy = defaultValues.servoyApi;
        const registerComponent = cy.stub(servoyApiSpy, 'registerComponent');
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            applyDefaultProps(wrapper);
            cy.get('.bts-label').should('exist').then(() => {
                cy.wrap(registerComponent).should('be.called');
            });
        });
    });

    it('should show the text value', () => {
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            applyDefaultProps(wrapper);
            cy.get('.bts-label span').should('have.text', 'Label');
        });
    });

    it('should show as HTML the value', () => {
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            applyDefaultProps(wrapper);
            wrapper.component.text.set('<b>Label</b>');
            wrapper.component.showAs.set('html');
            cy.get('.bts-label span').should('have.html', '<b>Label</b>');
        });
    });

    it('show a style class', () => {
        cy.mount(WrapperComponent, configWrapper).then(wrapper => {
            applyDefaultProps(wrapper);
            cy.get('.bts-label').should('not.have.class', 'mystyleclass').then(() => {
                wrapper.component.styleClass.set('mystyleclass');
                cy.get('.bts-label').should('have.class', 'mystyleclass')
            });
        });
    });

    it('show more then 1 style class', () => {
        defaultValues.styleClass = 'mystyleclass';
        cy.mount(WrapperComponent, configWrapper).then(wrapper => {
            applyDefaultProps(wrapper);
            cy.get('.bts-label').should('have.class', 'mystyleclass').then(() => {
                wrapper.component.styleClass.set('classA classB');
                cy.get('.bts-label').should('have.class', 'classA').should('have.class', 'classB');
            });
        });
    });

    it('should be disabled', () => {
        defaultValues.enabled = false;
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            applyDefaultProps(wrapper);
            cy.get('.bts-label').should('have.attr', 'disabled');
        });
    });

    it('should handle onaction  event', () => {
        const onActionMethodID = cy.stub();
        defaultValues.onActionMethodID = onActionMethodID;
        defaultValues.enabled = true;
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            applyDefaultProps(wrapper);
            cy.wrap(onActionMethodID).should('be.not.called');
            cy.get('.bts-label').should('exist').click().then(() => {
                cy.wrap(onActionMethodID).should('be.called');
            });
        });
    });

    it('should apply styleClassExpression classes via Renderer2', () => {
        cy.mount(WrapperComponent, configWrapper).then(wrapper => {
            applyDefaultProps(wrapper);
            wrapper.component.styleClassExpression.set('highlight bold');
            cy.get('.bts-label').should('have.class', 'highlight').should('have.class', 'bold').then(() => {
                wrapper.component.styleClassExpression.set('dimmed');
                cy.get('.bts-label').should('have.class', 'dimmed')
                    .should('not.have.class', 'highlight')
                    .should('not.have.class', 'bold');
            });
        });
    });

    it('should render imageStyleClass and trailingImageStyleClass icons', () => {
        cy.mount(WrapperComponent, configWrapper).then(wrapper => {
            applyDefaultProps(wrapper);
            wrapper.component.imageStyleClass.set('fa fa-star');
            wrapper.component.trailingImageStyleClass.set('fa fa-arrow-right');
            cy.get('span.bts-label-icon').should('have.length', 2).then(() => {
                cy.get('span.bts-label-icon').first().should('have.class', 'fa-star');
                cy.get('span.bts-label-icon').last().should('have.class', 'fa-arrow-right');
            });
        });
    });

    it('should update the tooltip dynamically', () => {
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            applyDefaultProps(wrapper);
            wrapper.component.toolTipText.set('Label tip');
            cy.get('.bts-label').trigger('pointerenter').then(() => {
                cy.get('div[id="mktipmsg"]').should('have.text', 'Label tip');
            });
        });
    });

    it('should not fire onAction when disabled', () => {
        const onActionMethodID = cy.stub();
        defaultValues.onActionMethodID = onActionMethodID;
        defaultValues.enabled = false;
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            applyDefaultProps(wrapper);
            cy.get('.bts-label').click({ force: true }).then(() => {
                cy.wrap(onActionMethodID).should('not.have.been.called');
            });
        });
    });

    it('should render a <label> element with for attribute when labelFor is set', () => {
        defaultValues.enabled = true;
        defaultValues.labelFor = 'myInput';
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            applyDefaultProps(wrapper);
            cy.get('.bts-label label.bts-label-text').should('have.attr', 'for', 'myInput');
        });
    });

    it('should render text as trusted HTML when showAs is trusted_html', () => {
        defaultValues.labelFor = undefined;
        defaultValues.showAs = 'trusted_html';
        defaultValues.text = '<em id="lbl-trust">Italic</em>';
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            applyDefaultProps(wrapper);
            cy.get('.bts-label').find('em#lbl-trust').should('exist').should('have.text', 'Italic');
        });
    });
});
