import { Injectable } from '@angular/core';
import { TextDetectionService } from './text-detection.service';
import { Line } from '../interfaces/line';
import { TextTranslationService } from './text-translation.service';
import { Canvas } from '../interfaces/canvas';

@Injectable({
    providedIn: 'root'
})
export class CanvasBuildingService {

    constructor(private textDetectionService: TextDetectionService, private textTranslationService: TextTranslationService) { }

    async getTransTextPosArrayByUrl(imageUrl: string, language: string): Promise<Line[]> {

        try {
            const imageTextLines: Line[] = await this.textDetectionService.getImageTextLinesByUrl(imageUrl);

            for (const line of imageTextLines) {
                const lineText = await this.textTranslationService.getTextTranslationAsPromise(line.text, language);
                line.text = lineText[0];
            }
            return imageTextLines;

        } catch {
            return null;
        }
    }

    async buildCanvasByUrl(imageUrl: string, language: string): Promise<Canvas> {

        const lines: Line[] = await this.getTransTextPosArrayByUrl(imageUrl, language);
        return {
            image: imageUrl,
            linesWithPositionArray: lines,
        };
    }

}
