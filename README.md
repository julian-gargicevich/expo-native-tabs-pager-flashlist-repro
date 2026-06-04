# Expo NativeTabs + PagerView + FlashList inset reproduction

This is a minimal reproduction for a layout/inset issue with:

- `expo-router/unstable-native-tabs`
- `@expo/ui/community/pager-view`
- a vertically scrolling `FlashList` nested inside a pager page

## Problem

When a native tab screen contains:

```txt
NativeTabs.Screen
  -> PagerView
      -> page View
          -> FlashList
```

the nested vertical `FlashList` does not appear to receive/apply the same bottom
native tab inset behavior as a root vertical `ScrollView`.

The result is that feed content/background can appear visually cut by the native
tab bar area on iOS, while a similar screen where the root scroll owner is a
`ScrollView` works as expected.

## Screens in this repro

- `Feed`: failing shape. `PagerView` fills the screen and each pager page owns a
  vertical `FlashList`.
- `Search`: working comparison. The root screen owns a vertical `ScrollView`,
  and `PagerView` is given a measured height inside that scroll view.

## Expected behavior

The nested `FlashList` in `Feed` should extend/adjust correctly with the native
tab bar, matching the behavior of the root `ScrollView` in `Search`.

## Actual behavior

The `Feed` tab's nested list content/background can be clipped or stop visually
at the native tab bar area. Moving the background color up to `PagerView` paints
the full area, which suggests the pager viewport fills correctly, but the nested
vertical list/page does not get the same inset treatment.

## Notes from investigation

This app uses `@expo/ui/community/pager-view`, not the standalone
`react-native-pager-view` package. The Expo iOS implementation is a horizontal
SwiftUI `ScrollView` hosted by `@expo/ui`.

That makes this hierarchy likely relevant:

```txt
NativeTabs automatic inset handling
  -> @expo/ui PagerView horizontal SwiftUI ScrollView
      -> RN hosted page
          -> FlashList vertical scroll view
```

The nested vertical scroll view may be too deep behind the pager layer for the
native tab screen's automatic inset behavior to affect it the same way it affects
a root `ScrollView`.

Related Callstack PagerView issues that point to similar measurement/nested
scroll fragility:

- https://github.com/callstack/react-native-pager-view/issues/306
- https://github.com/callstack/react-native-pager-view/issues/436
- https://github.com/callstack/react-native-pager-view/issues/848
- https://github.com/callstack/react-native-pager-view/issues/839

## Run

```sh
yarn install
yarn ios
```

or:

```sh
npx expo run:ios
```

## Environment

The versions mirror the app where the issue was observed:

- Expo SDK 56
- React Native 0.85.3
- React 19.2.3
- Expo Router 56.2.6
- `@expo/ui` 56.0.13
- `react-native-screens` 4.25.2
- `@shopify/flash-list` 2.0.2
