import type { DebounceOptions } from "debounce-promise";
import debounce from "debounce-promise";

export type DebounceFnType<T extends (...args: any) => any = any> = (
  signal: AbortSignal
) => (...args: Parameters<T>) => Promise<any> | any;

export const debounceRequest = <F extends (...args: any) => any>(
  request: (abortSignal: AbortSignal) => F,
  timeout = 1000,
  settings: DebounceOptions = {
    leading: true,
  }
) => {
  let abortController = new AbortController();

  const cancellableRequest = async (...args: Parameters<F>) => {
    abortController.abort();
    abortController = new AbortController();
    return request(abortController.signal)(...args);
  };

  const debounceRequest = debounce(cancellableRequest, timeout, settings);

  // for manually abort
  const abort = () => abortController.abort();

  return {
    request: debounceRequest,
    abort,
  };
};
