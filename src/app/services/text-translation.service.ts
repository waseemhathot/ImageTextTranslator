import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class TextTranslationService {
    constructor(private httpClient: HttpClient) { }

    async getTextTranslationAsPromise(text: string, lang: string): Promise<string> {
        const data: any = await this.httpClient
            // tslint:disable-next-line: max-line-length
            .get(`${environment.corsProxy}${environment.textTranslationApiUrl}?key=${environment.textTranslationApiKey}&text=${encodeURI(text)}&lang=${lang}`)
            .toPromise();
        return this.getTextFomYandexJSON(data);
    }

    private getTextFomYandexJSON(data: any): string {
        return data.text;
    }
}
