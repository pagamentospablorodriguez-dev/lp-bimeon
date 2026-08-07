import en from './en';
import es from './es';
import pt from './pt';
import fr from './fr';
import ru from './ru';
import zh from './zh';
import ko from './ko';
import ja from './ja';
import hi from './hi';
import ar from './ar';
import type { Translation } from './en';

export const translations: Record<string, Translation> = { en, es, pt, fr, ru, zh, ko, ja, hi, ar };
export const supportedLanguages = Object.values(translations).map((translation) => translation.lang);

export function detectLanguage(): string {
  const browserLanguages = navigator.languages?.length ? navigator.languages : [navigator.language];
  for (const browserLanguage of browserLanguages) {
    const code = browserLanguage.toLowerCase().split('-')[0];
    if (translations[code]) return code;
  }
  return 'en';
}
