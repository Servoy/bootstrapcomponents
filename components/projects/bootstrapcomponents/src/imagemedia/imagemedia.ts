
import { Component, SimpleChanges, ChangeDetectionStrategy, inject, input, signal } from '@angular/core';
import { ServoyBootstrapBasefield } from '../bts_basefield';
import { WindowRefService, ServoyPublicModule } from '@servoy/public';

@Component({
    selector: 'bootstrapcomponents-imagemedia',
    templateUrl: './imagemedia.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [ServoyPublicModule]
})
export class ServoyBootstrapImageMedia extends ServoyBootstrapBasefield<HTMLImageElement> {

    readonly media = input(undefined);
    readonly alternate = input(undefined);

    imageURL = signal('bootstrapcomponents/imagemedia/images/empty.gif');

    protected readonly windowService = inject(WindowRefService);

    svyOnInit(): void {
		super.svyOnInit();
     	if (this.onActionMethodID()) {
     		this.renderer.listen(this.getFocusElement(), 'click', e => {
				this.onActionMethodID()!(e, this.getDataTarget(e));
			});
     	}
	}

    svyOnChanges(changes: SimpleChanges): void {
        if (changes) {
            for ( const property of Object.keys(changes) ) {
                switch ( property ) {
                case 'media':
                    this.updateImageURL();
                    break;
                case 'dataProviderID':
                    this.updateImageURL();
                    break;
                }
            }
            super.svyOnChanges(changes);
        }
    }

    download() {
        const dataProviderID = this._dataProviderID();
        if (dataProviderID) {
            let x: number; let y: number;
            if (this.doc.all) {
                x = this.windowService.nativeWindow.screenTop + 100;
                y = this.windowService.nativeWindow.screenLeft + 100;
            } else if ((this.doc as any)['layers']) {
                x = this.windowService.nativeWindow.screenX + 100;
                y = this.windowService.nativeWindow.screenY + 100;
            } else { // firefox, need to switch the x and y?
                y = this.windowService.nativeWindow.screenX + 100;
                x = this.windowService.nativeWindow.screenY + 100;
            }
            this.windowService.nativeWindow.open(dataProviderID.url ? dataProviderID.url : dataProviderID, 'download', 'top=' + x + ',left=' + y + ',screenX=' + x
                    + ',screenY=' + y + ',location=no,toolbar=no,menubar=no,width=310,height=140,resizable=yes');
        }
    }

    clear() {
        this._dataProviderID.set(null);
        this.pushUpdate();
    }


    private updateImageURL() {
        const dataProviderID = this._dataProviderID();
        const media = this.media();
        if (media) {
            this.imageURL.set(media);
        } else if(dataProviderID && dataProviderID.url) {
            this.imageURL.set(dataProviderID.url);
        } else if (!dataProviderID && this.servoyApi().isInDesigner()) {
            this.imageURL.set('bootstrapcomponents/imagemedia/media.png');
        } else if (!dataProviderID){
            this.imageURL.set('bootstrapcomponents/imagemedia/images/empty.gif');
        } else {
            this.imageURL.set(dataProviderID);
        }
    }
}
