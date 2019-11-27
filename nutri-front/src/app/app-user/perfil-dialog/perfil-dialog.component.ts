import { NodeService } from 'src/app/node.service';
import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';


@Component({
  selector: 'app-perfil-dialog',
  templateUrl: './perfil-dialog.component.html',
  styleUrls: ['./perfil-dialog.component.css']
})
export class PerfilDialogComponent implements OnInit {

  @Input()
  user;
  alimentacao;
  peso;
  altura;
  constructor(private ns: NodeService, public activeModal: NgbActiveModal,
    private modalService: NgbModal, private router: Router) { }

  ngOnInit() {
    
    if(this.user.perfil.peso){
      this.peso = this.user.perfil.peso
    }
    
    if(this.user.alimentacao){
      this.alimentacao = this.user.alimentacao;
    } else
      this.alimentacao = '';
  }

  updatePefil(){
    if(this.alimentacao != "Escolha uma opção"){
      this.user.perfil.alimentacao = this.alimentacao;
    }
    console.log(this.user)
    this.ns.updateUsuario(this.user).subscribe(data => {
      sessionStorage.clear();
      sessionStorage.setItem('user', JSON.stringify(this.user));
      this.modalService.dismissAll();
    });
  }

}
