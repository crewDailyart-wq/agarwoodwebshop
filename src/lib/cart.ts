"use client";

import { useSyncExternalStore } from "react";
import { getProduct, getVariant, unitPriceCents, type ProductId } from "@/content/catalog";

/**
 * Client-side cart, kept in localStorage. Only ids and quantities are stored:
 * prices are always looked up from the catalog, and re-checked on the server
 * at checkout, so a tampered cart can never change what is charged.
 */
export type CartLine = { id: ProductId; quantity: number; variantId?: string };

/** One cart line per product and weight option. */
const same = (l: CartLine, id: ProductId, variantId?: string) => l.id === id && l.variantId === variantId;
export const lineKey = (l: CartLine) => (l.variantId ? `${l.id}:${l.variantId}` : l.id);

const KEY = "aurum-oud-cart";
const MAX_QTY = 10;
const EMPTY: CartLine[] = [];

let lines: CartLine[] = EMPTY;
let open = false;
let loaded = false;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

/** A product with weight options needs one of them; one without must not have any. */
function validVariant(l: CartLine) {
  const p = getProduct(l.id);
  if (!p) return false;
  return p.variants.length > 0 ? getVariant(p, l.variantId) !== undefined : l.variantId === undefined;
}

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return;
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return;
    lines = parsed
      .filter(
        (l): l is CartLine =>
          typeof l === "object" &&
          l !== null &&
          typeof (l as CartLine).id === "string" &&
          getProduct((l as CartLine).id) !== undefined &&
          Number.isInteger((l as CartLine).quantity) &&
          (l as CartLine).quantity > 0 &&
          validVariant(l as CartLine),
      )
      .map((l) => ({
        id: l.id,
        quantity: Math.min(l.quantity, MAX_QTY),
        ...(l.variantId ? { variantId: l.variantId } : {}),
      }));
  } catch {
    lines = EMPTY;
  }
}

function save() {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(lines));
  } catch {
    /* storage unavailable (private mode) — cart still works for this visit */
  }
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) {
      loaded = false;
      lines = EMPTY;
      load();
      emit();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

function getLines() {
  load();
  return lines;
}

export const cart = {
  add(id: ProductId, quantity = 1, variantId?: string) {
    load();
    const existing = lines.find((l) => same(l, id, variantId));
    lines = existing
      ? lines.map((l) =>
          same(l, id, variantId) ? { ...l, quantity: Math.min(l.quantity + quantity, MAX_QTY) } : l,
        )
      : [...lines, { id, quantity: Math.min(quantity, MAX_QTY), ...(variantId ? { variantId } : {}) }];
    save();
    open = true;
    emit();
  },
  setQuantity(id: ProductId, quantity: number, variantId?: string) {
    load();
    lines =
      quantity <= 0
        ? lines.filter((l) => !same(l, id, variantId))
        : lines.map((l) => (same(l, id, variantId) ? { ...l, quantity: Math.min(quantity, MAX_QTY) } : l));
    save();
    emit();
  },
  remove(id: ProductId, variantId?: string) {
    cart.setQuantity(id, 0, variantId);
  },
  clear() {
    lines = EMPTY;
    save();
    emit();
  },
  openDrawer() {
    open = true;
    emit();
  },
  closeDrawer() {
    open = false;
    emit();
  },
};

export function useCartLines(): CartLine[] {
  return useSyncExternalStore(subscribe, getLines, () => EMPTY);
}

export function useCartOpen(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => open,
    () => false,
  );
}

export function cartSubtotalCents(l: CartLine[]): number {
  return l.reduce((sum, line) => {
    const p = getProduct(line.id);
    return sum + (p ? unitPriceCents(p, line.variantId) : 0) * line.quantity;
  }, 0);
}

export function cartCount(l: CartLine[]): number {
  return l.reduce((n, line) => n + line.quantity, 0);
}
