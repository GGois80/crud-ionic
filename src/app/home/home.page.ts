import { Component,ViewChild } from '@angular/core';
import{ Item } from 'src/modelos/item.js';
import { StorageService } from '../services/storage.service';
import { Platform, ToastController, IonList, NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

    items: Item[] = [];

  newItem: Item = <Item>{};

  @ViewChild('mylist') mylist: IonList;

  constructor(private storageService: StorageService, private plt: Platform, private toastController: ToastController) {
    this.plt.ready().then(() => {
      this.loadItems();
    });
  }

  // CREATE
  addItem() {
    this.newItem.modified = Date.now();
    this.newItem.id = Date.now();

    this.storageService.addItem(this.newItem).then(item => {
      this.newItem = <Item>{};
      this.showToast('Veiculo Cadastrado Com Sucesso!')
      this.loadItems(); // Or add it to the array directly
    });
  }

  // READ
  loadItems() {
    this.storageService.getItems().then(items => {
      this.items = items;
    });
  }

  // UPDATE
  updateItem(item: Item) {
    item.nome = `${this.newItem.nome}`;
    item.preco = `${this.newItem.preco}`;
    item.marca = `${this.newItem.marca}`;
    item.cor = `${this.newItem.cor}`;
    item.placa = `${this.newItem.placa}`;
    item.renavam = `${this.newItem.renavam}`;
    item.modified = Date.now();

    this.storageService.updateItem(item).then(item => {
    this.showToast('Carro Atualizado!');
    this.mylist.closeSlidingItems();
    });
  }

  // DELETE
  deleteItem(item: Item) {
    this.storageService.deleteItem(item.id).then(item => {
      this.showToast('Veiculo Deletado!');
      this.mylist.closeSlidingItems(); // Fix or sliding is stuck afterwards
      this.loadItems(); // Or splice it from the array directly
    });
  }

  // Helper
  async showToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }


    validarDados() {

        if(this.newItem.nome != undefined){

            this.newItem.modified   = Date.now();
            this.newItem.id         = Date.now();

            window.alert("Nome: "+this.newItem.nome);

        }

    }

}
