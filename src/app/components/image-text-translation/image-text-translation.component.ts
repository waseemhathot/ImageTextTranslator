import { Component, OnInit } from '@angular/core';
import { TextDetectionService } from 'src/app/services/text-detection.service';
import { TextTranslationService } from 'src/app/services/text-translation.service';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { ModalService } from 'src/app/services/modal.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-image-text-translation',
    templateUrl: './image-text-translation.component.html',
    styleUrls: ['./image-text-translation.component.css']
})
export class ImageTextTranslationComponent implements OnInit {

    translatedText$: Observable<string>;

    constructor(private textTranslationService: TextTranslationService) {
        this.translatedText$ = this.textTranslationService.translatedText$;
    }

    ngOnInit() {
    }

}
