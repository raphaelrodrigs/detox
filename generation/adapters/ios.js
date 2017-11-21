const t = require("babel-types");
const generator = require("../core/generator");
const {
  isNumber,
  isString,
  isBoolean,
  isPoint,
  isOneOf,
  isGreyMatcher,
  isArray
} = require('../core/type-checks');
const {callGlobal} = require('../helpers');

const typeCheckInterfaces = {
  NSInteger: isNumber,
  CGFloat: isNumber,
  CGPoint: isPoint,
  CFTimeInterval: isNumber,
  double: isNumber,
  float: isNumber,
  NSString: isString,
  BOOL: isBoolean,
  "NSDate *": isNumber,
  GREYDirection: isOneOf(["left", "right", "up", "down"]),
  GREYContentEdge: isOneOf(["left", "right", "top", "bottom"]),
  GREYPinchDirection: isOneOf(["outward", "inward"]),
  "id<GREYMatcher>": isGreyMatcher,
  UIAccessibilityTraits: isArray,
};

const supportedContentSanitizersMap = {
  GREYDirection: {
    type: "NSInteger",
    value: callGlobal("sanitize_greyDirection")
  },
  GREYContentEdge: {
    type: "NSInteger",
    value: callGlobal("sanitize_greyContentEdge")
  },
  UIAccessibilityTraits: {
    type: "NSInteger",
    value: callGlobal("sanitize_uiAccessibilityTraits")
  }
};

module.exports = generator({
  typeCheckInterfaces,
  supportedContentSanitizersMap,
  supportedTypes: [
    "CGFloat",
    "CGPoint",
    "GREYContentEdge",
    "GREYDirection",
    "NSInteger",
    "NSString *",
    "NSString",
    "NSUInteger",
    "id<GREYMatcher>",
    "UIAccessibilityTraits"
  ],
  renameTypesMap: {
    NSUInteger: "NSInteger",
    "NSString *": "NSString"
  },
  classValue: ({ name }) => name,

}); 