/**
* Types.ts
*
* Copyright (c) Microsoft Corporation. All rights reserved.
* Licensed under the MIT license.
*
* Type definitions for ReactXP framework.
*/

import React = require('react');

// Use only for type data
import RX = require('./Interfaces');

export { default as SubscribableEvent, SubscriptionToken } from 'subscribableevent';

export type ReactNode = React.ReactNode;

// Some RX components contain render logic in the abstract classes located in rx/common. That render logic
// depends on using a platform specific React library (web vs native). Thus, we need an interface to abstract
// this detail away from the components' common implementation.
export type ReactInterface = {
    createElement<P>(type: string, props?: P, ...children: React.ReactNode[]): React.ReactElement<P>;
};

//------------------------------------------------------------
// React Native Flexbox styles 0.14.2
// ------------------------------------------------------------

export interface FlexboxStyle {
    alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch';
    alignSelf?: 'auto' | 'flex-start' | 'flex-end' | 'center' | 'stretch';
    alignContent?: 'auto' | 'flex-start' | 'flex-end' | 'center' | 'stretch';

    borderWidth?: number;
    borderTopWidth?: number;
    borderRightWidth?: number;
    borderBottomWidth?: number;
    borderLeftWidth?: number;

    height?: number;
    width?: number;

    top?: number;
    right?: number;
    bottom?: number;
    left?: number;

    flexGrow?: number;
    flexShrink?: number;
    flexBasis?: number;
    flex?: number;

    flexWrap?: 'wrap' | 'nowrap';
    flexDirection?: 'column' | 'row' | 'column-reverse' | 'row-reverse';
    justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around';

    maxHeight?: number;
    maxWidth?: number;
    minHeight?: number;
    minWidth?: number;

    margin?: number;
    marginHorizontal?: number;
    marginVertical?: number;
    marginTop?: number;
    marginRight?: number;
    marginBottom?: number;
    marginLeft?: number;

    padding?: number;
    paddingHorizontal?: number;
    paddingVertical?: number;
    paddingTop?: number;
    paddingRight?: number;
    paddingBottom?: number;
    paddingLeft?: number;

    position?: 'absolute' | 'relative';
}

export abstract class AnimatedValue implements RX.IAnimatedValue {
    constructor(val: number) {
        // No-op
    }
    abstract setValue(value: number): void;
    abstract addListener(callback: any): string;
    abstract removeListener(id: string): void;
    abstract removeAllListeners(): void;
    abstract interpolate(config: any): AnimatedValue;
}

export interface AnimatedFlexboxStyle {
    height?: AnimatedValue;
    width?: AnimatedValue;

    top?: AnimatedValue;
    right?: AnimatedValue;
    bottom?: AnimatedValue;
    left?: AnimatedValue;
}

// ------------------------------------------------------------
// Transform Style Rules
// ------------------------------------------------------------

export interface TransformStyle {
    transform?: [{
        perspective?: number;
        rotate?: string;
        rotateX?: string;
        rotateY?: string;
        rotateZ?: string;
        scale?: number;
        scaleX?: number;
        scaleY?: number;
        translateX?: number;
        translateY?: number;
    }];
}

export interface AnimatedTransformStyle {
    transform?: [{
        perspective?: AnimatedValue;
        rotate?: AnimatedValue;
        rotateX?: AnimatedValue;
        rotateY?: AnimatedValue;
        rotateZ?: AnimatedValue;
        scale?: AnimatedValue;
        scaleX?: AnimatedValue;
        scaleY?: AnimatedValue;
        translateX?: AnimatedValue;
        translateY?: AnimatedValue;
    }];
}

export type StyleRuleSet<T> = T | number;
export type StyleRuleSetOrArray<T> = StyleRuleSet<T>|Array<StyleRuleSet<T>>;
export interface StyleRuleSetRecursiveArray<T> extends Array<StyleRuleSetOrArray<T>|StyleRuleSetRecursiveArray<T>> {}
export type StyleRuleSetRecursive<T> = StyleRuleSet<T> | StyleRuleSetRecursiveArray<T>;

// ------------------------------------------------------------
// Image and View common Style Rules
// ------------------------------------------------------------
export interface ViewAndImageCommonStyle extends FlexboxStyle, TransformStyle {
    borderWidth?: number;
    borderColor?: string;
    borderRadius?: number;
    borderTopRightRadius?: number;
    borderBottomRightRadius?: number;
    borderBottomLeftRadius?: number;
    borderTopLeftRadius?: number;
    overflow?: 'visible' | 'hidden';

    backgroundColor?: string;
    opacity?: number;
}

export interface AnimatedViewAndImageCommonStyle extends AnimatedFlexboxStyle, AnimatedTransformStyle {
    borderRadius?: AnimatedValue;
    backgroundColor?: AnimatedValue;
    opacity?: AnimatedValue;
}

// ------------------------------------------------------------
// View Style Rules
// ------------------------------------------------------------

