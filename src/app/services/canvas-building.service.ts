import { Injectable } from '@angular/core';
import { TextDetectionService } from './text-detection.service';
import { Line } from '../interfaces/line';
import { TextTranslationService } from './text-translation.service';
import { Canvas } from '../interfaces/canvas';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CanvasBuildingService {

    // tslint:disable-next-line: variable-name
    private _canvas = new BehaviorSubject<Canvas>(null);
    public readonly canvas$: Observable<Canvas> = this._canvas.asObservable();

    constructor(private textDetectionService: TextDetectionService, private textTranslationService: TextTranslationService) {
    }

    async buildCanvasByUrl(imageUrl: string, language: string): Promise<Canvas> {

        const lines: Line[] = await this.getTransTextPosArrayByUrl(imageUrl, language);
        if (!lines) {
            this._canvas.next(null);
            return null;
        }

        const canvas: Canvas = {
            image: imageUrl,
            linesWithPositionArray: lines,
        };

        this._canvas.next(canvas);

        return canvas;
    }

    async buildCanvasByFile(imageFile: any, language: string): Promise<Canvas> {

        const lines: Line[] = await this.getTransTextPosArrayByFile(imageFile, language);
        const canvas: Canvas = {
            image: imageFile,
            linesWithPositionArray: lines,
        };

        this._canvas.next(canvas);

        return canvas;
    }

    private async getTransTextPosArrayByUrl(imageUrl: string, language: string): Promise<Line[]> {

        try {

            const imageTextLines: Line[] = await this.textDetectionService.getImageTextLinesByUrl(imageUrl);
            if (imageTextLines.length === 0) {
                throw new Error();
            }

            for (const line of imageTextLines) {
                const lineText = await this.textTranslationService.getTextTranslationAsPromise(line.text, language);
                line.text = lineText[0];
            }


            return imageTextLines;

        } catch {
            return null;
        }
    }

    private async getTransTextPosArrayByFile(image: any, language: string): Promise<Line[]> {

        try {

            const imageTextLines: Line[] = await this.textDetectionService.getImageTextLinesByFile(image);
            if (imageTextLines.length === 0) {
                throw new Error();
            }

            const translatedLines: Line[] = [];
            for (const line of imageTextLines) {

                const lineTranslatedText = await this.textTranslationService.getTextTranslationAsPromise(line.text, language);
                const translatedLine: Line = {
                    boundingBox: line.boundingBox,
                    text: lineTranslatedText[0],
                };

                translatedLines.push(translatedLine);
            }

            return translatedLines;

        } catch {
            return null;
        }
    }

    clearCanvas() {
        this._canvas.next(null);
    }

}
