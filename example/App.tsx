import * as Settings from "expo-settings";
import { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";

export default function App() {
  // const theme = Settings.getTheme();
  const [theme, setTheme] = useState<string>(Settings.getTheme());

  useEffect(() => {
    const subscription = Settings.addThemeListener(({ theme: newTheme }) => {
      setTheme(newTheme);
    });

    return () => subscription.remove();
  }, [setTheme]);

  //LOGGER
  console.log(theme);

  const nextTheme = theme === "dark" ? "light" : "dark";
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: theme === "dark" ? "#262834" : "seashell",
      }}
    >
      <Text style={{ color: theme === "dark" ? "#FFF" : "#191921" }}>
        Theme: {Settings.getTheme()}
      </Text>
      <Button
        title={`Set theme to ${nextTheme}`}
        onPress={() => Settings.setTheme(nextTheme)}
      />
    </View>
  );
}
