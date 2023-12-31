import { getLocales } from "expo-localization";
import { I18n } from "i18n-js";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { format } from "react-string-format";

const en = require("../lang/lang.en.json");
const es = require("../lang/lang.es.json");
const ja = require("../lang/lang.ja.json");
const ko = require("../lang/lang.ko.json");
const zh = require("../lang/lang.zh.json");

const i18n = new I18n({
  en,
  es,
  ja,
  ko,
  zh,
});

i18n.enableFallback = true;
i18n.defaultLocale = "ko";

const LOCALE_KEY = "locale";

export const useTranslation = () => {
  const [locale, _setLocale] = useState(null);

  const setLocale = (v) => {
    _setLocale(v);
    AsyncStorage.setItem(LOCALE_KEY, v);
  };

  const init = async () => {
    const fs = await AsyncStorage.getItem(LOCALE_KEY);

    if (fs) {
      _setLocale(fs);
    } else {
      _setLocale(getLocales()[0].languageCode);
    }
  };

  useEffect(() => {
    init();
  }, []);

  return {
    t: (scope) => i18n.t(scope, { locale }),
    locale,
    setLocale,
    format,
  };
};