export interface ViewStyle extends ViewAndImageCommonStyle {
    borderStyle?: 'solid' | 'dotted' | 'dashed' | 'none';
    wordBreak?: 'break-all' | 'break-word'; // Web only
    appRegion?: 'drag' | 'no-drag'; // Web only
    cursor?: 'pointer' | 'default'; // Web only
    shadowOffset?: { width: number; height: number };
    shadowOpacity?: number;
    shadowRadius?: number;
    shadowColor?: string;
    // Android does not support shadow, elevation achieves something similar.
    // http://facebook.github.io/react-native/releases/0.30/docs/shadow-props.html (iOS only)
    // http://facebook.github.io/react-native/releases/0.30/docs/view.html#style (see elevation property)
    elevation?: number; // Android only
}

export type ViewStyleRuleSet = StyleRuleSet<ViewStyle>;

export interface AnimatedViewStyle extends AnimatedViewAndImageCommonStyle {
}

export type AnimatedViewStyleRuleSet = StyleRuleSet<AnimatedViewStyle>;

// ------------------------------------------------------------
// ScrollView Style Rules
// ------------------------------------------------------------

export interface ScrollViewStyle extends ViewStyle {
}

export type ScrollViewStyleRuleSet = StyleRuleSet<ScrollViewStyle>;

// ------------------------------------------------------------
// Button Style Rules
// ------------------------------------------------------------

export interface ButtonStyle extends ViewStyle {
}

export type ButtonStyleRuleSet = StyleRuleSet<ButtonStyle>;

// ------------------------------------------------------------
// WebView Style Rules
// ------------------------------------------------------------

export interface WebViewStyle extends ViewStyle {
}

export type WebViewStyleRuleSet = StyleRuleSet<WebViewStyle>;

// ------------------------------------------------------------
// ActivityIndicator Style Rules
// ------------------------------------------------------------

export interface ActivityIndicatorStyle extends ViewStyle {
}

export type ActivityIndicatorStyleRuleSet = StyleRuleSet<ActivityIndicatorStyle>;

// ------------------------------------------------------------
// Text Style Rules
// ------------------------------------------------------------

export interface FontInfo {
    fontFamily?: string;
    fontStyle?: 'normal' | 'italic';
    fontWeight?: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
}

export interface TextStyle extends ViewStyle {
    color?: string;
    fontFamily?: string;
    fontSize?: number;
    fontStyle?: 'normal' | 'italic';
    fontWeight?: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
    font?: FontInfo;
    letterSpacing?: number;
    lineHeight?: number;
    textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify';
    textDecorationLine?: 'none' | 'underline' | 'line-through' | 'underline line-through';
    textDecorationStyle?: 'solid' | 'double' | 'dotted' | 'dashed';
    textDecorationColor?: string;
    writingDirection?: 'auto' | 'ltr' | 'rtl';
    // Properties specific to android platform
    // For android, these properties are set to textAlignVertical: 'center' & includeFontPadding: false
    // to match the same rendering as of ios and web
    textAlignVertical?: 'auto' | 'top' | 'bottom' | 'center';
    includeFontPadding?: boolean; // default is true
}

export type TextStyleRuleSet = StyleRuleSet<TextStyle>;

export interface AnimatedTextStyle extends AnimatedViewAndImageCommonStyle {
    color?: AnimatedValue;
    fontSize?: AnimatedValue;
}

export type AnimatedTextStyleRuleSet = StyleRuleSet<AnimatedTextStyle>;

// ------------------------------------------------------------
// TextInput Style Rules
// ------------------------------------------------------------

export interface TextInputStyle extends TextStyle {
}

export type TextInputStyleRuleSet = StyleRuleSet<TextInputStyle>;

export interface AnimatedTextInputStyle extends AnimatedViewAndImageCommonStyle {
    color?: AnimatedValue;
    fontSize?: AnimatedValue;
}

export type AnimatedTextInputStyleRuleSet = StyleRuleSet<AnimatedTextInputStyle>;

// ------------------------------------------------------------
// Link Style Rules
// ------------------------------------------------------------

export interface LinkStyle extends TextStyle {
}

export type LinkStyleRuleSet = StyleRuleSet<LinkStyle>;

// ------------------------------------------------------------
// Image Style Rules
// ------------------------------------------------------------

export interface ImageStyle extends ViewAndImageCommonStyle, FlexboxStyle {
    // This is an Android only style attribute that is used to fill the gap in the case of rounded corners
    // in gif images.
    overlayColor?: string;
}

export type ImageStyleRuleSet = StyleRuleSet<ImageStyle>;

export interface AnimatedImageStyle extends AnimatedViewAndImageCommonStyle, AnimatedFlexboxStyle {
}

export type AnimatedImageStyleRuleSet = StyleRuleSet<AnimatedImageStyle>;

// ------------------------------------------------------------
// Picker Style Rules
// ------------------------------------------------------------

export interface PickerStyle extends ViewStyle {
    color?: string;
}

