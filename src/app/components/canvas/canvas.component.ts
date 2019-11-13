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

            this.getOrientation(this.canvasInfo.image, (orientation) => {
                this.getBase64(this.canvasInfo.image, orientation);
              });
            image.src = URL.createObjectURL(this.canvasInfo.image);
            // const reader = new FileReader();
            // reader.readAsDataURL(this.canvasInfo.image);
            // reader.onload = (evt: any) => {

            //     if (evt.target.readyState === FileReader.DONE) {
            //         image.src = evt.target.result as string;
            //     }
            // };
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
        ctx.font = 'calc(1em + 0.2vmax) arial';
        ctx.fillText(line.text, line.boundingBox[0], line.boundingBox[1] - (-14));
    }

    getOrientation(file, callback) {

        var reader: any,
            target: EventTarget;
        reader = new FileReader();
        reader.onload = (event) => {

            var view = new DataView(event.target.result);

            if (view.getUint16(0, false) != 0xFFD8) return callback(-2);

            var length = view.byteLength,
                offset = 2;

            while (offset < length) {
                var marker = view.getUint16(offset, false);
                offset += 2;

                if (marker == 0xFFE1) {
                    if (view.getUint32(offset += 2, false) != 0x45786966) {
                        return callback(-1);
                    }
                    var little = view.getUint16(offset += 6, false) == 0x4949;
                    offset += view.getUint32(offset + 4, little);
                    var tags = view.getUint16(offset, little);
                    offset += 2;

                    for (var i = 0; i < tags; i++)
                        if (view.getUint16(offset + (i * 12), little) == 0x0112)
                            return callback(view.getUint16(offset + (i * 12) + 8, little));
                }
                else if ((marker & 0xFF00) != 0xFF00) break;
                else offset += view.getUint16(offset, false);
            }
            return callback(-1);
        };

        reader.readAsArrayBuffer(file.slice(0, 64 * 1024));
    };

    getBase64(file, orientation) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            var base64 = reader.result;
            this.resetOrientation(base64, orientation, (resetBase64Image) => {
            });
        };
        reader.onerror = (error) => {
            console.log('Error: ', error);
        };
    }

    resetOrientation(srcBase64, srcOrientation, callback) {
        var img = new Image();

        img.onload = () => {
            var width = img.width,
                height = img.height,
                canvas = document.createElement('canvas'),
                ctx = canvas.getContext("2d");

            // set proper canvas dimensions before transform & export
            if (4 < srcOrientation && srcOrientation < 9) {
                canvas.width = height;
                canvas.height = width;
            } else {
                canvas.width = width;
                canvas.height = height;
            }

            // transform context before drawing image
            switch (srcOrientation) {
                case 2: ctx.transform(-1, 0, 0, 1, width, 0); break;
                case 3: ctx.transform(-1, 0, 0, -1, width, height); break;
                case 4: ctx.transform(1, 0, 0, -1, 0, height); break;
                case 5: ctx.transform(0, 1, 1, 0, 0, 0); break;
                case 6: ctx.transform(0, 1, -1, 0, height, 0); break;
                case 7: ctx.transform(0, -1, -1, 0, height, width); break;
                case 8: ctx.transform(0, -1, 1, 0, 0, width); break;
                default: break;
            }

            // draw image
            ctx.drawImage(img, 0, 0);

            // export base64
            callback(canvas.toDataURL());
        };

        img.src = srcBase64;
    }

}
