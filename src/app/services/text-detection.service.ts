import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class TextDetectionService {

    constructor(private httpClient: HttpClient) {
    }

    async getImageTextByUrlAsPromise(imageUrl: string): Promise<string> {

        // tslint:disable-next-line: max-line-length
        const data = await this.httpClient.post(environment.textDetectionApiUrl, { url: imageUrl }, this.getHttpHeadersForUrl()).toPromise();
        const text = this.getTextFromComputerVisionJson(data);
        return text;
    }

    async getImageTextByFileAsPromise(image: any) {

        // tslint:disable-next-line: max-line-length
        const data = await this.httpClient.post(environment.textDetectionApiUrl, image, this.getHttpHeadersForFile()).toPromise();
        const text = this.getTextFromComputerVisionJson(data);
        console.log(text);
        return text;
    }

    private getTextFromComputerVisionJson(json: any): string {

        let text = '';

        for (const region of json.regions) {

            for (const line of region.lines) {

                for (const word of line.words) {

                    text += `${word.text} `;
                }
                text += '\n\n';
            }
            text += '\n\n\n';

        }

        return text;
    }

    private getHttpHeadersForUrl(): any {
        return {
            headers: new HttpHeaders({
                'content-type': 'application/json',
                'Ocp-Apim-Subscription-Key': environment.textDetectionApiKey
            })
        };
    }

    private getHttpHeadersForFile(): any {
        return {
            headers: new HttpHeaders({
                'content-type': 'application/octet-stream',
                'Ocp-Apim-Subscription-Key': environment.textDetectionApiKey
            })
        };
    }
}
