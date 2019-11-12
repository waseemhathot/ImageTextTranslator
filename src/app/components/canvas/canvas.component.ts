import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input, ɵCompiler_compileModuleSync__POST_R3__ } from '@angular/core';
import { Canvas } from 'src/app/interfaces/canvas';
import { Line } from 'src/app/interfaces/line';

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

        const image = new Image();
        image.onload = _ => {
            // this.ctx.canvas.width = Math.min(image.width, window.innerWidth || 0);
            // this.ctx.canvas.height = Math.min(image.height, window.innerHeight || 0);
            this.ctx.canvas.width = image.width;
            this.ctx.canvas.height = image.height;
            this.ctx.drawImage(image, 0, 0);
            // this.ctx.translate(this.ctx.canvas.width, 0);
            this.drawTranslatedLines(this.ctx, this.canvasInfo.linesWithPositionArray);
        };
        image.src = this.canvasInfo.image;
    }

    drawTranslatedLines(ctx: CanvasRenderingContext2D, lines: Line[]) {

        lines.map(line => {
            this.drawLine(ctx, line);
        });
    }

    drawLine(ctx: CanvasRenderingContext2D, line: Line) {
        ctx.fillStyle = '#000';
        ctx.fillRect(line.boundingBox[0],
            line.boundingBox[1],
            line.boundingBox[2],
            line.boundingBox[3]);
        ctx.fillStyle = '#fff';
        ctx.font = 'calc(0.9em + 0.2vmax) arial';
        ctx.fillText(line.text, line.boundingBox[0], line.boundingBox[1] - (-12));
    }
}
