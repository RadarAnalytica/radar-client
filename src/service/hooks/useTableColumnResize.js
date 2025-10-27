import { useState, useCallback, useEffect } from 'react';
import { log } from '../utils';

/**
 * Хук для управления изменением размеров колонок таблицы
 * @param {Array} initialConfig - начальная конфигурация колонок
 * @param {string} storageKey - ключ для сохранения в localStorage (если не указан, сохранение отключено)
 * @param {number} minWidth - минимальная ширина колонки (по умолчанию 0)
 * @param {number} maxWidth - максимальная ширина колонки (по умолчанию 400)
 * @returns {Object} { config, onResize } - текущая конфигурация и обработчик изменения размера
 */
export function useTableColumnResize(initialConfig, storageKey = null, minWidth = 0, maxWidth = 400) {
	// Рекурсивная работа с колонками
	const processColumns = useCallback((columns, processor) => {
		return columns.map(col => {
			if (col.children?.length > 0) {
				const updatedChildren = processColumns(col.children, processor);
				const totalWidth = updatedChildren.reduce((sum, child) => 
					sum + (child.width || child.minWidth || 0), 0
				);
				return { ...col, width: totalWidth, minWidth: totalWidth, children: updatedChildren };
			}
			return processor(col);
		});
	}, []);

	// Загрузка конфигурации из localStorage
	const loadConfig = useCallback(() => {
		if (!storageKey) return initialConfig;

		try {
			const stored = localStorage.getItem(storageKey);
			if (!stored) return initialConfig;

			const storedWidths = JSON.parse(stored);
			return processColumns(initialConfig, col => {
				const width = col.key && storedWidths[col.key];
				return width ? { ...col, width, minWidth: width } : col;
			});
		} catch (error) {
			console.error('Error loading column widths:', error);
			return initialConfig;
		}
	}, [initialConfig, storageKey, processColumns]);

	const [config, setConfig] = useState(loadConfig);

	// Сохранение конфигурации в localStorage
	useEffect(() => {
		if (!storageKey) return;

		try {
			const widths = {};
			const extractWidths = (columns) => {
				columns.forEach(col => {
					if (col.children?.length > 0) {
						extractWidths(col.children);
					} else if (col.key && typeof col.width === 'number') {
						widths[col.key] = col.width;
					}
				});
			};
			extractWidths(config);
			localStorage.setItem(storageKey, JSON.stringify(widths));
		} catch (error) {
			console.error('Error saving column widths:', error);
		}
	}, [config, storageKey]);

	// Обработчик изменения ширины колонок
	const onResize = useCallback((columnKey, width) => {
		if (typeof width !== 'number' || isNaN(width) || width <= 0) {
			console.warn('Invalid width received:', width);
			return;
		}

		log('Column resized:', columnKey, width);

		setConfig(prevConfig => processColumns(prevConfig, col => {
			if (col.key === columnKey) {
				const constrainedWidth = Math.max(minWidth, Math.min(maxWidth, width));
				return { ...col, width: constrainedWidth, minWidth: constrainedWidth };
			}
			return col;
		}));
	}, [minWidth, maxWidth, processColumns]);

	return { config, onResize };
}

