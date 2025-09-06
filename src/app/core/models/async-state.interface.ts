import { HttpResponse } from '@angular/common/http';

export interface AsyncState<T> {
  data:    T | null;
  loading: boolean;
  error:   any | null;
  response : HttpResponse<any> | null;
}
