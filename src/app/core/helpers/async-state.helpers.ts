import { WritableSignal } from '@angular/core';
import {AsyncState} from '../models';

export function setLoading<T>(stateSignal: WritableSignal<AsyncState<T>>): void {
  stateSignal.update(s => ({ ...s, loading: true, error: null, response: null }));
}

export function setData<T>(stateSignal: WritableSignal<AsyncState<T>>, data: T): void {
  stateSignal.set({ data, loading: false, error: null, response: null });
}

export function setError<T>(stateSignal: WritableSignal<AsyncState<T>>, error: any): void {
  stateSignal.set({ data: null, loading: false, error, response: null });
}

export function setResponse<T>(stateSignal: WritableSignal<AsyncState<T>>, response: any): void {
  stateSignal.set({ data: null, loading: false, error: null, response });
}

export function setInit<T>(): AsyncState<T> {
  return { data: null, loading: false, error: null, response: null }
}
