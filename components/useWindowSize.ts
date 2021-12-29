import { useState, useEffect } from 'react';

type WindowSize = {
    width: number;
    height: number;
}

const getWindowSize = (): WindowSize => {
    const windowSize: WindowSize = process.browser
        ? { width: window.innerWidth, height: window.innerHeight }
        : { width: 640, height: 480 };
    return windowSize;
}

export const useWindowSize = (): WindowSize => {
    const [windowSize, setWindowSize] = useState<WindowSize>(getWindowSize());

    useEffect(() => {
        const resizeEventHandler = () => {
            setWindowSize(getWindowSize());
        }

        window.addEventListener('resize', resizeEventHandler);
        return () => window.removeEventListener('resize', resizeEventHandler);
    }, []);

    return windowSize;
}
