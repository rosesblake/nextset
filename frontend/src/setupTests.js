console.log("✅ setupTests.js is running");
import "@testing-library/jest-dom";

const suppressedMessages = [
  "ReactDOMTestUtils.act",
  "React Router Future Flag Warning",
  "Relative route resolution within Splat routes",
  "The `punycode` module is deprecated",
];

const originalWarn = console.warn;
const originalError = console.error;

beforeAll(() => {
  console.warn = (...args) => {
    const message = args.map(String).join(" ");
    if (!suppressedMessages.some((msg) => message.includes(msg))) {
      originalWarn(...args);
    }
  };

  console.error = (...args) => {
    const message = args.map(String).join(" ");
    if (!suppressedMessages.some((msg) => message.includes(msg))) {
      originalError(...args);
    }
  };
});
