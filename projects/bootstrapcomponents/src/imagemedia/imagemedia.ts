import { DOCUMENT } from '@angular/common';
import { Component, OnInit, Renderer2, Input, SimpleChanges, ChangeDetectorRef, ChangeDetectionStrategy, Inject } from '@angular/core';
import { ServoyBootstrapBasefield } from '../bts_basefield';
import { WindowRefService } from '@servoy/public';

@Component({
    selector: 'bootstrapcomponents-imagemedia',
    templateUrl: './imagemedia.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class ServoyBootstrapImageMedia extends ServoyBootstrapBasefield<HTMLImageElement> {

    @Input() media;
    @Input() alternate;

    imageURL = 'bootstrapcomponents/imagemedia/images/empty.gif';

    constructor(renderer: Renderer2, cdRef: ChangeDetectorRef, @Inject(DOCUMENT) doc: Document, protected windowService: WindowRefService) {
        super(renderer, cdRef, doc);
    }

    svyOnInit(): void {
		super.svyOnInit();
     	if (this.onActionMethodID) {
     		this.renderer.listen(this.getFocusElement(), 'click', e => {
				this.onActionMethodID(e, this.getDataTarget(e));
			});
     	}
	}

    svyOnChanges(changes: SimpleChanges): void {
        if (changes) {
            for ( const property of Object.keys(changes) ) {
                const change = changes[property];
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
        if (this.dataProviderID) {
            let x = 0; let y = 0;
            if (this.doc.all) {
                x = this.windowService.nativeWindow.screenTop + 100;
                y = this.windowService.nativeWindow.screenLeft + 100;
            } else if (this.doc['layers']) {
                x = this.windowService.nativeWindow.screenX + 100;
                y = this.windowService.nativeWindow.screenY + 100;
            } else { // firefox, need to switch the x and y?
                y = this.windowService.nativeWindow.screenX + 100;
                x = this.windowService.nativeWindow.screenY + 100;
            }
            this.windowService.nativeWindow.open(this.dataProviderID.url ? this.dataProviderID.url : this.dataProviderID, 'download', 'top=' + x + ',left=' + y + ',screenX=' + x
                    + ',screenY=' + y + ',location=no,toolbar=no,menubar=no,width=310,height=140,resizable=yes');
        }
    }

    clear() {
        this.dataProviderID = null;
        this.pushUpdate();
    }


    private updateImageURL() {
        if (this.media) {
            this.imageURL = this.media;
            // do nothing if data provider changed but media is defined
        } else if(this.dataProviderID && this.dataProviderID.url) {
            this.imageURL = this.dataProviderID.url;
        } else if (!this.dataProviderID && this.servoyApi.isInDesigner()) {
            this.imageURL = 'bootstrapcomponents/imagemedia/media.png';
        } else if (!this.dataProviderID){
            this.imageURL = 'bootstrapcomponents/imagemedia/images/empty.gif';
        } else {
            this.imageURL = this.dataProviderID;
        }
    }
}
