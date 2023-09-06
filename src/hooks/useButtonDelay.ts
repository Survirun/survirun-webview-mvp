export const useButtonDelay = (callback: () => void, delay = 150) => {
   setTimeout(callback, delay);
};