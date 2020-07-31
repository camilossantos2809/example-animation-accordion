import { StatusBar } from "expo-status-bar";
import React, { useState, useRef } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Transition, Transitioning } from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";

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
    <LinearGradient style={styles.gradient} colors={["#19242f", "#0054cb"]}>
      <Text style={styles.title}>RP Collect</Text>
      <Text style={styles.subtitle}>Usuário: 100000 - Teste</Text>
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
              activeOpacity={0.9}
              onPress={() => {
                ref.current.animateNextTransition();
                setCurrentIndex((prev) => (index === prev ? null : index));
              }}
            >
              <View style={styles.row}>
                {index !== currentIndex && (
                  <Text
                    numberOfLines={2}
                    style={[styles.headingColored, { color: bg }]}
                  >
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
                        <Text
                          key={subCategory}
                          style={[styles.body, { color }]}
                        >
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
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    paddingLeft: 20,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    marginTop: 80,
    marginBottom: 10,
    paddingLeft: 20,
    justifyContent: "center",
  },
  row: { flexGrow: 1, flexDirection: "row" },
  cardContainer: {
    flexGrow: 1,
  },
  cardColored: {
    alignItems: "center",
    paddingTop: 20,
  },
  title: {
    color: "#f5f5eb",
    fontSize: 30,
    paddingTop: 20,
    paddingLeft: 10,
  },
  subtitle: {
    color: "#f5f5eb",
    fontSize: 16,
    lineHeight: 16 * 1.5,
    paddingLeft: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: -1,
  },
  headingColored: {
    flexGrow: 1,
    fontSize: 24,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: -1,
    textAlign: "right",
    paddingRight: 10,
  },
  body: {
    fontSize: 18,
    lineHeight: 18 * 1.5,
    textAlign: "right",
  },
  subCategoriesList: {
    marginTop: 20,
  },
});
