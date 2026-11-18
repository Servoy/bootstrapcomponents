import { TestBed, ComponentFixture } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { describe, it, expect, beforeEach } from 'vitest';
import { ServoyApiTesting, ServoyPublicService, ServoyPublicServiceTestingImpl, ServoyPublicTestingModule } from '@servoy/public';
import { ServoyBootstrapTablesspanel } from './tablesspanel';

describe('ServoyBootstrapTablesspanel', () => {
    let fixture: ComponentFixture<ServoyBootstrapTablesspanel>;
    let component: ServoyBootstrapTablesspanel;

    async function createComponent(servoyApi: ServoyApiTesting, containedForm?: string) {
        fixture = TestBed.createComponent(ServoyBootstrapTablesspanel);
        component = fixture.componentInstance;
        fixture.componentRef.setInput('servoyApi', servoyApi);
        fixture.componentRef.setInput('enabled', true);
        if (containedForm) {
            fixture.componentRef.setInput('containedForm', containedForm);
        }
        fixture.detectChanges();
        await fixture.whenStable();
    }

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ServoyPublicTestingModule, ServoyBootstrapTablesspanel],
            providers: [{ provide: ServoyPublicService, useClass: ServoyPublicServiceTestingImpl }],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();
    });

    it('shows no hint at runtime', async () => {
        await createComponent(new ServoyApiTesting());
        expect((component.getNativeElement().innerText ?? '')).not.toContain('Select contained form');
    });

    it('shows the hint in the designer when no form is set', async () => {
        const api: any = new ServoyApiTesting();
        api.isInDesigner = () => true;
        await createComponent(api);
        expect(component.getNativeElement().innerText).toContain('Select contained form');
    });

    it('shows the hint in the sample data render when no form is set', async () => {
        const api: any = new ServoyApiTesting();
        api.isInSampleDataMode = () => true;
        await createComponent(api);
        expect(component.getNativeElement().innerText).toContain('Select contained form');
    });

    it('shows no hint in the sample data render when a form is set', async () => {
        const api: any = new ServoyApiTesting();
        api.isInSampleDataMode = () => true;
        await createComponent(api, 'someForm');
        expect((component.getNativeElement().innerText ?? '')).not.toContain('Select contained form');
    });
});
