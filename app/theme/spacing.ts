import { Spacings } from "react-native-ui-lib"
/**
  Use these spacings for margins/paddings and other whitespace throughout your app.
 */
export const spacing = {
  xxxs: Spacings.s1,
  xxs: Spacings.s2,
  xs: Spacings.s3,
  sm: Spacings.s4,
  md: Spacings.s5,
  lg: Spacings.s6,
  xl: Spacings.s7,
  xxl: Spacings.s8,
  xxxl: Spacings.s9,
} as const

export type Spacing = keyof typeof spacing
