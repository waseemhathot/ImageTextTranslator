import { Component, OnInit } from '@angular/core';
import { TextTranslationService } from 'src/app/services/text-translation.service';
import { Observable } from 'rxjs';
import { Canvas } from 'src/app/interfaces/canvas';
import { CanvasBuildingService } from 'src/app/services/canvas-building.service';

@Component({
    selector: 'app-image-text-translation',
    templateUrl: './image-text-translation.component.html',
    styleUrls: ['./image-text-translation.component.css']
})
export class ImageTextTranslationComponent implements OnInit {

    translatedText$: Observable<string>;
    canvas: Canvas;

    constructor(private textTranslationService: TextTranslationService, private canvasBuildingService: CanvasBuildingService) {
        this.translatedText$ = this.textTranslationService.translatedText$;
        const url = 'https://thefader-res.cloudinary.com/private_images/w_750,c_limit,f_auto,q_auto:eco/Screen_Shot_2017-09-26_at_5.09.58_PM_ztvuvu/Screen_Shot_2017-09-26_at_5.09.58_PM_ztvuvu.jpg'
        this.canvasBuildingService.getTransTextPosArrayByUrl(url, 'ar').then(data => {
            this.canvas = {
                image: url,
                linesWithPositionArray: data,
            };
        });
    }

    ngOnInit() {
    }

}
