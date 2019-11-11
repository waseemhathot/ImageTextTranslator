import { Component, OnInit, ɵConsole } from '@angular/core';
import { faLanguage, faImage, faFileImage, faCamera } from '@fortawesome/free-solid-svg-icons';
import { TextDetectionService } from 'src/app/services/text-detection.service';
import { TextTranslationService } from 'src/app/services/text-translation.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

    faLanguage = faLanguage;
    faImage = faImage;
    faFileImage = faFileImage;
    faCamera = faCamera;

    selectedLanguage = 'ar';
    selectedUrl = '';
    translatedText = '';
    showLoadingAnimation = false;

    // tslint:disable-next-line: max-line-length
    constructor(private textDetectionService: TextDetectionService, private textTranslationService: TextTranslationService, private modalService: ModalService) { }

    ngOnInit() {
    }

    openModal(id: string) {
        this.modalService.open(id);
    }

    async onFileSelected(e: any) {

        this.modalService.open('loading-animation-modal');
        try {
            const imageText = await this.textDetectionService.getImageTextByFileAsPromise(e.target.files[0]);
            await this.textTranslationService.getTextTranslationAsPromise(imageText, this.selectedLanguage);
            this.modalService.close('loading-animation-modal');

        } catch (err) {
            this.modalService.close('loading-animation-modal');
        }
    }

    async onUrlSelected(e: Event) {
        this.modalService.close('url-modal');
        this.modalService.open('loading-animation-modal');

        try {
            const imageText = await this.textDetectionService.getImageTextByUrlAsPromise(this.selectedUrl);
            await this.textTranslationService.getTextTranslationAsPromise(imageText, this.selectedLanguage);
            this.modalService.close('loading-animation-modal');

        } catch (err) {
            this.modalService.close('loading-animation-modal');
        }
    }
}
