import { Component, OnInit, Input, OnDestroy, ElementRef } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit, OnDestroy {

    @Input() id: string;
    element: any;
    modalIsOpened = false;

    constructor(private modalService: ModalService, el: ElementRef) {
        this.element = el.nativeElement;
    }

    ngOnInit() {

        if (!this.id) {
            console.error('modal must have an id');
            return;
        }

        this.modalService.addModal(this);

        this.element.addEventListener('click', (e: Event) => {
            if ((e.target as HTMLElement).classList[0] === 'modal-background') {
                this.close();
            }
        });
    }

    ngOnDestroy() {
        this.modalService.removeModalById(this.id);
    }

    close() {
        this.modalIsOpened = false;
    }

    open() {
        this.modalIsOpened = true;
    }
}
