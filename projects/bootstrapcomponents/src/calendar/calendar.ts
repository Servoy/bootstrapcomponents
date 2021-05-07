import { DOCUMENT } from '@angular/common';
import { Component, Renderer2, ElementRef, ViewChild, Input, ChangeDetectorRef, SimpleChanges, ChangeDetectionStrategy, Inject } from '@angular/core';
import { DateTimeAdapter, OwlDateTimeComponent, OwlDateTimeIntl } from '@danielmoncada/angular-datetime-picker';
import { PickerType } from '@danielmoncada/angular-datetime-picker/lib/date-time/date-time.class';
import { Format  } from '@servoy/public';
import { LoggerFactory, LoggerService, ServoyPublicService } from '@servoy/public';
import { ServoyBootstrapBaseCalendar } from './basecalendar';

@Component({
    selector: 'bootstrapcomponents-calendar',
    templateUrl: './calendar.html',
    styleUrls: ['./calendar.scss'],
    providers: [OwlDateTimeIntl],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServoyBootstrapCalendar extends ServoyBootstrapBaseCalendar {

    @ViewChild('inputElement') inputElementRef: ElementRef;
    @ViewChild(OwlDateTimeComponent) datetime: OwlDateTimeComponent<any>;
    @Input() format: Format;
    @Input() pickerOnly: boolean;

    public pickerType: PickerType = 'both';
    public showSecondsTimer = false;

    private log: LoggerService;

    constructor(renderer: Renderer2,
        cdRef: ChangeDetectorRef,
        dateTimeAdapter: DateTimeAdapter<any>,
        owlDateTimeIntl: OwlDateTimeIntl,
        logFactory: LoggerFactory,
        servoyService: ServoyPublicService,
        @Inject(DOCUMENT) doc: Document) {
        super(renderer, cdRef, servoyService, dateTimeAdapter, doc);
        servoyService.getI18NMessages('servoy.button.ok', 'servoy.button.cancel').then((val) => {
            if (val['servoy.button.ok']) owlDateTimeIntl.setBtnLabel = val['servoy.button.ok'];
            if (val['servoy.button.cancel']) owlDateTimeIntl.cancelBtnLabel = val['servoy.button.cancel'];
        });
        this.log = logFactory.getLogger('bts-calendar');
    }


    attachFocusListeners(nativeElement: any) {
        super.attachFocusListeners(nativeElement);
        if (this.onFocusGainedMethodID) {
            this.datetime.afterPickerOpen.subscribe(() => {
                this.onFocusGainedMethodID(new CustomEvent('focus'));
            });
        }

        if (this.onFocusLostMethodID) {
            this.datetime.afterPickerClosed.subscribe(() => {
                this.onFocusLostMethodID(new CustomEvent('blur'));
            });
        }
    }

    svyOnChanges(changes: SimpleChanges) {
        for (const property of Object.keys(changes)) {
            const change = changes[property];
            switch (property) {
                case 'format':
                    if (change.currentValue.type === 'DATETIME' && change.currentValue.display) {
                        const format = change.currentValue.display;
                        const showCalendar = format.indexOf('y') >= 0 || format.indexOf('M') >= 0;
                        const showTime = format.indexOf('h') >= 0 || format.indexOf('H') >= 0 || format.indexOf('m') >= 0;
                        if (showCalendar) {
                            if (showTime) this.pickerType = 'both';
                            else this.pickerType = 'calendar';
                        } else this.pickerType = 'timer';
                        this.showSecondsTimer = format.indexOf('s') >= 0;
                        this.hour12Timer = format.indexOf('h') >= 0 || format.indexOf('a') >= 0 || format.indexOf('A') >= 0;
                    } else {
                        this.log.warn('wrong format or type given into the calendar field ' + JSON.stringify(change.currentValue));
                    }
                    break;
            }
        }
        super.svyOnChanges(changes);
    }

    public dateChanged(event) {
        if (event && event.value) {
            this.dataProviderID = event.value.toDate();
        } else this.dataProviderID = null;
        super.pushUpdate();
    }

    getFocusElement(): any {
        return this.inputElementRef.nativeElement;
    }

    getStyleClassElement(): any {
        return this.inputElementRef.nativeElement;
    }
}
