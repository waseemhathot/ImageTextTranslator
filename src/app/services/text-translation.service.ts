import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TextTranslationService {

    // tslint:disable-next-line: variable-name
    private _translatedText = new BehaviorSubject<string>(null);
    public readonly translatedText$: Observable<string> = this._translatedText.asObservable();

    constructor(private httpClient: HttpClient) { }

    async getTextTranslationAsPromise(text: string, lang: string): Promise<string> {
        const data: any = await this.httpClient
            // tslint:disable-next-line: max-line-length
            .get(`${environment.textTranslationApiUrl}?key=${environment.textTranslationApiKey}&text=${encodeURI(text)}&lang=${lang}`)
            .toPromise();

        const translatedText = this.getTextFomYandexJSON(data);
        this._translatedText.next(translatedText);
        return translatedText;
    }

    private getTextFomYandexJSON(data: any): string {
        return data.text;
    }
}