export type PickerStyleRuleSet = StyleRuleSet<PickerStyle>;

//
// Components
// ----------------------------------------------------------------------
export interface CommonProps {
    ref?: string | ((obj: React.Component<any, any>) => void);
    key?: string | number;
    type?: any;
    children?: React.ReactNode | React.ReactNode[];
}

//
// Accessibility
//

export interface CommonAccessibilityProps {
    // iOS, Android, and Desktop
    importantForAccessibility?: ImportantForAccessibility;
    accessibilityLabel?: string;
    accessibilityTraits?: AccessibilityTrait | AccessibilityTrait[];

    // Desktop only.
    tabIndex?: number;

    // iOS only.
    accessibilityActions?: string[];
    onAccessibilityAction?: (e: SyntheticEvent) => void;
}

// Auto, Yes, No - iOS & Android.
// NoHideDescendants - iOS, Android, & Desktop.
export enum ImportantForAccessibility {
    Auto = 1,
    Yes,
    No,
    NoHideDescendants
}

export interface AccessibilityHtmlAttributes extends React.HTMLAttributes {
    'aria-label'?: string;
    'aria-live'?: string;
    'aria-hidden'?: boolean;
    'aria-disabled'?: boolean;
    'aria-selected'?: boolean;
}

// Android & Desktop supported prop, which allows screen-reader to inform its users when a
// component has dynamically changed. For example, the content of an inApp toast.
export enum AccessibilityLiveRegion {
    None,
    Polite,
    Assertive
}

// NOTE: This enum is organized based on priority of these traits (0 is the lowest),
// which can be assigned to an accessible object. On native, all traits are combined as
// a list. On desktop, trait with the maximum value is picked. Whenever you are adding
// a new trait add it in the right priority order in the list.
export enum AccessibilityTrait {
    // Desktop and iOS.
    Summary,
    Adjustable,

    // Desktop, iOS, and Android.
    Button,
    Tab,
    Selected,

    // Android only.
    Radio_button_checked,
    Radio_button_unchecked,

    // iOS only.
    Link,
    Header,
    Search,
    Image,
    Plays,
    Key,
    Text,
    Disabled,
    FrequentUpdates,
    StartsMedia,
    AllowsDirectInteraction,
    PageTurn,

    // Desktop only.
    Menu,
    MenuItem,
    MenuBar,
    TabList,
    List,
    ListItem,
    ListBox,
    Group,
    CheckBox,
    ComboBox,
    Log,
    Status,
    Dialog,

    // Desktop & mobile. This is at the end because this
    // is the highest priority trait.
    None
}

export interface CommonStyledProps<T> extends CommonProps {
    style?: StyleRuleSetRecursive<T>;
}

// Button
export interface ButtonProps extends CommonStyledProps<ButtonStyleRuleSet>, CommonAccessibilityProps {
    title?: string;
    children?: ReactNode;
    disabled?: boolean;
    delayLongPress?: number;
    cursor?: string;

    onAccessibilityTapIOS?: Function; // iOS-only prop, call when a button is double tapped in accessibility mode
    onContextMenu?: (e: SyntheticEvent) => void;
    onPress?: (e: SyntheticEvent) => void;
    onPressIn?: (e: SyntheticEvent) => void;
    onPressOut?: (e: SyntheticEvent) => void;
    onLongPress?: (e: SyntheticEvent) => void;
    onHoverStart?: (e: SyntheticEvent) => void;
    onHoverEnd?: (e: SyntheticEvent) => void;
    onKeyPress?: (e: KeyboardEvent) => void;
    onFocus?: (e: FocusEvent) => void;
    onBlur?: (e: FocusEvent) => void;

    shouldRasterizeIOS?: boolean; // iOS-only prop, if view should be rendered as a bitmap before compositing

    // iOS and Android only. Visual touchfeedback properties
    disableTouchOpacityAnimation?: boolean;
    activeOpacity?: number;
    underlayColor?: string;
}

// Picker
export interface PickerPropsItem {
    label: string;
    value: string;
}
export interface PickerProps extends CommonProps {
    items: PickerPropsItem[];
    selectedValue: string;
    onValueChange: (itemValue: string, itemPosition: number) => void;
    style?: StyleRuleSetRecursive<PickerStyleRuleSet>;
}

// Image
export interface ImagePropsShared extends CommonProps {
    source: string;
    headers?: { [headerName: string]: string };
    accessibilityLabel?: string;
    children?: ReactNode;
    resizeMode?: 'stretch' | 'contain' | 'cover' | 'auto' | 'repeat';

    resizeMethod?: 'auto' | 'resize' | 'scale'; // Android only
    title?: string;

    onLoad?: (size: Dimensions) => void;
    onError?: (err?: Error) => void;

    shouldRasterizeIOS?: boolean; // iOS-only prop, if view should be rendered as a bitmap before compositing
}

