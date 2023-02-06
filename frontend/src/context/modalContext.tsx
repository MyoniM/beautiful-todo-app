import { createContext, useState } from 'react';

function useContextData() {
  return useState<boolean>(false);
}

type contextDataType = ReturnType<typeof useContextData>;

export const ModalContext = createContext<contextDataType | null>(null);
