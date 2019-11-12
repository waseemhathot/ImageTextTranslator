import { Component, OnInit, OnDestroy } from '@angular/core';
import { TextTranslationService } from 'src/app/services/text-translation.service';
import { Observable, Subscription } from 'rxjs';
import { Canvas } from 'src/app/interfaces/canvas';
import { CanvasBuildingService } from 'src/app/services/canvas-building.service';

@Component({
    selector: 'app-image-text-translation',
    templateUrl: './image-text-translation.component.html',
    styleUrls: ['./image-text-translation.component.css']
})
export class ImageTextTranslationComponent implements OnInit, OnDestroy {

    translatedText$: Observable<string>;
    canvas$: Observable<Canvas>;
    canvas: Canvas;
    canvasSub: Subscription;

    constructor(private canvasBuildingService: CanvasBuildingService) {
        this.canvas$ = this.canvasBuildingService.canvas$;
        this.canvasSub = this.canvasBuildingService.canvas$.subscribe(cvs => this.canvas = cvs);
    }

    ngOnInit() { }

    ngOnDestroy() {
        this.canvasSub.unsubscribe();
    }

}
