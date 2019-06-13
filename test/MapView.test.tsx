import "jest";
import React from "react";
import { shallow, mount, render } from "enzyme";
import { MapView } from "../src/MapView";

describe("<MapView />", () => {

  it("LoaMap", () => {


  });

  it("calls componentDidMount", () => {
    jest.spyOn(MapView.prototype, "componentDidMount");
    const wrapper = mount(<MapView />);
    expect((MapView.prototype.componentDidMount as any).mock.calls.length).toBe(1);
  });

});
