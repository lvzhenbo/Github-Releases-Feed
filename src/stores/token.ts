import { store } from '.';

export const useTokenStore = defineStore(
  'token',
  () => {
    const token = ref('');

    return { token };
  },
  { persist: true },
);

export const useTokenStoreWithOut = () => useTokenStore(store);
