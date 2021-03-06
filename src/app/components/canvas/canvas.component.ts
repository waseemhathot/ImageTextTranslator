import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input, ɵCompiler_compileModuleSync__POST_R3__ } from '@angular/core';
import { Canvas } from 'src/app/interfaces/canvas';
import { Line } from 'src/app/interfaces/line';
import loadImage from 'blueimp-load-image';
import { OriginalSource } from 'webpack-sources';

@Component({
    selector: 'app-canvas',
    templateUrl: './canvas.component.html',
    styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit, AfterViewInit {

    @Input() canvasInfo: Canvas;
    @ViewChild('canvas', { static: false }) canvas: ElementRef;

    ctx: CanvasRenderingContext2D;

    constructor() { }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.ctx = (this.canvas.nativeElement as HTMLCanvasElement).getContext('2d');

        if (typeof this.canvasInfo.image === 'string') {
            this.drawImageByUrl(this.ctx, this.canvasInfo);

        } else {
            this.drawImageByFile(this.ctx, this.canvasInfo);
        }
    }

    drawImageByUrl(ctx: CanvasRenderingContext2D, canvasInfo: Canvas) {

        const image = new Image();
        image.onload = _ => {
            ctx.canvas.width = image.width;
            ctx.canvas.height = image.height;
            ctx.drawImage(image, 0, 0);
            this.drawTranslatedLines(ctx, canvasInfo.linesWithPositionArray);
        };
        image.src = canvasInfo.image;
    }

    drawImageByFile(ctx: CanvasRenderingContext2D, canvasInfo: Canvas) {

        loadImage.parseMetaData(canvasInfo.image, (data) => {
            let orientation = 0;
            if ((data as any).exif) {
                orientation = (data as any).exif.get('Orientation');
            }

            loadImage(canvasInfo.image, (img) => {
                ctx.canvas.width = img.width;
                ctx.canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                this.drawTranslatedLines(ctx, canvasInfo.linesWithPositionArray);
            }, {
                canvas: true,
                orientation
            });
        });
    }

    drawTranslatedLines(ctx: CanvasRenderingContext2D, lines: Line[]) {

        lines.map(line => {
            this.drawLine(ctx, line);
        });
    }

    drawLine(ctx: CanvasRenderingContext2D, line: Line) {
        const x = line.boundingBox[0];
        const y = line.boundingBox[1];
        const width = line.boundingBox[2];
        const height = line.boundingBox[3];

        ctx.fillStyle = '#000';
        ctx.fillRect(x, y, width, height);
        ctx.fillStyle = '#f00';
        ctx.font = `${ 2 * height / 3 }px arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const fontYPos: number = y - (-height / 2);
        const fontXPos: number = x - (-width / 2);
        ctx.fillText(line.text, fontXPos, fontYPos);
    }

}
