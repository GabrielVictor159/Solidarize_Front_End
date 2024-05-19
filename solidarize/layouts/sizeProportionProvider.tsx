import { createContext, useState, useContext, ReactNode, Dispatch, SetStateAction, useEffect } from 'react';

interface SizeProportionContextType {
  sizeProportion: number;
  setSizeProportion: Dispatch<SetStateAction<number>>;
}

export const SizeProportionContext = createContext<SizeProportionContextType>({
  sizeProportion: 0,
  setSizeProportion: () => {}
});

interface SizeProportionProviderProps {
  children: ReactNode;
}

export const SizeProportionProvider: React.FC<SizeProportionProviderProps> = ({ children }) => {
  const [sizeProportion, setSizeProportion] = useState<number>(0);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setSizeProportion(width / height);
    };

    if (typeof window !== 'undefined') {
      handleResize();
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []); 

  return (
    <SizeProportionContext.Provider value={{ sizeProportion, setSizeProportion }}>
      {children}
    </SizeProportionContext.Provider>
  );
};

export const useSizeProportion = (): SizeProportionContextType => {
  const context = useContext(SizeProportionContext);
  if (!context) {
    throw new Error('useSizeProportion deve ser usado dentro de um SizeProportionProvider');
  }
  return context;
};
