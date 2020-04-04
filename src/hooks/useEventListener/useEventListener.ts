import { useEffect, useRef } from 'react';

function useEventListener(
  eventName: string,
  handler: Function,
  element: Window = window
) {
  const savedHandler = useRef<Function>();

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const isSupported = element && element.addEventListener;
    if (!isSupported) {
      return;
    }

    const eventListener: EventListenerOrEventListenerObject = event =>
      savedHandler.current(event);

    element.addEventListener(eventName, eventListener);

    return () => {
      element.removeEventListener(eventName, eventListener);
    };
  }, [eventName, element]);
}

export default useEventListener;
