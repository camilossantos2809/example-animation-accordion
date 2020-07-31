import { StatusBar } from "expo-status-bar";
import React, { useState, useRef } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Transition, Transitioning } from "react-native-reanimated";

import data from "./data";

const transition = (
  <Transition.Together>
    <Transition.In type="fade" durationMs={300} />
    <Transition.Change />
    <Transition.Out type="fade" durationMs={200} />
  </Transition.Together>
);

export default function App() {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const ref = useRef();

  return (
    <Transitioning.View
      transition={transition}
      ref={ref}
      style={styles.container}
    >
      <StatusBar hidden />
      {data.map(({ bg, color, category, subCategories }, index) => {
        return (
          <TouchableOpacity
            key={category}
            style={styles.cardContainer}
            activeOpacity={0.8}
            onPress={() => {
              ref.current.animateNextTransition();
              setCurrentIndex((prev) => (index === prev ? null : index));
            }}
          >
            <View style={styles.row}>
              {index !== currentIndex && (
                <Text style={[styles.headingColored, { color: bg }]}>
                  {category}
                </Text>
              )}
              <View
                style={[
                  styles.cardColored,
                  {
                    backgroundColor: bg,
                    width: index === currentIndex ? undefined : 30,
                    flexGrow: index === currentIndex ? 1 : 0,
                    borderTopLeftRadius: index === currentIndex ? 10 : 0,
                    borderBottomLeftRadius: index === currentIndex ? 10 : 0,
                    elevation: index === currentIndex ? 5 : 0,
                  },
                ]}
              >
                {index === currentIndex && (
                  <Text style={[styles.heading, { color }]}>{category}</Text>
                )}
                {index === currentIndex && (
                  <View style={styles.subCategoriesList}>
                    {subCategories.map((subCategory) => (
                      <Text key={subCategory} style={[styles.body, { color }]}>
                        {subCategory}
                      </Text>
                    ))}
                  </View>
                )}
              </View>
            </View>
          </TouchableOpacity>
        );
      })}
    </Transitioning.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 100,
    paddingLeft: 20,
    justifyContent: "center",
  },
  row: { flexGrow: 1, flexDirection: "row" },
  cardContainer: {
    flexGrow: 1,
  },
  cardColored: {
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontSize: 38,
    fontWeight: "900",
    textTransform: "uppercase",
    letterSpacing: -2,
  },
  headingColored: {
    flexGrow: 1,
    color: "#0053cb",
    fontSize: 38,
    fontWeight: "900",
    textTransform: "uppercase",
    letterSpacing: -2,
    textAlign: "right",
    paddingRight: 10,
  },
  body: {
    fontSize: 20,
    lineHeight: 20 * 1.5,
    textAlign: "center",
  },
  subCategoriesList: {
    marginTop: 20,
  },
});
