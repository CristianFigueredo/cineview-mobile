// Pre-configure RNTL's host component name registry so it skips auto-detection
// (which fails because our jest.doMock for react-native returns Image as an
// object with statics rather than a callable component).
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { configureInternal } = require("@testing-library/react-native/build/config")

configureInternal({
  hostComponentNames: {
    text: "Text",
    textInput: "TextInput",
    image: "Image",
    switch: "Switch",
    scrollView: "ScrollView",
    modal: "Modal",
  },
})
