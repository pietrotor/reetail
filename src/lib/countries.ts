// countries.ts
import emojiFlags from "emoji-flags";
import countries from "i18n-iso-countries";
import esLocale from "i18n-iso-countries/langs/es.json";

countries.registerLocale(esLocale);

const countryNames = countries.getNames("es", { select: "official" });
export const countryOptions = Object.entries(countryNames).map(
  ([value, label]) => {
    const emoji = emojiFlags.countryCode(value)?.emoji ?? "";
    return { value, label, flag: emoji };
  }
);
