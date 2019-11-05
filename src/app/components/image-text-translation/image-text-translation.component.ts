import { Component, OnInit } from '@angular/core';
import { TextDetectionService } from 'src/app/services/text-detection.service';
import { TextTranslationService } from 'src/app/services/text-translation.service';
import { faCheck, faTimes} from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-image-text-translation',
    templateUrl: './image-text-translation.component.html',
    styleUrls: ['./image-text-translation.component.css']
})
export class ImageTextTranslationComponent implements OnInit {

    imageUrl = '';
    imageFilePath: any;
    translatedText = '';
    selectedLanguage = 'ar';

    showLoadingAnimation = false;
    showErrorMark = false;
    showCheckMark = false;

    faCheck = faCheck;
    faTimes = faTimes;

    constructor(private textDetectionService: TextDetectionService, private textTranslationService: TextTranslationService) { }

    ngOnInit() {
    }

    onFileSelected(e: any) {
        this.imageFilePath = e.target.files[0];
    }

    async translate(): Promise<void> {
        this.showLoadingAnimation = true;
        this.showErrorMark = false;
        this.showCheckMark = false;

        try {
            if (this.imageFilePath) {

                const imageText = await this.textDetectionService.getImageTextByFileAsPromise(this.imageFilePath);
                this.translatedText = await this.textTranslationService.getTextTranslationAsPromise(imageText, this.selectedLanguage);
            } else {

                const imageText = await this.textDetectionService.getImageTextByUrlAsPromise(this.imageUrl);
                this.translatedText = await this.textTranslationService.getTextTranslationAsPromise(imageText, this.selectedLanguage);
            }
            this.showCheckMark = true;
            this.showLoadingAnimation = false;
        } catch (err) {
            this.showErrorMark = true;
            this.showLoadingAnimation = false;
        }

        this.showLoadingAnimation = false;
    }

}