export interface ImageProps extends ImagePropsShared {
    style?: StyleRuleSetRecursive<ImageStyleRuleSet>;
}

export interface AnimatedImageProps extends ImagePropsShared {
    style?: StyleRuleSetRecursive<AnimatedImageStyleRuleSet | ImageStyleRuleSet>;
}

// Text
// Nested text elements follow a text layout instead of Flexbox.
//
// <Text>I am a <Text style={{fontWeight: 'bold'}}>very</Text> important example</Text>
//
// Will render as
// | I am a very |
// | important   |
// | example     |
export interface TextPropsShared extends CommonProps {
    children?: ReactNode;
    selectable?: boolean;
    numberOfLines?: number;

    // Should fonts be scaled according to system setting? Defaults
    // to true. iOS and Android only.
    allowFontScaling?: boolean;

    // Specifies the maximum scale factor for text size. iOS and Android only.
    maxContentSizeMultiplier?: number;

    // iOS and Android only
    ellipsizeMode?:  'head' | 'middle'| 'tail';

    // Exposing this property as temporary workaround to fix a bug.
    // TODO : http://skype.vso.io/865016 : remove this exposed property
    // Used only for Android.
    textBreakStrategy?: 'highQuality' | 'simple' | 'balanced';

    importantForAccessibility?: ImportantForAccessibility;

    // Android only
    elevation?: number;

    onPress?: (e: SyntheticEvent) => void;
}

export interface TextProps extends TextPropsShared {
    style?: StyleRuleSetRecursive<TextStyleRuleSet>;
}

export interface AnimatedTextProps extends TextPropsShared {
    style?: StyleRuleSetRecursive<AnimatedTextStyleRuleSet | TextStyleRuleSet>;
}

export type ViewLayerType = 'none' | 'software' | 'hardware';

// View
export interface ViewPropsShared extends CommonProps, CommonAccessibilityProps {
    title?: string;
    ignorePointerEvents?: boolean;
    blockPointerEvents?: boolean; // Native-only prop for disabling touches on self and all child views
    shouldRasterizeIOS?: boolean; // iOS-only prop, if view should be rendered as a bitmap before compositing
    viewLayerTypeAndroid?: ViewLayerType; // Android only property
    children?: ReactNode;

    restrictFocusWithin?: boolean; // Web-only, during the keyboard navigation, the focus will not go outside this view
    limitFocusWithin?: boolean; // Web-only, make the view and all focusable subelements not focusable when isFocusLimited state is true

    importantForLayout?: boolean; // Web-only, additional invisible DOM elements will be added to track the size changes faster

    // There are a couple of constraints when child animations are enabled:
    //   - Every child must have a `key`.
    //   - String refs aren't supported on children. Only callback refs are.
    animateChildEnter?: boolean;
    animateChildLeave?: boolean;
    animateChildMove?: boolean;

    onAccessibilityTapIOS?: Function;
    onLayout?: (e: ViewOnLayoutEvent) => void;
    onMouseEnter?: (e: MouseEvent) => void;
    onMouseLeave?: (e: MouseEvent) => void;
    onDragEnter?: (e: DragEvent) => void;
    onDragOver?: (e: DragEvent) => void;
    onDragLeave?: (e: DragEvent) => void;
    onDrop?: (e: DragEvent) => void;
    onMouseOver?: (e: MouseEvent) => void;
    onMouseMove?: (e: MouseEvent) => void;

    onPress?: (e: SyntheticEvent) => void;
    onLongPress?: (e: SyntheticEvent) => void;
    onKeyPress?: (e: KeyboardEvent) => void;
    onFocus?: (e: FocusEvent) => void;
    onBlur?: (e: FocusEvent) => void;

    // iOS and Android only. Visual touchfeedback properties
    disableTouchOpacityAnimation?: boolean;
    activeOpacity?: number;
    underlayColor?: string;
}

export interface ViewProps extends ViewPropsShared {
    style?:  StyleRuleSetRecursive<ViewStyleRuleSet>;
    onContextMenu?: (e: React.SyntheticEvent) => void;
    onStartShouldSetResponder?: (e: React.SyntheticEvent) => boolean;
    onMoveShouldSetResponder?: (e: React.SyntheticEvent) => boolean;
    onStartShouldSetResponderCapture?: (e: React.SyntheticEvent) => boolean;
    onMoveShouldSetResponderCapture?: (e: React.SyntheticEvent) => boolean;
    onResponderGrant?: (e: React.SyntheticEvent) => void;
    onResponderReject?: (e: React.SyntheticEvent) => void;
    onResponderRelease?: (e: React.SyntheticEvent) => void;
    onResponderStart?: (e: React.TouchEvent) => void;
    onResponderMove?: (e: React.TouchEvent) => void;
    onResponderEnd?: (e: React.TouchEvent) => void;
    onResponderTerminate?: (e: React.SyntheticEvent) => void;
    onResponderTerminationRequest?: (e: React.SyntheticEvent) => boolean;

