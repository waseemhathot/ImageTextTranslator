import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ModalService {

    private modals: any[] = [];

    constructor() { }

    addModal(modal: any) {
        this.modals.push(modal);
    }

    removeModalById(id: string) {
        this.modals = this.modals.filter(m => m.id !== id);
    }

    open(id: string) {
        const modal = this.modals.find(m => m.id === id);
        if (modal) {
            modal.open();
        }
    }

    close(id: string) {
        const modal = this.modals.find(m => m.id === id);
        if (modal) {
            modal.close();
        }
    }
}
