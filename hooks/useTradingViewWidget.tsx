import {useEffect, useRef} from "react";

export const UseTradingViewWidget = (scriptUrl: string, height = 600, config: Record<string, unknown>) => {
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(
        () => {
            if (!containerRef.current || containerRef.current.dataset.loaded) return;

            const widgetContainer = document.createElement('div');
            widgetContainer.className = 'tradingview-widget-container__widget';
            widgetContainer.style.width = '100%';
            widgetContainer.style.height = typeof height === 'number' ? `${height}px` : height;
            
            containerRef.current.appendChild(widgetContainer);
            
            const script = document.createElement('script');
            script.src = scriptUrl;
            script.type = 'text/javascript';
            script.async = true;
            script.innerHTML = JSON.stringify(config);
            
            containerRef.current.appendChild(script);
            containerRef.current.dataset.loaded = 'true';

            return () => {
                if (containerRef.current) {
                    containerRef.current.innerHTML = '';
                    delete containerRef.current.dataset.loaded;
                }
            }
        },
        [config, scriptUrl, height]
    );

    return containerRef
};
