import { Component, OnInit } from '@angular/core';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { faBriefcase } from '@fortawesome/free-solid-svg-icons';
import { faReply } from '@fortawesome/free-solid-svg-icons';
import { Negocio } from '../../models/negocio.model';
import { NegocioService } from '../../services/negocio.service';

@Component({
  selector: 'app-negocios',
  templateUrl: './negocios.component.html',
  styleUrls: ['./negocios.component.css'],
})
export class NegociosComponent implements OnInit {
  faGlobe = faGlobe;
  faBriefcase = faBriefcase;
  faReply = faReply;
  negocios: Negocio[] = [];
  buscando: Negocio[] = [];
  negocioB = '';
  busqueda = false;
  constructor(private nService: NegocioService) {
    this.nService
      .consultarNegocios()
      .then((documentos) => {
        documentos.subscribe((negocios) => {
          this.negocios = negocios as Negocio[];
        });
      })
      .catch((err) => {
        console.log(err);
        this.negocios = [];
      });
  }
  buscarNegocio() {
    if (
      this.negocioB === null ||
      this.negocioB === undefined ||
      this.negocioB === ''
    ) {
      this.busqueda = false;
      this.buscando = [];
      return;
    }
    this.negocioB = this.negocioB.toLowerCase();
    this.busqueda = true;
    for (const negocio of this.negocios) {
      if (negocio.nombre.toLowerCase().startsWith(this.negocioB)) {
        if (
          this.buscando.findIndex((i) => i.nombre === negocio.nombre) !== -1
        ) {
        } else {
          this.buscando.push(negocio);
        }
      }
    }
  }
  ngOnInit(): void {}
}
