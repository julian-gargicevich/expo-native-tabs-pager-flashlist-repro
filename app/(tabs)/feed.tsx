import PagerView from "@expo/ui/community/pager-view";
import { useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

type FeedItem = {
  id: number;
  title: string;
};

const ITEMS: FeedItem[] = Array.from({ length: 40 }, (_, index) => ({
  id: index + 1,
  title: `Feed item ${index + 1}`
}));

const PAGES = ["FlatList", "View"] as const;

export default function FeedScreen() {
  const [selectedPage, setSelectedPage] = useState(0);

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.title}>Feed</Text>
        <Text style={styles.description}>
          Compare a nested FlatList page with a plain View page inside the same
          PagerView.
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
        <View key="flatlist" style={styles.page}>
          <FlatList
            data={ITEMS}
            contentInsetAdjustmentBehavior="automatic"
            contentContainerStyle={styles.feedContent}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardBody}>
                  FlatList page. Scroll to the bottom and compare how this
                  nested vertical scroll view behaves around the native tab bar.
                </Text>
              </View>
            )}
          />
        </View>

        <View key="view" style={styles.page}>
          <View style={styles.viewPageContent}>
            {ITEMS.slice(0, 6).map((item) => (
              <View key={item.id} style={styles.card}>
                <Text style={styles.cardTitle}>View item {item.id}</Text>
                <Text style={styles.cardBody}>
                  Plain View page. This page does not create a nested vertical
                  scroll view.
                </Text>
              </View>
            ))}
          </View>
        </View>
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
  viewPageContent: {
    backgroundColor: "#0f172a",
    flex: 1
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
