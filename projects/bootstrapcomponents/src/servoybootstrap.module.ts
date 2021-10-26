
import { NgModule } from '@angular/core';
import { ServoyPublicModule, SpecTypesService } from '@servoy/public';
import { ServoyBootstrapButton } from './button/button';
import { ServoyBootstrapLabel } from './label/label';
import { CommonModule } from '@angular/common';
import { ServoyBootstrapTextarea } from './textarea/textarea';
import { FormsModule } from '@angular/forms';
import { ChoiceElementDirective } from './choicegroup/choicegroup';
import { ServoyBootstrapChoicegroup } from './choicegroup/choicegroup';
import { ServoyBootstrapCheckbox } from './checkbox/checkbox';
import { ServoyBootstrapTextbox } from './textbox/textbox';
import { ServoyBootstrapDatalabel, DesignTextPipe } from './datalabel/datalabel';
import { ServoyBootstrapList } from './list/list';
import { ServoyBootstrapSelect } from './select/select';
import { ServoyBootstrapAccordion } from './accordion/accordion';
import { ServoyBootstrapTypeahead } from './typeahead/typeahead';
import { ServoyBootstrapTabpanel } from './tabpanel/tabpanel';
import { ServoyBootstrapTablesspanel } from './tablesspanel/tablesspanel';
import { ServoyBootstrapCombobox } from './combobox/combobox';
import { ServoyBootstrapCalendar } from './calendar/calendar';
import { ServoyBootstrapCalendarinline } from './calendarinline/calendarinline';
import { ShowDisplayValuePipe } from './lib/showDisplayValue.pipe';
import { ServoyBootstrapImageMedia } from './imagemedia/imagemedia';
import { OwlDateTimeModule, OwlNativeDateTimeModule} from '@danielmoncada/angular-datetime-picker';
import { NgbModule }  from '@ng-bootstrap/ng-bootstrap';
import { Tab } from './bts_basetabpanel';

@NgModule({
    declarations: [
      ServoyBootstrapImageMedia,
      ServoyBootstrapButton,
      ServoyBootstrapLabel,
      ServoyBootstrapTextarea,
      ServoyBootstrapChoicegroup,
      ChoiceElementDirective,
      ServoyBootstrapCheckbox,
      ServoyBootstrapTextbox,
      ServoyBootstrapDatalabel,
      ServoyBootstrapList,
      ServoyBootstrapSelect,
      ServoyBootstrapAccordion,
      ServoyBootstrapTypeahead,
      ServoyBootstrapTabpanel,
      ServoyBootstrapTablesspanel,
      ServoyBootstrapCombobox,
      ServoyBootstrapCalendar,
      ServoyBootstrapCalendarinline,
      ShowDisplayValuePipe,
      DesignTextPipe
    ],
    providers: [],
    imports: [
      ServoyPublicModule,
      CommonModule,
      FormsModule,
      OwlDateTimeModule,
      OwlNativeDateTimeModule,
      NgbModule
    ],
    exports: [
      ServoyBootstrapImageMedia,
      ServoyBootstrapButton,
      ServoyBootstrapLabel,
      ServoyBootstrapTextarea,
      ServoyBootstrapChoicegroup,
      ServoyBootstrapCheckbox,
      ServoyBootstrapTextbox,
      ServoyBootstrapDatalabel,
      ServoyBootstrapList,
      ServoyBootstrapSelect,
      ServoyBootstrapAccordion,
      ServoyBootstrapTypeahead,
      ServoyBootstrapTabpanel,
      ServoyBootstrapTablesspanel,
      ServoyBootstrapCombobox,
      ServoyBootstrapCalendar,
      ServoyBootstrapCalendarinline]
})
export class ServoyBootstrapComponentsModule {
     constructor( specTypesService: SpecTypesService ) {
        specTypesService.registerType('bootstrapcomponents-tabpanel.tab', Tab);
        specTypesService.registerType('bootstrapcomponents-tablesspanel.tab', Tab);
        specTypesService.registerType('bootstrapcomponents-accordion.tab', Tab);
    }
}
