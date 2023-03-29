import dlv from 'dlv';
import tmpl from 'templite';

// eslint-disable-next-line no-unused-vars
type Fn = (...args: any[]) => string;
export interface I18nDict {
  [key: string]: string | number | Fn | I18nDict;
}

export interface NextI18nOptions {
  /**
   * Define the list of supported languages, this is used to determine if one of
   * the languages requested by the user is supported by the application.
   * This should be be same as the supportedLngs in the i18next options.
   */
  supportedLanguages: string[];
  /**
   * Define the fallback language that it's going to be used in the case user
   * expected language is not supported.
   * This should be be same as the fallbackLng in the i18next options.
   */
  fallbackLng: string;
}

export class NextI18n {
  private currentLocale: string;

  public fallbackLng: string;

  public supportedLanguages: string[];

  private dict: I18nDict = {};

  constructor(options: NextI18nOptions) {
    this.currentLocale = options.fallbackLng;
    this.supportedLanguages = options.supportedLanguages;
    this.fallbackLng = options.fallbackLng;
  }

  public locale = (lang?: string) => {
    if (lang !== undefined && this.currentLocale !== lang) {
      this.currentLocale = lang;
      this.onChangeLanguage?.(lang);
    }
    return this.currentLocale;
  };

  public set = (lang: string, dict: I18nDict) => {
    this.dict[lang] = Object.assign(this.dict[lang] || {}, dict);
  };

  public t = (key: string, params?: any, lang?: string): string => {
    const val = dlv(this.dict[lang || this.currentLocale] as any, key, key);
    if (typeof val === 'function') return val(params) as string;
    if (typeof val === 'string') return tmpl(val, params);
    return val as string;
  };

  private onChangeLanguage?: (locale: string) => void;

  public setOnChange = (fn: (locale: string) => void) => {
    this.onChangeLanguage = fn;
  };
}
