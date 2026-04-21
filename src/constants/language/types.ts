import type en from "./en.json"

/**
 * Recursively builds dot-notation keys from a nested object.
 * { nav: { home: "Home" } } → "nav.home"
 */
type NestedKeys<T, Prefix extends string = ""> = T extends object
  ? {
      [K in keyof T & string]: T[K] extends object
        ? NestedKeys<T[K], `${Prefix}${K}.`>
        : `${Prefix}${K}`
    }[keyof T & string]
  : never

/** All valid translation keys — auto-generated from en.json */
export type TranslationKey = NestedKeys<typeof en>

/**
 * The shape of a locale dictionary.
 * All locale JSONs must match this structure.
 */
export type LocaleDictionary = typeof en
