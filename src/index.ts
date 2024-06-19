import { EventEmitter, Subscription } from "expo-modules-core";

import ExpoSettingsModule from "./ExpoSettingsModule";

//pick up changes using the EventEmitter API
const emitter = new EventEmitter(ExpoSettingsModule);

export type Theme = "light" | "dark" | "system";
export type ThemeChangeEvent = {
  theme: Theme;
};

export function addThemeListener(
  listener: (ev: ThemeChangeEvent) => void,
): Subscription {
  return emitter.addListener<ThemeChangeEvent>("onChangeTheme", listener);
}

export function getTheme(): Theme {
  return ExpoSettingsModule.getTheme();
}

export function setTheme(theme: Theme): void {
  return ExpoSettingsModule.setTheme(theme);
}
