describe("better-placeholder-polyfill", function() {
    "use strict";

    var input, placeholder, defineSpy;

    beforeEach(function() {
        defineSpy = spyOn(Object, "defineProperty");
        input = DOM.mock("input[placeholder=`123`]");
        placeholder = input.get("_placeholderElement");
    });

    it("should use placeholder value", function() {
        expect(placeholder.get()).toBe("123");

        input = DOM.mock("input[placeholder=`some text`]");
        expect(input.get("placeholder")).toBe("some text");
    });

    it("displays placeholder if value exists", function() {
        input = DOM.mock("input[placeholder=`123` value=`some value`]");
        placeholder = input.get("_placeholderElement");

        expect(placeholder.get("aria-hidden")).toBe("true");
    });

    it("shows placeholder on blur when value is empty", function() {
        input._focusInput(placeholder);
        expect(placeholder.css("display")).toBe("none");

        input._blurInput(placeholder);
        expect(placeholder.css("display")).not.toBe("none");
    });

    it("does not show placeholder if input has a value", function() {
        input._focusInput(placeholder);
        expect(placeholder.css("display")).toBe("none");

        input.set("123");

        input._blurInput(placeholder);
        expect(placeholder.css("display")).toBe("none");
    });

    it("should focus on input when placeholder was clicked", function() {
        var spy = spyOn(input, "fire");

        expect(input._clickPlaceholder()).toBe(false);
        expect(spy).toHaveBeenCalledWith("focus");
    });
});
