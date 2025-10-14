import { useEffect, useRef } from 'react';

/**
 * Компонент для отладки количества хуков в компоненте
 * Usage: добавить <HooksDebugger name="ComponentName" /> в начало компонента
 */
export const HooksDebugger = ({ name: string }) => {
    const renderCount = useRef(0);
    const hooksCount = useRef(0);
    
    useEffect(() => {
        renderCount.current += 1;
        console.log(`[HooksDebugger] ${name} - Render #${renderCount.current}`);
    });
    
    // Это помогает отследить количество вызовов хуков
    useEffect(() => {
        hooksCount.current += 1;
    });
    
    return null;
};

/**
 * Глобальный перехватчик ошибок React
 * Usage: можно вызвать перед объявлением компонента
 */
export const setupErrorBoundary = () => {
    const originalError = console.error;
    console.error = (...args) => {
        if (typeof args[0] === 'string' && args[0].includes('Rendered more hooks')) {
            console.log('='.repeat(80));
            console.log('ОШИБКА ХУКОВ ОБНАРУЖЕНА!');
            console.log('='.repeat(80));
            console.trace('Stack trace:');
            console.log('='.repeat(80));
        }
        originalError.apply(console, args);
    };
};

/**
 * Хук для логирования рендеров компонента
 * Usage: вызвать внутри компонента
 */
export const useRenderLogger = (componentName: string, props = {}) => {
    const renderCount = useRef(0);
    const prevProps = useRef(props);
    
    useEffect(() => {
        renderCount.current += 1;
        
        const changedProps = Object.keys(props).reduce((acc, key) => {
            if (props[key] !== prevProps.current[key]) {
                acc[key] = {
                    from: prevProps.current[key],
                    to: props[key]
                };
            }
            return acc;
        }, {});
        
        if (Object.keys(changedProps).length > 0) {
            console.log(`[${componentName}] Render #${renderCount.current}`, {
                changedProps
            });
        } else {
            console.log(`[${componentName}] Render #${renderCount.current} - No prop changes`);
        }
        
        prevProps.current = props;
    });
};

