import { configure } from "enzyme";
import React16Adapter from "enzyme-adapter-react-16";

function noOp() { }

if (typeof window.URL.createObjectURL === "undefined") {
    Object.defineProperty(window.URL, "createObjectURL", { value: noOp });
}

configure({ adapter: new React16Adapter() });