    //Web-only for styling views using CSS when needed
    className?: string;
}

export interface AnimatedViewProps extends ViewPropsShared {
    style?: StyleRuleSetRecursive<AnimatedViewStyleRuleSet | ViewStyleRuleSet>;
}

// GestureView
export interface GestureState {
    timeStamp: Date;
}

export interface MultiTouchGestureState extends GestureState {
    initialCenterClientX: number;
    initialCenterClientY: number;
    initialCenterPageX: number;
    initialCenterPageY: number;
    initialWidth: number;
    initialHeight: number;
    initialDistance: number;
    initialAngle: number;

    centerClientX: number;
    centerClientY: number;
    centerPageX: number;
    centerPageY: number;
    velocityX: number;
    velocityY: number;
    width: number;
    height: number;
    distance: number;
    angle: number;

    isComplete: boolean;
}

export interface ScrollWheelGestureState extends GestureState {
    clientX: number;
    clientY: number;
    pageX: number;
    pageY: number;
    scrollAmount: number;
}

export interface PanGestureState extends GestureState {
    initialClientX: number;
    initialClientY: number;
    initialPageX: number;
    initialPageY: number;
    clientX: number;
    clientY: number;
    pageX: number;
    pageY: number;
    velocityX: number;
    velocityY: number;

    isComplete: boolean;
}

export interface TapGestureState extends GestureState {
    clientX: number;
    clientY: number;
    pageX: number;
    pageY: number;
}

export enum GestureMouseCursor {
    Default,
    Pointer,
    Grab,
    Move
}

export enum PreferredPanGesture {
    Horizontal,
    Vertical
}

export interface GestureViewProps extends CommonStyledProps<ViewStyleRuleSet>, CommonAccessibilityProps {
    // Gestures and attributes that apply only to touch inputs
    onPinchZoom?: (gestureState: MultiTouchGestureState) => void;
    onRotate?: (gestureState: MultiTouchGestureState) => void;

    // Gestures and attributes that apply only to mouse inputs
    onScrollWheel?: (gestureState: ScrollWheelGestureState) => void;
    mouseOverCursor?: GestureMouseCursor;

    // Gestures and attributes that apply to either touch or mouse inputs
    onPan?: (gestureState: PanGestureState) => void;
    onPanVertical?: (gestureState: PanGestureState) => void;
    onPanHorizontal?: (gestureState: PanGestureState) => void;
    onTap?: (gestureState: TapGestureState) => void;
    onDoubleTap?: (gestureState: TapGestureState) => void;

    // We can set vertical or horizontal as preferred
    preferredPan?: PreferredPanGesture;

    // How many pixels (in either horizontal or vertical direction) until
    // pan is recognized? Default is 10. Can be any value > 0.
    panPixelThreshold?: number;

    // Something else wants to become responder. Should this view release the responder?
    // Setting true allows release
    releaseOnRequest?: boolean;
}

// ScrollView
export interface ScrollViewProps extends ViewProps {
    style?: StyleRuleSetRecursive<ScrollViewStyleRuleSet>;
    children?: ReactNode;

    vertical?: boolean; // By default true
    horizontal?: boolean; // By default false

    // If the contents are smaller than the view port,
    // should they be justified to the top of the view
    // (i.e. flex-start) or the end (flex-end)?
    justifyEnd?: boolean; // By default false

    onLayout?: (e: ViewOnLayoutEvent) => void;
    onContentSizeChange?: (width: number, height: number) => void;
    onScroll?: (newScrollTop: number, newScrollLeft: number) => void;
    onScrollBeginDrag?: () => void;
    onScrollEndDrag?: () => void;
    showsHorizontalScrollIndicator?: boolean;
    showsVerticalScrollIndicator?: boolean;
    scrollEnabled?: boolean;

    // The following props are valid only on native platforms and
    // have no meaning on the web implementation.
    keyboardDismissMode?: 'none' | 'interactive' | 'on-drag';
    keyboardShouldPersistTaps?: boolean;

    // This controls how often the scroll event will be fired while scrolling
    // (in milliseconds between events). A lower number yields better accuracy for code
    // that is tracking the scroll position, but can lead to scroll performance
    // problems due to the volume of information being send over the bridge.
    // The default value is 16, which means the scroll event will be sent
    // at most once very frame.
    // @platform ios
    scrollEventThrottle?: number;

    // iOS only properties for controlling bounce effect when scrolling.
    // When true, the scroll view bounces when it reaches the end of the content
    // if the content is larger then the scroll view along the axis of the scroll direction.
    // When false, it disables all bouncing even if the alwaysBounce* props are true.
    // The default value is true.
    bounces?: boolean;

    // iOS only properties to allow snapping the items within a scroll view one by one or in pages.
    pagingEnabled?: boolean;
    snapToInterval?: number;

    // Mobile only property (currently only iOS). If set to true, this scroll view will be
    // scrolled to the top if the status bar is tapped. The default value is true.
    // This maps to the actual behavior of the same property of ScrollView component in React Native.
    // Documentation: http://facebook.github.io/react-native/docs/scrollview.html#scrollstotop
    scrollsToTop?: boolean;

