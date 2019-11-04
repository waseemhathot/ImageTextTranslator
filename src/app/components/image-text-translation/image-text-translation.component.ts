import { Component, OnInit } from '@angular/core';
import { TextDetectionService } from 'src/app/services/text-detection.service';
import { TextTranslationService } from 'src/app/services/text-translation.service';

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

    constructor(private textDetectionService: TextDetectionService, private textTranslationService: TextTranslationService) { }

    ngOnInit() {
    }

    onFileSelected(e: any) {
        this.imageFilePath = e.target.files[0];
    }

    async translate() {
        if (this.imageFilePath) {

            const imageText = await this.textDetectionService.getImageTextByFileAsPromise(this.imageFilePath);
            this.translatedText = await this.textTranslationService.getTextTranslationAsPromise(imageText, this.selectedLanguage);
        } else {

            const imageText = await this.textDetectionService.getImageTextByUrlAsPromise(this.imageUrl);
            this.translatedText = await this.textTranslationService.getTextTranslationAsPromise(imageText, this.selectedLanguage);
        }
    }

}
