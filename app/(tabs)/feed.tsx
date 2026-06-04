import PagerView from "@expo/ui/community/pager-view";
import { FlashList } from "@shopify/flash-list";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type FeedItem = {
  id: number;
  title: string;
};

const ITEMS: FeedItem[] = Array.from({ length: 40 }, (_, index) => ({
  id: index + 1,
  title: `Feed item ${index + 1}`
}));

const PAGES = ["Friends", "Only you"] as const;

export default function FeedScreen() {
  const [selectedPage, setSelectedPage] = useState(0);

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.title}>Feed</Text>
        <Text style={styles.description}>
          Failing case: the vertical FlashList is nested inside PagerView.
        </Text>
      </View>

      <View style={styles.segmentedControl}>
        {PAGES.map((page, index) => (
          <Pressable
            key={page}
            style={[
              styles.segment,
              selectedPage === index ? styles.selectedSegment : null
            ]}
          >
            <Text
              style={[
                styles.segmentText,
                selectedPage === index ? styles.selectedSegmentText : null
              ]}
            >
              {page}
            </Text>
          </Pressable>
        ))}
      </View>

      <PagerView
        initialPage={0}
        onPageSelected={(event) =>
          setSelectedPage(event.nativeEvent.position)
        }
        style={styles.pager}
      >
        {PAGES.map((page) => (
          <View key={page} style={styles.page}>
            <FlashList
              data={ITEMS}
              contentInsetAdjustmentBehavior="automatic"
              contentContainerStyle={styles.feedContent}
              keyExtractor={(item) => String(item.id)}
              renderItem={({ item }) => (
                <View style={styles.card}>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <Text style={styles.cardBody}>
                    Scroll to the bottom. The last cells/background should
                    extend correctly behind or above the native tab bar.
                  </Text>
                </View>
              )}
            />
          </View>
        ))}
      </PagerView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#0f172a"
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 72,
    paddingBottom: 16
  },
  title: {
    color: "white",
    fontSize: 32,
    fontWeight: "700"
  },
  description: {
    color: "#94a3b8",
    fontSize: 15,
    marginTop: 6
  },
  segmentedControl: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingBottom: 12
  },
  segment: {
    marginRight: 20,
    paddingBottom: 8
  },
  selectedSegment: {
    borderBottomColor: "white",
    borderBottomWidth: 3
  },
  segmentText: {
    color: "#94a3b8",
    fontSize: 20,
    fontWeight: "700"
  },
  selectedSegmentText: {
    color: "white"
  },
  pager: {
    backgroundColor: "blue",
    flex: 1
  },
  page: {
    height: "100%",
    width: "100%"
  },
  feedContent: {
    backgroundColor: "#0f172a",
    paddingBottom: 120
  },
  card: {
    borderBottomColor: "#1e293b",
    borderBottomWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 18
  },
  cardTitle: {
    color: "white",
    fontSize: 22,
    fontWeight: "700"
  },
  cardBody: {
    color: "#cbd5e1",
    fontSize: 16,
    lineHeight: 22,
    marginTop: 8
  }
});