    // Android only property to control overScroll mode
    overScrollMode?: 'always' | 'always-if-content-scrolls' | 'never';

    // iOS-only property to control scroll indicator insets
    scrollIndicatorInsets?:  {top: number, left: number, bottom: number, right: number };
}

// Link
export interface LinkProps extends CommonStyledProps<LinkStyleRuleSet> {
    title?: string;
    url?: string;
    children?: ReactNode;
    selectable?: boolean;
    numberOfLines?: number;
    allowFontScaling?: boolean;
    maxContentSizeMultiplier?: number;

    onPress?: (e: RX.Types.SyntheticEvent, url: string) => void;
    onLongPress?: (e: RX.Types.SyntheticEvent, url: string) => void;
    onHoverStart?: (e: SyntheticEvent) => void;
    onHoverEnd?: (e: SyntheticEvent) => void;
}

// TextInput
export interface TextInputPropsShared extends CommonProps, CommonAccessibilityProps {
    autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
    autoCorrect?: boolean;
    autoFocus?: boolean;
    blurOnSubmit?: boolean;
    defaultValue?: string;
    editable?: boolean;
    keyboardType?: 'default' | 'numeric' | 'email-address' | 'number-pad';
    maxLength?: number;
    multiline?: boolean;
    placeholder?: string;
    placeholderTextColor?: string;
    secureTextEntry?: boolean;
    value?: string;
    textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify';

     // Should fonts be scaled according to system setting? Defaults
    // to true. iOS and Android only.
    allowFontScaling?: boolean;

    // Specifies the maximum scale factor for text size. iOS and Android only.
    maxContentSizeMultiplier?: number;

    // iOS-only prop for controlling the keyboard appearance
    keyboardAppearance?: 'default' | 'light' | 'dark';

    // iOS and Android prop for controlling return key type
    returnKeyType?: 'done' | 'go' | 'next' | 'search' | 'send';

    // Android-only prop for disabling full screen editor mode
    disableFullscreenUI?: boolean;

    // iOS and web prop for enabling spellcheck. Defaults to the value set for 'autoCorrect'.
    spellCheck?: boolean;

    // iOS and Android only property for controlling the text input selection color
    selectionColor?: string;

    onKeyPress?: (e: KeyboardEvent) => void;
    onFocus?: (e: FocusEvent) => void;
    onBlur?: (e: FocusEvent) => void;
    onPaste?: (e: ClipboardEvent) => void;
    onChangeText?: (newValue: string) => void;
    onSelectionChange?: (start: number, end: number) => void;
    onSubmitEditing?: () => void;
    onScroll?: (newScrollTop: number, newScrollLeft: number) => void;
}

export interface TextInputProps extends TextInputPropsShared {
    style?: StyleRuleSetRecursive<TextInputStyleRuleSet>;
}

export interface AnimatedTextInputProps extends TextInputPropsShared {
    style?: StyleRuleSetRecursive<AnimatedTextInputStyleRuleSet | TextInputStyleRuleSet>;
}

// ActivityIndicator
export interface ActivityIndicatorProps extends CommonStyledProps<ActivityIndicatorStyleRuleSet> {
    color: string;
    size?: 'large' | 'medium' | 'small' | 'tiny';
    deferTime?: number; // Number of ms to wait before displaying
}

// WebView
export interface WebViewNavigationState extends Event {
    canGoBack: boolean;
    canGoForward: boolean;
    loading: boolean;
    url: string;
    title: string;
}

export interface WebViewErrorState extends WebViewNavigationState {
    description: string;
    domain: string;
    code: string;
}

export enum WebViewSandboxMode {
    None = 0,
    AllowForms = 1 << 0,
    AllowModals = 1 << 1,
    AllowOrientationLock = 1 << 2,
    AllowPointerLock = 1 << 3,
    AllowPopups = 1 << 4,
    AllowPopupsToEscapeSandbox = 1 << 5,
    AllowPresentation = 1 << 6,
    AllowSameOrigin = 1 << 7,
    AllowScripts = 1 << 8,
    AllowTopNavigation = 1 << 9
}

export interface WebViewProps extends CommonStyledProps<WebViewStyleRuleSet> {
    url: string;
    headers?: { [key: string]: string };
    onLoad?: (e: SyntheticEvent) => void;
    onNavigationStateChange?: (navigationState: WebViewNavigationState) => void;
    scalesPageToFit?: boolean;
    injectedJavaScript?: string;
    javaScriptEnabled?: boolean;

    // Native only
    startInLoadingState?: boolean;
    domStorageEnabled?: boolean;
    onShouldStartLoadWithRequest?: (shouldStartLoadEvent: WebViewShouldStartLoadEvent) => boolean;
    onLoadStart?: (e: SyntheticEvent) => void;
    onError?: (s: SyntheticEvent) => void;

