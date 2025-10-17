import { useState, useEffect, useMemo } from 'react';

interface UseLoadingProgressProps {
	loading: boolean;
	maxProgress?: number;
	steps?: number;
	interval?: number;
}

interface ProgressControl {
	value: number | null;
	start: () => void;
	complete: () => void;
	reset: () => void;
}

/**
 * @param loading - состояние загрузки
 * @param maxProgress - максимальное значение прогресса
 * @param steps - количество шагов до достижения maxProgress
 * @param interval - интервал обновления в мс
 * @returns объект с value (текущее значение прогресса) и методы start, complete, reset
 */
export function useLoadingProgress({ loading, maxProgress = 90, steps = 15, interval = 1000 }: UseLoadingProgressProps): ProgressControl {
	const [progress, setProgress] = useState<number | null>(0);

	useEffect(() => {
		let intervalId: NodeJS.Timeout | null = null;

		if (loading) {
			intervalId = setInterval(() => {
				setProgress((state) => {
					if (state === null || state >= maxProgress) {
						if (intervalId) clearInterval(intervalId);
						return state;
					}
					return Math.ceil(state + (maxProgress / steps));
				});
			}, interval);
		}

		return () => {
			if (intervalId) clearInterval(intervalId);
		};
	}, [loading, maxProgress, steps, interval]);

	const control = useMemo(() => ({
		value: progress,
		start: () => progress === null ? setProgress(0) : null,
		complete: () => setProgress(100),
		reset: () => setProgress(null),
	}), [progress]);

	return control;
}