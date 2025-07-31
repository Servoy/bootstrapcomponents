/* eslint-disable @typescript-eslint/no-unused-expressions */
import { ServoyBootstrapButton } from './button'
import { MountConfig } from 'cypress/angular'
import { ServoyApi, ServoyApiTesting, ServoyPublicTestingModule } from '@servoy/public'
import { Component, Input, SimpleChange, ViewChild, viewChildren } from '@angular/core';

@Component({
    template: `
        <bootstrapcomponents-button 
            [servoyApi]="servoyApi" 
            [enabled]="enabled" 
            [text]="text" 
            [onActionMethodID]="onActionMethodID" 
            [onDoubleClickMethodID]="onDoubleClickMethodID" 
            [onRightClickMethodID]="onRightClickMethodID" 
            [showAs]="showAs" 
            [imageStyleClass]="imageStyleClass" 
            [trailingImageStyleClass]="trailingImageStyleClass"
            [styleClass]="styleClass"
            [variant]="variant"
            [tabSeq]="tabSeq"
            [toolTipText]="toolTipText"
            #element>
        </bootstrapcomponents-button>
    `,
    standalone: false
})
class WrapperComponent {
    enabled = true;
    text = 'MyButton';
    onActionMethodID: (e: Event, data?: any) => void;
    onDoubleClickMethodID: (e: Event, data?: any) => void;
    onRightClickMethodID: (e: Event, data?: any) => void;
    showAs: string;
    imageStyleClass: string;
    trailingImageStyleClass: string;
    servoyApi: ServoyApi;

    styleClass: string;
    variant: string[];
    tabSeq: number;
    toolTipText: string;

    @ViewChild('element') element: ServoyBootstrapButton;
}

