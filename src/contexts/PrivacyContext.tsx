import { createContext, useContext, useState, type ReactNode } from 'react';

type PrivacyChoice = { decided: boolean; allowGoogleMaps: boolean };
type PrivacyView = 'policy' | 'cookies' | 'terms' | null;
type ContextValue = {
  choice: PrivacyChoice;
  view: PrivacyView;
  openPrivacy: (view: Exclude<PrivacyView, null>) => void;
  closePrivacy: () => void;
  saveChoice: (allowGoogleMaps: boolean) => void;
};
const STORAGE_KEY = 'adega-ta-no-grau-013-privacy-v1';
const INITIAL: PrivacyChoice = { decided: false, allowGoogleMaps: false };
const Context = createContext<ContextValue | null>(null);

function readChoice(): PrivacyChoice {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) return INITIAL;
    const value: unknown = JSON.parse(saved);
    if (!value || typeof value !== 'object' || !('decided' in value)) return INITIAL;
    const parsed = value as Partial<PrivacyChoice>;
    return { decided: parsed.decided === true, allowGoogleMaps: parsed.allowGoogleMaps === true };
  } catch {
    return INITIAL;
  }
}

export function PrivacyProvider({ children }: { children: ReactNode }) {
  const [choice, setChoice] = useState<PrivacyChoice>(readChoice);
  const [view, setView] = useState<PrivacyView>(null);
  const saveChoice = (allowGoogleMaps: boolean) => {
    const updated = { decided: true, allowGoogleMaps };
    setChoice(updated);
    try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated)); } catch { /* armazenamento pode estar bloqueado */ }
  };
  return (
    <Context.Provider value={{ choice, view, openPrivacy: setView, closePrivacy: () => setView(null), saveChoice }}>
      {children}
    </Context.Provider>
  );
}

export function usePrivacy() {
  const context = useContext(Context);
  if (!context) throw new Error('usePrivacy precisa estar dentro do PrivacyProvider');
  return context;
}
