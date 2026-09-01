import { TestBed, ComponentFixture } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ServoyApiTesting, ServoyPublicTestingModule } from '@servoy/public';
import { ServoyBootstrapAccordion } from './accordion';
import { Tab } from '../bts_basetabpanel';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

describe('ServoyBootstrapAccordion', () => {
    let fixture: ComponentFixture<ServoyBootstrapAccordion>;
    let component: ServoyBootstrapAccordion;

    function createDefaultTabs(): Tab[] {
        const tabs: Tab[] = [];
        let tab = { name: 'tab1', containedForm: 'form1', text: 'tab1', disabled: false } as Tab;
        tabs.push(tab);
        tab = { name: 'tab2', containedForm: 'form2', text: 'tab2', disabled: false } as Tab;
        tabs.push(tab);
        tab = { name: 'tab3', containedForm: 'form3', text: 'tab3', disabled: false } as Tab;
        tabs.push(tab);
        return tabs;
    }

    async function createComponent(overrides: Record<string, any> = {}) {
        fixture = TestBed.createComponent(ServoyBootstrapAccordion);
        component = fixture.componentInstance;

        const defaults: Record<string, any> = {
            servoyApi: new ServoyApiTesting(),
            enabled: true,
            height: 100,
            tabs: createDefaultTabs(),
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
            imports: [ServoyPublicTestingModule, NgbModule, ServoyBootstrapAccordion],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();

        await createComponent();
    });

    it('should create', async () => {
        expect(component).toBeTruthy();
        const el = fixture.nativeElement.querySelector('.bts-accordion');
        expect(el).not.toBeNull();
    });

    it('should return a valid native element from getNativeElement()', () => {
        expect(component.getNativeElement()).not.toBeNull();
        expect(component.getNativeElement()).toBeInstanceOf(HTMLElement);
    });

    it('should show tabs', async () => {
        const buttons = fixture.nativeElement.querySelectorAll('button');
        expect(buttons.length).toBe(3);
        expect(buttons[0].textContent).toContain('tab1');
        expect(buttons[1].textContent).toContain('tab2');
        expect(buttons[2].textContent).toContain('tab3');
    });

    it('should handle tab click', async () => {
        const servoyApi = new ServoyApiTesting();
        const callServerSideApiSpy = vi.spyOn(servoyApi, 'callServerSideApi');
        await createComponent({ servoyApi });
        const buttons = fixture.nativeElement.querySelectorAll('button');
        buttons[1].click();
        fixture.detectChanges();
        await fixture.whenStable();
        expect(callServerSideApiSpy).toHaveBeenCalledWith('setTabIndexInternal', [2]);
    });

    it('should handle tabs edit - add tab', async () => {
        fixture.componentRef.setInput('tabIndex', 2);
        fixture.detectChanges();
        await fixture.whenStable();

        const tab = { name: 'tab4', containedForm: 'form4', text: 'tab4', disabled: false } as Tab;
        const tabs = [...createDefaultTabs(), tab];
        fixture.componentRef.setInput('tabs', tabs);
        fixture.detectChanges();
        await fixture.whenStable();

        const buttons = fixture.nativeElement.querySelectorAll('button');
        expect(buttons.length).toBe(4);
        expect(buttons[3].textContent).toContain('tab4');
    });

    describe('containerStyleClass binding', () => {
        it('should apply containerStyleClass to the accordion body wrapper', async () => {
            await createComponent({ containerStyleClass: 'my-container-class' });
            fixture.componentRef.setInput('tabIndex', 1);
            fixture.detectChanges();
            await fixture.whenStable();

            const body = fixture.nativeElement.querySelector('.my-container-class');
            expect(body).not.toBeNull();
        });

        it('should not add a bogus class or error when containerStyleClass is undefined', async () => {
            fixture.componentRef.setInput('tabIndex', 1);
            fixture.detectChanges();
            await fixture.whenStable();

            expect(component.containerStyleClass()).toBeUndefined();
            expect(fixture.nativeElement.querySelector('.undefined')).toBeNull();
            expect(fixture.nativeElement.querySelector('.null')).toBeNull();
        });

        it('should update the applied class when containerStyleClass changes', async () => {
            await createComponent({ containerStyleClass: 'class-a' });
            fixture.componentRef.setInput('tabIndex', 1);
            fixture.detectChanges();
            await fixture.whenStable();
            expect(fixture.nativeElement.querySelector('.class-a')).not.toBeNull();

            fixture.componentRef.setInput('containerStyleClass', 'class-b');
            fixture.detectChanges();
            await fixture.whenStable();
            expect(fixture.nativeElement.querySelector('.class-a')).toBeNull();
            expect(fixture.nativeElement.querySelector('.class-b')).not.toBeNull();
        });
    });
});
