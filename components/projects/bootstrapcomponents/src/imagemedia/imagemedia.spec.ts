import { TestBed, ComponentFixture } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ServoyApiTesting, ServoyPublicTestingModule } from '@servoy/public';
import { ServoyBootstrapImageMedia } from './imagemedia';

describe('ServoyBootstrapImageMedia', () => {
    let fixture: ComponentFixture<ServoyBootstrapImageMedia>;
    let component: ServoyBootstrapImageMedia;

    async function createComponent(overrides: Record<string, any> = {}) {
        fixture = TestBed.createComponent(ServoyBootstrapImageMedia);
        component = fixture.componentInstance;

        const defaults: Record<string, any> = {
            servoyApi: new ServoyApiTesting(),
            enabled: true,
            dataProviderID: 0,
            ...overrides
        };

        for (const [key, value] of Object.entries(defaults)) {
            if (value !== undefined) {
                fixture.componentRef.setInput(key, value);
            }
        }

        fixture.detectChanges();
        await fixture.whenStable();
    }

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ServoyPublicTestingModule, FormsModule, ServoyBootstrapImageMedia],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();

        await createComponent();
    });

    it('should create', async () => {
        expect(component).toBeTruthy();
        const el = fixture.nativeElement.querySelector('.svy-mediafield');
        expect(el).not.toBeNull();
    });

    it('should show the media img', async () => {
        fixture.componentRef.setInput('media', 'image.png');
        fixture.detectChanges();
        await fixture.whenStable();
        const img = fixture.nativeElement.querySelector('.svy-mediafield .bts-media') as HTMLImageElement;
        expect(img.getAttribute('src')).toBe('image.png');
    });

    it('show a style class', async () => {
        const el = fixture.nativeElement.querySelector('.svy-mediafield') as HTMLElement;
        expect(el.classList.contains('mystyleclass')).toBe(false);
        fixture.componentRef.setInput('styleClass', 'mystyleclass');
        fixture.detectChanges();
        await fixture.whenStable();
        expect(el.classList.contains('mystyleclass')).toBe(true);
    });

    it('show more than 1 style class', async () => {
        fixture.componentRef.setInput('styleClass', 'classA classB');
        fixture.detectChanges();
        await fixture.whenStable();
        const el = fixture.nativeElement.querySelector('.svy-mediafield') as HTMLElement;
        expect(el.classList.contains('classA')).toBe(true);
        expect(el.classList.contains('classB')).toBe(true);
    });

    it('should be disabled', async () => {
        fixture.componentRef.setInput('enabled', false);
        fixture.detectChanges();
        await fixture.whenStable();
        const el = fixture.nativeElement.querySelector('.svy-mediafield') as HTMLElement;
        expect(el.hasAttribute('disabled')).toBe(true);
    });

    it('should handle onaction event', async () => {
        const onActionMethodID = vi.fn();
        await createComponent({ onActionMethodID });
        const el = fixture.nativeElement.querySelector('.svy-mediafield') as HTMLElement;
        el.click();
        fixture.detectChanges();
        await fixture.whenStable();
        expect(onActionMethodID).toHaveBeenCalled();
    });

    it('should update image when dataProviderID changes', async () => {
        fixture.componentRef.setInput('dataProviderID', 'image1.png');
        fixture.detectChanges();
        await fixture.whenStable();
        const img = fixture.nativeElement.querySelector('.svy-mediafield .bts-media') as HTMLImageElement;
        expect(img.getAttribute('src')).toBe('image1.png');
        fixture.componentRef.setInput('dataProviderID', 'image2.png');
        fixture.detectChanges();
        await fixture.whenStable();
        expect(img.getAttribute('src')).toBe('image2.png');
    });
});
