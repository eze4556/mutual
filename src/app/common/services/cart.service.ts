// src/app/services/cart.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartItem, Producto } from '../models/carrito.models';
import { Buckle } from '../models/bucke.model';
import { BuckleBelt } from '../models/cinturonH.model';
import { LeatherStrap } from '../models/lonja.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: CartItem[] = [];
  private cartSubject: BehaviorSubject<CartItem[]> = new BehaviorSubject(this.items);

  constructor() { }

  // Observable para obtener los items del carrito
  getCart(): Observable<CartItem[]> {
    return this.cartSubject.asObservable();
  }

  // Método para agregar un producto al carrito
  addToCart(product: Producto, cantidad: number = 1) {
    const existingIndex = this.items.findIndex(item => this.isSameProduct(item.product, product));

    if (existingIndex !== -1) {
      // Si el producto ya está en el carrito, actualiza la cantidad
      this.items[existingIndex].cantidad += cantidad;
    } else {
      // Si no, lo agrega como nuevo item
      this.items.push({ product, cantidad });
    }
    // Notificar los cambios a los suscriptores del carrito
    this.cartSubject.next(this.items);
    this.saveCart();
  }

  // Método para quitar o reducir cantidad de un producto del carrito
  removeFromCart(product: Producto) {
    const existingIndex = this.items.findIndex(item => this.isSameProduct(item.product, product));

    if (existingIndex !== -1) {
      const existingItem = this.items[existingIndex];
      if (existingItem.cantidad > 1) {
        // Si la cantidad es mayor a 1, reducirla
        existingItem.cantidad -= 1;
      } else {
        // Si es 1, quitar el producto del carrito
        this.items.splice(existingIndex, 1);
      }
      this.cartSubject.next(this.items);
      this.saveCart();
    }
  }

  // Método para vaciar el carrito
  clearCart() {
    this.items = [];
    this.cartSubject.next(this.items);
    this.saveCart();
  }

// Obtener los totales por moneda
getTotalsByCurrency(): { [currency: string]: number } {
  return this.items.reduce((totals, item) => {
    const currency = item.product.currency;
    const price = typeof item.product.price === 'number' ? item.product.price : parseFloat(item.product.price); // Convertir a número si es string
    if (totals[currency]) {
      totals[currency] += price * item.cantidad;
    } else {
      totals[currency] = price * item.cantidad;
    }
    return totals;
  }, {} as { [currency: string]: number });
}


  // Obtener el total general (puedes ajustar esto según tus necesidades)
  getGrandTotal(): number {
    const totals = this.getTotalsByCurrency();
    return Object.values(totals).reduce((acc, curr) => acc + curr, 0);
  }

  // Función auxiliar para verificar si un producto ya está en el carrito
  private isSameProduct(itemProduct: Producto, product: Producto): boolean {
    return itemProduct.id === product.id;
  }

  // Persistir el carrito en localStorage
  private saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.items));
  }

  // Cargar el carrito desde localStorage al inicializar el servicio
  private loadCart() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      this.items = JSON.parse(storedCart);
      this.cartSubject.next(this.items);
    }
  }
}
