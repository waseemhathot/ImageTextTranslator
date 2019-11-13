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
            const image = new Image();
            image.onload = _ => {
                this.ctx.canvas.width = image.width;
                this.ctx.canvas.height = image.height;
                this.ctx.drawImage(image, 0, 0);
                this.drawTranslatedLines(this.ctx, this.canvasInfo.linesWithPositionArray);
            };
            image.src = this.canvasInfo.image;

        } else {

            loadImage.parseMetaData(this.canvasInfo.image, (data) => {
                let orientation = 0;
                if ((data as any).exif) {
                    orientation = (data as any).exif.get('Orientation');
                }

                loadImage(this.canvasInfo.image, (img) => {
                    this.ctx.canvas.width = img.width;
                    this.ctx.canvas.height = img.height;
                    this.ctx.drawImage(img, 0, 0);
                    this.drawTranslatedLines(this.ctx, this.canvasInfo.linesWithPositionArray);
                }, {
                    canvas: true,
                    orientation
                });
            });
        }
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
        ctx.fillStyle = '#fff';
        ctx.font = `${height}px arial`;
        ctx.fillText(line.text, x, y - (- height));
    }

}
