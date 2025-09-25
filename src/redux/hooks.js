import { useDispatch, useSelector } from 'react-redux';

// Typed aliases for TS files; in JS they behave as original hooks
export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;
