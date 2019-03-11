import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-view-close-col',
  templateUrl: './view-close-col.component.html',
  styleUrls: ['./view-close-col.component.scss']
})
export class ViewCloseColComponent implements OnInit {
	title: string = 'My first AGM project';
  	lat: number = 51.678418;
  	lng: number = 7.809007;


  	 defaultPagination: number;
    advancedPagination: number;
    paginationSize: number;
    disabledPagination: number;
    isDisabled: boolean;

    closeResult: string;
alerts: Array<any> = [];
  constructor(private modalService: NgbModal) { this.defaultPagination = 1;
        this.advancedPagination = 1;
        this.paginationSize = 1;
        this.disabledPagination = 1;
        this.isDisabled = true;


          this.alerts.push({
            id: 1,
            type: 'success',
            message: 'This is an success alert',
        }, {
            id: 2,
            type: 'info',
            message: 'This is an info alert',
        }, {
            id: 3,
            type: 'warning',
            message: 'This is a warning alert',
        }, {
            id: 4,
            type: 'danger',
            message: 'This is a danger alert',
        });

        }

  ngOnInit() {
  }

  toggleDisabled() {
        this.isDisabled = !this.isDisabled;
    }


    open(content) {
        this.modalService.open(content).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return  `with: ${reason}`;
        }
    }


    public closeAlert(alert: any) {
        const index: number = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    }
}


