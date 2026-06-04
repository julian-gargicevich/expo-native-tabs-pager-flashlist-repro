import PagerView from "@expo/ui/community/pager-view";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const PAGES = ["Exercises", "Workouts"] as const;

export default function SearchScreen() {
  const [pagerHeight, setPagerHeight] = useState(1);

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={styles.content}
      style={styles.screen}
    >
      <Text style={styles.title}>Search</Text>
      <Text style={styles.description}>
        Working comparison: the vertical ScrollView is the root scroll owner,
        and PagerView receives a measured height.
      </Text>

      <PagerView style={{ height: Math.max(pagerHeight, 600) }}>
        {PAGES.map((page, pageIndex) => (
          <View key={page}>
            <View
              onLayout={(event) =>
                setPagerHeight(event.nativeEvent.layout.height)
              }
            >
              {Array.from({ length: pageIndex === 0 ? 18 : 8 }, (_, index) => (
                <View key={`${page}-${index}`} style={styles.card}>
                  <Text style={styles.cardTitle}>
                    {page} item {index + 1}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </PagerView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white"
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 72,
    paddingBottom: 120
  },
  title: {
    color: "black",
    fontSize: 32,
    fontWeight: "700"
  },
  description: {
    color: "#475569",
    fontSize: 15,
    lineHeight: 21,
    marginTop: 6,
    marginBottom: 16
  },
  card: {
    borderBottomColor: "#e2e8f0",
    borderBottomWidth: 1,
    paddingVertical: 24
  },
  cardTitle: {
    color: "black",
    fontSize: 22,
    fontWeight: "700"
  }
});
