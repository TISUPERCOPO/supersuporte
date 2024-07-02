import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CnpjService {
  private tokenAcesso: string = 'F923ED44-50A9-47FC-98D7-3DCC01EA66C6';
  private urlBase: string = 'https://www.sintegraws.com.br/api/v1/execute-api.php';

  constructor(private http: HttpClient) { }
  consultaCNPJ(cnpj: string) {
    if (cnpj !== '') {
      const validacnpj = /^[0-9]{14}$/;
      if (validacnpj.test(cnpj)) {
        return this.http.get(`https://brasilapi.com.br/api/cnpj/v1/${cnpj}`);
      }
    }
    return of({});
  }

  consultaCNPJs(cnpj: string): Observable<any> {
    if (cnpj !== '') {
      const validacnpj = /^[0-9]{14}$/;
      if (validacnpj.test(cnpj)) {
        const url = `${this.urlBase}?token=${this.tokenAcesso}&cnpj=${cnpj}&plugin=ST`;
        return this.http.get(url);
      }
    }
    return of({}); // Retorna um Observable de um objeto vazio se o CNPJ for inválido ou vazio
  }
}