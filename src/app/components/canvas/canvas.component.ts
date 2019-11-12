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
            this.ctx.canvas.width = image.width;
            this.ctx.canvas.height = image.height;
            this.ctx.drawImage(image, 0, 0);
            this.drawTranslatedLines(this.ctx, this.canvasInfo.linesWithPositionArray);
        };

        if (typeof this.canvasInfo.image === 'string') {
            image.src = this.canvasInfo.image;

        } else {
            const reader = new FileReader();
            reader.readAsDataURL(this.canvasInfo.image);

            reader.onload = (evt: any) => {
                if (evt.target.readyState === FileReader.DONE) {
                    image.src = evt.target.result as string;
                }
            };
        }
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