import { useState, useCallback, useEffect, useRef } from 'react';
import { log } from '../utils';

/**
 * Интерфейс для колонки таблицы с поддержкой вложенных колонок
 */
export interface TableColumn {
	key?: string;
	width?: number;
	minWidth?: number;
	children?: TableColumn[];
	[key: string]: any; // Для других свойств колонки
}

/**
 * Интерфейс для данных, сохраняемых в localStorage
 */
interface StoredConfig {
	version?: string;
	widths?: Record<string, number>;
}

/**
 * Тип для функции обработки колонки
 */
type ColumnProcessor = (col: TableColumn) => TableColumn;

/**
 * Результат работы хука
 */
export interface UseTableColumnResizeResult {
	config: TableColumn[];
	onResize: (columnKey: string, width: number) => void;
}

/**
 * Хук для управления изменением размеров колонок таблицы
 * @param initialConfig - начальная конфигурация колонок
 * @param storageKey - ключ для сохранения в localStorage
 * @param minWidth - минимальная ширина колонки (по умолчанию 0)
 * @param maxWidth - максимальная ширина колонки (по умолчанию 400)
 * @param version - версия конфига для контроля совместимости
 * @returns { config, onResize } - текущая конфигурация и обработчик изменения размера
 */
export function useTableColumnResize(
	initialConfig: TableColumn[],
	storageKey: string,
	minWidth: number = 0,
	maxWidth: number = 400,
	version: string | null = null
): UseTableColumnResizeResult {
	// Рекурсивная работа с колонками
	const processColumns = useCallback((columns: TableColumn[], processor: ColumnProcessor): TableColumn[] => {
		return columns.map(col => {
			if (col.children && col.children.length > 0) {
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
	const loadConfig = useCallback((): TableColumn[] => {
		if (!storageKey || initialConfig.length === 0) return initialConfig;

		try {
			const stored = localStorage.getItem(storageKey);
			if (!stored) return initialConfig;

			const parsed: StoredConfig = JSON.parse(stored);
			
			// Проверка версии конфига
			if (version) {
				// Если версия указана, но в сохраненных данных её нет или она не совпадает
				if (!parsed.version || parsed.version !== version) {
					log('Table config version mismatch (saved:', parsed.version, 'expected:', version, '), using default config');
					return initialConfig;
				}
			}

			// Загружаем сохраненные ширины
			const storedWidths = parsed.widths || parsed as Record<string, number>;
			if (!storedWidths || Object.keys(storedWidths).length === 0) {
				return initialConfig;
			}
			return processColumns(initialConfig, col => {
				const newWidth = col.key && storedWidths[col.key];
				return newWidth ? { ...col, width: newWidth } : col;
			});
		} catch (error) {
			console.error('Error loading column widths:', error);
			return initialConfig;
		}
	}, [initialConfig, storageKey, processColumns, version]);

	const [config, setConfig] = useState<TableColumn[]>(loadConfig);
	const prevVersionRef = useRef<string | null>(version);

	useEffect(() => {
		if (!storageKey) return;

		// Если версия изменилась в коде
		if (version && prevVersionRef.current !== version) {
			log(`Version changed from ${prevVersionRef.current} to ${version}`);
			
			try {
				const stored = localStorage.getItem(storageKey);
				if (stored) {
					const parsed: StoredConfig = JSON.parse(stored);
					
					// Если в localStorage старая версия, обновляем
					if (parsed.version !== version) {
						log('Resetting table config due to version change');
						
						// Сохраняем новую версию с дефолтными ширинами
						const widths: Record<string, number> = {};
						const extractWidths = (columns: TableColumn[]): void => {
							columns.forEach(col => {
								if (col.children && col.children.length > 0) {
									extractWidths(col.children);
								} else if (col.key && typeof col.width === 'number') {
									widths[col.key] = col.width;
								}
							});
						};
						extractWidths(initialConfig);
						localStorage.setItem(storageKey, JSON.stringify({ version, widths }));
						
						// Перезагружаем конфиг
						setConfig(loadConfig());
					}
				}
			} catch (error) {
				console.error('Error checking version:', error);
			}
			
			prevVersionRef.current = version;
		} else {
			setConfig(loadConfig());
		}
	}, [version, storageKey, initialConfig, loadConfig]);

	// Сохранение конфигурации в localStorage
	useEffect(() => {
		if (!storageKey || config.length === 0) return;

		try {
			const widths: Record<string, number> = {};
			const extractWidths = (columns: TableColumn[]): void => {
				columns.forEach(col => {
					if (col.children && col.children.length > 0) {
						extractWidths(col.children);
					} else if (col.key && typeof col.width === 'number') {
						widths[col.key] = col.width;
					}
				});
			};
			extractWidths(config);
			// Сохраняем с версией, если она указана
			const dataToSave: StoredConfig = version ? { version, widths } : widths;
			localStorage.setItem(storageKey, JSON.stringify(dataToSave));
		} catch (error) {
			console.error('Error saving column widths:', error);
		}
	}, [config, storageKey, version]);
	

	// Обработчик изменения ширины колонок
	const onResize = useCallback((columnKey: string, width: number): void => {
		if (typeof width !== 'number' || isNaN(width) || width <= 0) {
			console.warn('Invalid width received:', width);
			return;
		}

		log('Column resized:', columnKey, width);

		setConfig(prevConfig => processColumns(prevConfig, col => {
			if (col.key === columnKey) {
				//const constrainedWidth = Math.max(minWidth, Math.min(maxWidth, width));
				return { ...col, width: width, minWidth: width };
			}
			return col;
		}));
	}, [minWidth, maxWidth, processColumns]);

	if (!initialConfig?.length || !storageKey) {
		return { config: [], onResize: () => {} };
	}

	return { config, onResize };
}

