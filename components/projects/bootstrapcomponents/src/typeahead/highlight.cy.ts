import { Component, signal } from '@angular/core';
import { MountConfig } from 'cypress/angular';
import { ServoyPublicTestingModule } from '@servoy/public';
import { SvyNgbHighlight } from './highlight';

@Component({
    template: `<svy-ngb-highlight [result]="result()" [term]="term()" [trusted]="trusted()"></svy-ngb-highlight>`,
    standalone: false
})
class HighlightWrapperComponent {
    result = signal<string>('');
    term = signal<string | readonly string[]>('');
    trusted = signal<boolean>(false);
}

describe('SvyNgbHighlight', () => {
    const config: MountConfig<HighlightWrapperComponent> = {
        declarations: [SvyNgbHighlight],
        imports: [ServoyPublicTestingModule]
    };

    it('should render result text without term highlighting', () => {
        cy.mount(HighlightWrapperComponent, config).then((wrapper) => {
            wrapper.component.result.set('Hello World');
            cy.get('svy-ngb-highlight span').should('contain.text', 'Hello World');
        });
    });

    it('should highlight the search term', () => {
        cy.mount(HighlightWrapperComponent, config).then((wrapper) => {
            wrapper.component.result.set('Alaska');
            wrapper.component.term.set('as');
            cy.get('svy-ngb-highlight span.ngb-highlight').should('contain.text', 'as');
            cy.get('svy-ngb-highlight').should('contain.text', 'Alaska');
        });
    });

    it('trusted=false should sanitize inline styles (Angular strips style attributes)', () => {
        cy.mount(HighlightWrapperComponent, config).then((wrapper) => {
            wrapper.component.result.set('<span style="background-color: red;">Red Item</span>');
            wrapper.component.trusted.set(false);
            cy.get('svy-ngb-highlight span').then($el => {
                const inner = $el.find('span[style]');
                expect(inner.length).to.equal(0);
            });
            cy.get('svy-ngb-highlight').should('contain.text', 'Red Item');
        });
    });

    it('trusted=true should preserve inline styles via bypassSecurityTrustHtml', () => {
        cy.mount(HighlightWrapperComponent, config).then((wrapper) => {
            wrapper.component.result.set('<span style="background-color: red;">Red Item</span>');
            wrapper.component.trusted.set(true);
            cy.get('svy-ngb-highlight span span[style]').should('exist');
            cy.get('svy-ngb-highlight span span[style]')
                .should('have.attr', 'style')
                .and('contain', 'background-color');
            cy.get('svy-ngb-highlight').should('contain.text', 'Red Item');
        });
    });

    it('trusted=true should preserve multiple inline style properties', () => {
        cy.mount(HighlightWrapperComponent, config).then((wrapper) => {
            wrapper.component.result.set(
                '<span style="height: 16px; width: 16px; display: inline-block; background-color: #FF0000"></span> Red'
            );
            wrapper.component.trusted.set(true);
            cy.get('svy-ngb-highlight span span[style]')
                .should('have.attr', 'style')
                .and('contain', 'background-color')
                .and('contain', 'width')
                .and('contain', 'height')
                .and('contain', 'display');
        });
    });

    it('trusted=true should still highlight the search term in HTML content', () => {
        cy.mount(HighlightWrapperComponent, config).then((wrapper) => {
            wrapper.component.result.set('<span style="color: blue;">Alaska</span>');
            wrapper.component.term.set('as');
            wrapper.component.trusted.set(true);
            cy.get('svy-ngb-highlight span.ngb-highlight').should('exist');
            cy.get('svy-ngb-highlight span span[style]').should('exist');
        });
    });

    it('trusted=false should still highlight the search term', () => {
        cy.mount(HighlightWrapperComponent, config).then((wrapper) => {
            wrapper.component.result.set('Alaska');
            wrapper.component.term.set('as');
            wrapper.component.trusted.set(false);
            cy.get('svy-ngb-highlight span.ngb-highlight').should('contain.text', 'as');
        });
    });

    it('should handle empty result', () => {
        cy.mount(HighlightWrapperComponent, config).then((wrapper) => {
            wrapper.component.result.set('');
            wrapper.component.term.set('test');
            wrapper.component.trusted.set(true);
            cy.get('svy-ngb-highlight').should('have.text', '');
        });
    });

    it('should handle empty term', () => {
        cy.mount(HighlightWrapperComponent, config).then((wrapper) => {
            wrapper.component.result.set('Hello World');
            wrapper.component.term.set('');
            wrapper.component.trusted.set(false);
            cy.get('svy-ngb-highlight').should('contain.text', 'Hello World');
            cy.get('svy-ngb-highlight span.ngb-highlight').should('not.exist');
        });
    });

    it('should handle special characters in term', () => {
        cy.mount(HighlightWrapperComponent, config).then((wrapper) => {
            wrapper.component.result.set('price is $100 (USD)');
            wrapper.component.term.set('$100');
            wrapper.component.trusted.set(false);
            cy.get('svy-ngb-highlight span.ngb-highlight').should('contain.text', '$100');
        });
    });

    it('should handle special regex characters in term with trusted mode', () => {
        cy.mount(HighlightWrapperComponent, config).then((wrapper) => {
            wrapper.component.result.set('<span style="color:red;">price (USD)</span>');
            wrapper.component.term.set('(USD)');
            wrapper.component.trusted.set(true);
            cy.get('svy-ngb-highlight span.ngb-highlight').should('contain.text', '(USD)');
            cy.get('svy-ngb-highlight span span[style]').should('exist');
        });
    });
});
