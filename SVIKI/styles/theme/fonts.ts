import { Platform } from "react-native";

export const Fonts = Platform.select({
  ios: { sans: "system-ui", rounded: "ui-rounded", mono: "ui-monospace" },
  default: { sans: "normal", rounded: "normal", mono: "monospace" },
});
