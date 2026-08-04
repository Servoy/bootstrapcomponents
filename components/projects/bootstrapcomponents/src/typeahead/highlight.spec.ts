import { TestBed, ComponentFixture } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { describe, it, expect, beforeEach } from 'vitest';
import { ServoyPublicTestingModule } from '@servoy/public';
import { SvyNgbHighlight } from './highlight';

describe('SvyNgbHighlight', () => {
    let fixture: ComponentFixture<SvyNgbHighlight>;

    async function createComponent(overrides: Record<string, any> = {}) {
        fixture = TestBed.createComponent(SvyNgbHighlight);

        const defaults: Record<string, any> = {
            result: '',
            term: '',
            trusted: false,
            ...overrides
        };

        for (const [key, value] of Object.entries(defaults)) {
            fixture.componentRef.setInput(key, value);
        }

        fixture.detectChanges();
        await fixture.whenStable();
    }

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SvyNgbHighlight],
            imports: [ServoyPublicTestingModule],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();
    });

    it('should render result text without term highlighting', async () => {
        await createComponent({ result: 'Hello World' });
        const el = fixture.nativeElement.querySelector('span');
        expect(el.textContent).toContain('Hello World');
    });

    it('should highlight the search term', async () => {
        await createComponent({ result: 'Alaska', term: 'as' });
        const highlight = fixture.nativeElement.querySelector('span.ngb-highlight');
        expect(highlight).not.toBeNull();
        expect(highlight.textContent).toContain('as');
    });

    it('should handle empty result', async () => {
        await createComponent({ result: '', term: 'test', trusted: true });
        expect(fixture.nativeElement.textContent).toBe('');
    });

    it('should handle empty term', async () => {
        await createComponent({ result: 'Hello World', term: '' });
        expect(fixture.nativeElement.textContent).toContain('Hello World');
        const highlight = fixture.nativeElement.querySelector('span.ngb-highlight');
        expect(highlight).toBeNull();
    });

    it('should handle special characters in term', async () => {
        await createComponent({ result: 'price is $100 (USD)', term: '$100' });
        const highlight = fixture.nativeElement.querySelector('span.ngb-highlight');
        expect(highlight).not.toBeNull();
        expect(highlight.textContent).toContain('$100');
    });

    it('trusted=true should preserve inline styles via bypassSecurityTrustHtml', async () => {
        await createComponent({
            result: '<span style="background-color: red;">Red Item</span>',
            trusted: true
        });
        const styledSpan = fixture.nativeElement.querySelector('span span[style]');
        expect(styledSpan).not.toBeNull();
        expect(styledSpan.getAttribute('style')).toContain('background-color');
    });

    it('trusted=false should sanitize inline styles', async () => {
        await createComponent({
            result: '<span style="background-color: red;">Red Item</span>',
            trusted: false
        });
        const styledSpan = fixture.nativeElement.querySelector('span span[style]');
        expect(styledSpan).toBeNull();
        expect(fixture.nativeElement.textContent).toContain('Red Item');
    });
});