describe('ButtonComponent', () => {
    const servoyApiSpy = new ServoyApiTesting();

    const config: MountConfig<ServoyBootstrapButton> = {
        imports: [ ServoyPublicTestingModule],
    } 

    const configWrapper: MountConfig<WrapperComponent> = {
        declarations: [ServoyBootstrapButton],
        imports: [ ServoyPublicTestingModule]
    }

    beforeEach(() => {
        config.componentProperties = {
            servoyApi: servoyApiSpy,
            enabled: true,
            text: 'MyButton'
        }
        configWrapper.componentProperties = config.componentProperties;
    });

    it('when button is mounted and registered and text is changed  through wrapper', () => {
        const registerComponent = cy.stub(servoyApiSpy, 'registerComponent');
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            cy.get('button').should('have.text', ' MyButton ').then(_ => {
                wrapper.component.text = 'MyButton2';
                wrapper.fixture.detectChanges();
                cy.get('button').should('have.text', ' MyButton2 ')
            });
            cy.wrap(registerComponent).should('be.called');
        });
    })

    it('when button enabled state is changed through wrapper', () => {
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            cy.get('button').should('be.enabled').then(_ => {
                wrapper.component.enabled = false
                wrapper.fixture.detectChanges();
                cy.get('button').should('be.disabled')
            });
        });
    })
    
    it('can mount and has text set', () => {
        const registerComponent = cy.stub(servoyApiSpy, 'registerComponent');
        cy.mount(ServoyBootstrapButton, config);
        cy.get('button').should('have.text', ' MyButton ');
        cy.wrap(registerComponent).should('be.called');
    })

    it('when button is clicked', () => {
        expect(config.componentProperties.onActionMethodID).to.be.undefined;
        config.componentProperties.onActionMethodID = cy.spy().as('onActionMethodID');
        cy.mount(ServoyBootstrapButton, config).then(wrapper => {
            cy.get('button').click().then(_ => {
                expect(config.componentProperties.onActionMethodID).to.be.calledOnce;
                wrapper.component.enabled = false;
                // now detect changes will not work, we need to call ngOnChanges our self to update the button state
                // see wrapper component above how that can work a bit nicer with just detectChanges
                const changes = { enabled: new SimpleChange(true, false, false) };
                wrapper.component.ngOnChanges(changes);
                cy.get('button').should('be.disabled');
            });
        })
    })

    it('when button is double clicked', () => {
        expect(config.componentProperties.onDoubleClickMethodID).to.be.undefined;
        config.componentProperties.onDoubleClickMethodID = cy.spy().as('onDoubleClickMethodID');
        cy.mount(ServoyBootstrapButton, config);
        cy.get('button').dblclick();
        cy.wrap(config.componentProperties.onDoubleClickMethodID).should('be.called');
    })

    it('when button is right clicked', () => {
        expect(config.componentProperties.onRightClickMethodID).to.be.undefined;
        expect(config.componentProperties.onDoubleClickMethodID).to.be.undefined;
        expect(config.componentProperties.onActionMethodID).to.be.undefined;
        config.componentProperties.onRightClickMethodID = cy.spy().as('onRightClickMethodID');
        cy.mount(ServoyBootstrapButton, config);
        cy.get('button').rightclick()
        cy.wrap(config.componentProperties.onRightClickMethodID).should('be.called');
    })

    it('when datatarget is clicked', () => {
        cy.stub(servoyApiSpy, 'trustAsHtml').returns(true);
        config.componentProperties = {
                servoyApi: servoyApiSpy,
                onActionMethodID: cy.spy().as('onActionMethodID'),
                text: 'MyButton <label data-target="test">Click me</label>',
                showAs: 'trusted_html'
        }
        cy.mount(ServoyBootstrapButton, config);
        cy.get('button label').click()
        cy.wrap(config.componentProperties.onActionMethodID).should('be.calledWith', Cypress.sinon.match.any,'test');
        cy.get('button').click()
        cy.wrap(config.componentProperties.onActionMethodID).should('be.calledWith',Cypress.sinon.match.any,null);
    })

    it('when datatarget is clicked not trusted html', () => {
        cy.stub(servoyApiSpy, 'trustAsHtml').returns(false);
        config.componentProperties = {
                servoyApi: servoyApiSpy,
                onActionMethodID: cy.spy().as('onActionMethodID'),
                text: 'MyButton <label data-target="test">Click me2</label>',
                showAs: 'html'
        }
        cy.mount(ServoyBootstrapButton, config);
        cy.get('button label').click()
        cy.wrap(config.componentProperties.onActionMethodID).should('be.calledWith',Cypress.sinon.match.any,null);
        cy.get('button').click()
        cy.wrap(config.componentProperties.onActionMethodID).should('be.calledWith',Cypress.sinon.match.any,null);
    });

    it('show a style class', () => {
        cy.mount(WrapperComponent, configWrapper).then(wrapper => {
            cy.get('button').should('not.have.class', 'mystyleclass').then(_ => {
                wrapper.component.styleClass = 'mystyleclass';
                wrapper.fixture.detectChanges();
                cy.get('button').should('have.class', 'mystyleclass')
            });
        });
    });

    it('show more then 1 style class', () => {
        configWrapper.componentProperties.styleClass = 'mystyleclass';
        cy.mount(WrapperComponent, configWrapper).then(wrapper => {
            cy.get('button').should('have.class', 'mystyleclass').then(_ => {
                wrapper.component.styleClass = 'classA classB';
                wrapper.fixture.detectChanges();
                cy.get('button').should('have.class', 'classA').should('have.class', 'classB');
            });
        });
    });

    it('show more variant classes', () => {
        cy.mount(WrapperComponent, configWrapper).then(wrapper => {
            cy.get('button').should('not.have.class', 'varianta').then(_ => {
                wrapper.component.variant = ['variantA', 'variantB'];
                wrapper.fixture.detectChanges();
                cy.get('button').should('have.class', 'variantA').should('have.class', 'variantB');
            });
        });
    });

    it('show a image style class', () => {
        config.componentProperties.imageStyleClass = 'imageStyleClass';
        config.componentProperties.trailingImageStyleClass = 'trailingImageStyleClass';
        cy.mount(ServoyBootstrapButton, config).then(wrapper => {
            cy.get('button span').should('have.class', 'imageStyleClass');
            cy.get('button span').should('have.class', 'trailingImageStyleClass').then(_ => {
                wrapper.component.trailingImageStyleClass = null;
                wrapper.component.imageStyleClass = null;
                wrapper.component.detectChanges();
                cy.get('button span').should('not.exist');
            });
        });
    });

    it('show a image style class with trusted html', () => {
        config.componentProperties.imageStyleClass = 'imageStyleClass';
//        config.componentProperties.trailingImageStyleClass = 'trailingImageStyleClass';
        config.componentProperties.showAs = 'trusted_html';
        cy.mount(ServoyBootstrapButton, config).then(wrapper => {
            cy.get('button span').should('have.class', 'imageStyleClass');
            // cy.get('button span').should('have.class', 'trailingImageStyleClass').then(_ => {
            //     config.componentProperties.trailingImageStyleClass = null;
            //     wrapper.component.trailingImageStyleClass = null;
            //     wrapper.component.imageStyleClass = null;
            //     wrapper.component.detectChanges();
            //     cy.get('button span').should('not.exist');
            // });
        });
    });

    it('should update the tooltip dynamically', () => {
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
          wrapper.component.toolTipText = 'Updated tooltip';
          wrapper.fixture.detectChanges();
          cy.get('button').trigger('pointerenter').then(() => {
              cy.get('div[id="mktipmsg"]').should('have.text', 'Updated tooltip');
          });
        });
      });

    it('should focus the button when requestFocus is called', () => {
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            cy.get('button').should('have.text', ' MyButton ').then(_ => {
                wrapper.component.element.requestFocus(false);
                cy.get('button').should('have.focus');
            });
        });
    });

    // not sure if we can tes this because i think SabloTabSeq directive needs a parent that triggers the calculation
    //   it('should hava a tabindex set', () => {
    //     configWrapper.componentProperties.tabSeq = 5;
    //     cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
    //       cy.get('button').should('have.attr', 'tabindex', '5');
    //     });
    //   });

})