    // Web only; overrides javaScriptEnabled if used
    sandbox?: WebViewSandboxMode;
    className?: string;
}

export type PopupPosition  = 'top' | 'right' | 'bottom' | 'left';

// Popup
export interface PopupOptions {
    // Returns a mounted component instance that serves as the
    // "anchor" for the popup. Often a button.
    getAnchor: () => React.Component<any, any>;

    // Renders the contents of the popup.
    renderPopup: (anchorPosition: PopupPosition, anchorOffset: number,
        popupWidth: number, popupHeight: number) => ReactNode;

    // Returns a mounted component instance that controls the triggering of the popup.
    // In majority of cases, "anchor" of popup has handlers to control when the popup will be seen and this function is not required.
    // In a few cases, where anchor is not the same as the whole component that triggers when the popup wil be seen, this can be used.
    // For instance, a button combined with a chevron icon, which on click triggers a popup below the chevron icon.
    // In this example, getElementTriggeringPopup() can return the container with button and chevron icon.
    getElementTriggeringPopup?: () => React.Component<any, any>;

    // Called when the popup is dismissed.
    onDismiss?: () => void;

    // Prioritized order of positions. Popup is positioned
    // relative to the anchor such that it remains on screen.
    // Default is ['bottom', 'right', 'top', 'left'].
    positionPriorities?: PopupPosition[];

    // Position the popup inside its anchor.
    // In this mode only the first position priority will be used.
    useInnerPositioning?: boolean;

    // On pressed handler to notify whoever wanted to create the popup that its
    // anchor has been pressed.
    // IMPORTANT NOTE: This handler may be called when the component is
    // already unmounted as it uses a time delay to accommodate a fade-out animation.
    onAnchorPressed?: (e: RX.Types.SyntheticEvent) => void;

    // Determines if the anchor invoking the popup should behave like a toggle.
    // Value = true  => Calling Popup.show will show the popup. A subsequent call, will hide the popup, and so on.
    // Value = false or undefined (default)  => Calling Popup.show will always show the popup.
     dismissIfShown?: boolean;

     // Prevents the front-most popup from closing if the user clicks or taps
     // outside of it. It will still close if the anchor is unmounted or if
     // dismiss is explicitly called.
     preventDismissOnPress?: boolean;
}

//
// Navigator
// ----------------------------------------------------------------------
export enum NavigatorSceneConfigType {
    FloatFromRight,
    FloatFromLeft,
    FloatFromBottom,
    Fade,
    FadeWithSlide
}

export interface NavigatorRoute {
    routeId: number;
    // Route's animation configuration
    sceneConfigType: NavigatorSceneConfigType;

    // NOTE: The following props are for the experimental navigator.
    // They aren't considered when working with the standard navigator.
    // Optional gesture response distance override
    // 0 is equivalent to disabling gestures
    gestureResponseDistance?: number;
    // Optional custom scene config
    customSceneConfig?: CustomNavigatorSceneConfig;
}

// NOTE: Experimental navigator only
export type NavigationTransitionSpec = {
    duration?: number;

    // NOTE: Elastic and bounce easing will not work as expected due to how the navigator interpolates styles
    easing?: Animated.EasingFunction;
};

// NOTE: Experimental navigator only
export type NavigationTransitionStyleConfig = {
  // By default input range is defined as [index - 1, index, index + 1];
  // Input and output ranges must contain the same number of elements
  inputRange?: number[];
  opacityOutput: number | number[];
  scaleOutput: number | number[];
  translateXOutput: number | number[];
  translateYOutput: number | number[];
};

// NOTE: Experimental navigator only
export type CustomNavigatorSceneConfig = {
  // Optional transition styles
  transitionStyle?: (sceneIndex: number, sceneDimensions: Dimensions) => NavigationTransitionStyleConfig;
  // Optional overrides for duration, easing, and timing
  transitionSpec?: NavigationTransitionSpec;
  // Optional cardStyle override
  cardStyle?: ViewStyleRuleSet;
  // Optionally hide drop shadow
  hideShadow?: boolean;
  // Optionally flip the visual order of the last two scenes
  presentBelowPrevious?: boolean;
};

export interface NavigatorProps extends CommonProps {
    renderScene: (route: NavigatorRoute) => JSX.Element;
    navigateBackCompleted?: () => void;
    // NOTE: Arguments are only passed to transitionStarted by the experimental navigator
    transitionStarted?: (progress?: RX.IAnimatedValue,
        toRouteId?: string, fromRouteId?: string,
        toIndex?: number, fromIndex?: number) => void;
    transitionCompleted?: () => void;
    cardStyle?: ViewStyleRuleSet;
    children?: ReactNode;
}

//
// Alert
//
// Alerts are not React components but OS dialog boxes which, depending
// on OS support, can show while React window is minimized or while
// the app is in background.
// ----------------------------------------------------------------------
export interface AlertButtonSpec {
    text?: string;
    onPress?: () => void;
    style?: 'default' | 'cancel' | 'destructive';
}

