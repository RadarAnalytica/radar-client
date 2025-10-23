import { useState, useCallback } from 'react';
import { log } from '../utils';

/**
 * Хук для управления изменением размеров колонок таблицы
 * @param {Array} initialConfig - начальная конфигурация колонок
 * @param {number} minWidth - минимальная ширина колонки (по умолчанию 160)
 * @param {number} maxWidth - максимальная ширина колонки (по умолчанию 400)
 * @returns {Object} { config, onResize } - текущая конфигурация и обработчик изменения размера
 */
export function useTableColumnResize(initialConfig, minWidth = 0, maxWidth = 400) {
	const [config, setConfig] = useState(initialConfig);

	// Хэндлер изменения ширины колонок
	const onResize = useCallback((columnKey, width) => {
		// Проверяем, что ширина является валидным числом
		if (typeof width !== 'number' || isNaN(width) || width <= 0) {
			console.warn('Invalid width received:', width);
			return;
		}

		log('Column resized:', columnKey, width);

		// Обновляем конфигурацию колонок с группированной структурой
		const updateColumnWidth = (columns) => {
			return columns.map(col => {
				// Если это группа с children
				if (col.children && col.children.length > 0) {
					const updatedChildren = updateColumnWidth(col.children);

					// Всегда пересчитываем ширину группы на основе суммы ширин дочерних колонок
					const totalWidth = updatedChildren.reduce((sum, child) => {
						const childWidth = typeof child.width === 'number' ? child.width : (child.minWidth || 0);
						return sum + childWidth;
					}, 0);
					return { ...col, width: totalWidth, minWidth: totalWidth, children: updatedChildren };
				}

				// Если это листовая колонка
				if (col.key === columnKey) {
					// Ограничиваем ширину минимальным и максимальным значением
					const constrainedWidth = Math.max(minWidth, Math.min(maxWidth, width));
					
					return { ...col, width: constrainedWidth, minWidth: constrainedWidth };
				}

				return col;
			});
		};

		// Обновляем состояние
		setConfig(prevConfig => updateColumnWidth(prevConfig));
	}, [minWidth, maxWidth]);

	return { config, onResize };
}

