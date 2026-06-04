import { NativeTabs } from "expo-router/unstable-native-tabs";
import { DynamicColorIOS, Platform } from "react-native";

export default function TabsLayout() {
  return (
    <NativeTabs
      blurEffect={Platform.OS === "ios" ? "systemChromeMaterial" : undefined}
      disableTransparentOnScrollEdge={Platform.OS === "ios"}
      tintColor={
        Platform.OS === "ios"
          ? DynamicColorIOS({ dark: "white", light: "black" })
          : "black"
      }
    >
      <NativeTabs.Trigger name="feed">
        <NativeTabs.Trigger.Label>Feed</NativeTabs.Trigger.Label>
        {Platform.select({
          ios: <NativeTabs.Trigger.Icon sf="person.2" />
        })}
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="search">
        <NativeTabs.Trigger.Label>Search</NativeTabs.Trigger.Label>
        {Platform.select({
          ios: <NativeTabs.Trigger.Icon sf="magnifyingglass" />
        })}
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