//
// Location
// ----------------------------------------------------------------------
export enum LocationErrorType {
    PermissionDenied = 1,
    PositionUnavailable,
    Timeout
}

export type LocationWatchId = number;
export type LocationSuccessCallback = (position: Position) => void;
export type LocationFailureCallback = (error: LocationErrorType) => void;

//
// Animated
// ----------------------------------------------------------------------
export module Animated {

    export type ValueListenerCallback = (value: number | string) => void;
    export type EndResult = { finished: boolean };
    export type EndCallback = (result: EndResult) => void;
    export type CompositeAnimation = {
        start: (callback?: EndCallback) => void;
        stop: () => void;
    };

    export interface LoopConfig {
        restartFrom: number;
    }

    export interface AnimationConfig {
        useNativeDriver?: boolean;
        isInteraction?: boolean;
    }

    export interface TimingAnimationConfig extends AnimationConfig {
        toValue: number;
        easing?: EasingFunction;
        duration?: number;
        delay?: number;
        loop?: LoopConfig;
    }

    export interface InterpolationConfigType {
        inputRange: number[];
        outputRange: (number | string)[];
    }

    export type TimingFunction = (value: RX.IAnimatedValue, config: TimingAnimationConfig) => CompositeAnimation;
    export var timing: TimingFunction;

    export type SequenceFunction = (animations: Array<CompositeAnimation>) => CompositeAnimation;
    export var sequence: SequenceFunction;

    export type ParallelFunction = (animations: Array<CompositeAnimation>) => CompositeAnimation;
    export var parallel: ParallelFunction;

    export type EasingFunction = {
        cssName: string;
        function: (input: number) => number;
    };

    export interface Easing {
        Default(): EasingFunction;
        Linear(): EasingFunction;
        Out(): EasingFunction;
        In(): EasingFunction;
        InOut(): EasingFunction;
        InBack(): EasingFunction;
        OutBack(): EasingFunction;
        InOutBack(): EasingFunction;
        StepStart(): EasingFunction;
        StepEnd(): EasingFunction;
        Steps(intervals: number, end?: boolean): EasingFunction;
        CubicBezier(x1: number, y1: number, x2: number, y2: number): EasingFunction;
    }
}

//
// Events
// ----------------------------------------------------------------------
export type SyntheticEvent = React.SyntheticEvent;

export type DragEvent = React.DragEvent;
export type ClipboardEvent = React.ClipboardEvent;
export type FocusEvent = React.FocusEvent;
export type FormEvent = React.FormEvent;
export type MouseEvent = React.MouseEvent;
export type TouchEvent = React.TouchEvent;
export type UIEvent = React.UIEvent;
export type WheelEvent = React.WheelEvent;

export interface WebViewShouldStartLoadEvent extends SyntheticEvent {
    url: string;
}

export interface WebViewNavigationEvent extends SyntheticEvent {
    nativeEvent: WebViewNavigationState;
}

export interface WebViewErrorEvent extends SyntheticEvent {
    nativeEvent: WebViewErrorState;
}

export type ViewOnLayoutEvent = {
    x: number;
    y: number;
    height: number;
    width: number;
};
export interface KeyboardEvent extends SyntheticEvent {
    ctrlKey: boolean;
    altKey: boolean;
    shiftKey: boolean;
    keyCode: number;
    metaKey: boolean;
}

//
// Component
// ----------------------------------------------------------------------
export var Children: React.ReactChildren;

interface Element<P> {
    type: React.ComponentClass<P>;
    props: P;
}

//
// Dimensions
// ----------------------------------------------------------------------
export type Dimensions = {
    width: number;
    height: number;
};

//
// Linking
// ----------------------------------------------------------------------
export interface EmailInfo {
    to?: string[];
    cc?: string[];
    bcc?: string[];
    subject?: string;
    body?: string;
}

export interface SmsInfo {
    phoneNumber?: string;
    body?: string;
}

export enum LinkingErrorCode {
    NoAppFound = 0,
    UnexpectedFailure = 1,
    Blocked = 2,
    InitialUrlNotFound = 3
}

export interface LinkingErrorInfo {
    code: LinkingErrorCode;
    url: string;
    description?: string;
}

//
// App
// ----------------------------------------------------------------------
export enum AppActivationState {
    Active = 1,
    Background = 2,
    Inactive = 3,
    Extension = 4
}

// UserInterface
// ----------------------------------------------------------------------
export interface LayoutInfo {
    x: number;
    y: number;
    width: number;
    height: number;
}

//
// Platform
// ----------------------------------------------------------------------
export type PlatformType = 'web' | 'ios' | 'android' | 'windows';

//
// Network
// ----------------------------------------------------------------------
export enum DeviceNetworkType {
    Unknown,
    None,
    Wifi,
    Mobile2G,
    Mobile3G,
    Mobile4G
}
