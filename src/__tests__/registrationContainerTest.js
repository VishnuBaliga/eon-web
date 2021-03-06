/* eslint-disable no-undef */
/* eslint-env mocha */
import React from "react";
import rootReducer from "../reducers/rootReducer";
import { createStore } from "redux";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import OrganiserRegistration from "../containers/registration/organiserRegistration"
import UserRegistration from "../containers/registration/userRegistration"

const store = createStore(rootReducer);

const organiserComponent = <OrganiserRegistration store={store} history={{push:(text)=>{console.log(text+' called')}}}/>;

configure({ adapter: new Adapter() });
describe("Registration container components", () => {

  it("number of Form Components", () => {
    const wrapper = shallow(organiserComponent).dive({ context: { store } }).dive();
    expect(wrapper.find(".registration-main")).toHaveLength(1);
  });
  it("number of image components", () => {
    const wrapper = shallow(organiserComponent).dive({ context: { store } }).dive();
    expect(wrapper.find(".image-style")).toHaveLength(1);
  });
  it("number of image components", () => {
    const wrapper = shallow(organiserComponent).dive({ context: { store } }).dive();
    wrapper.setState({
        activeKey: 1,
        showModal: true,
        showWarningModal: true,
    })
    expect(wrapper.find(".image-style")).toHaveLength(1);
  });
  it("number of input field", () => {
    const wrapper = shallow(organiserComponent).dive({ context: { store } }).dive();
    wrapper.setState({
        activeKey: 2,
        showModal: true,
        showWarningModal: true,
    })
    expect(wrapper.find(".form-container")).toHaveLength(1);
  });
  it("number of form header field", () => {
    const wrapper = shallow(organiserComponent).dive({ context: { store } }).dive();
    expect(wrapper.find(".form-header")).toHaveLength(1);
  });
  it("handle modal close", () => {
    const wrapper = shallow(organiserComponent)
      .dive({ context: { store } })
      .dive();
      wrapper.setState({
          isChecked: true,
          showModal: true
      })
      expect(wrapper.state("isChecked")).toBe(true);
      expect(wrapper.state("showModal")).toBe(true);
      wrapper.instance().handleModalClose();
      expect(wrapper.state("isChecked")).toBe(false);
      expect(wrapper.state("showModal")).toBe(false);
  });
  it("handle accept", () => {
    const wrapper = shallow(organiserComponent)
      .dive({ context: { store } })
      .dive();
      wrapper.setState({
          isChecked: true,
          showModal: true
      })
      expect(wrapper.state("isChecked")).toBe(true);
      expect(wrapper.state("showModal")).toBe(true);
      wrapper.instance().handleAccept();
      expect(wrapper.state("showModal")).toBe(false);
  });
  it("handle accept", () => {
    const wrapper = shallow(organiserComponent)
      .dive({ context: { store } })
      .dive();
      wrapper.setState({
          isChecked: false,
          showModal: true
      })

      expect(wrapper.state("isChecked")).toBe(false);
      expect(wrapper.state("showModal")).toBe(true);
      wrapper.instance().handleAccept();
      expect(wrapper.state("showModal")).toBe(true);
  });
  it("handle callback", () => {
    const wrapper = shallow(organiserComponent)
      .dive({ context: { store } })
      .dive();
      wrapper.setState({
          isChecked: true,
          showModal: true
      })
      wrapper.setProps({
          postUser: ({callback}) => callback()
      })
      expect(wrapper.state("isChecked")).toBe(true);
      expect(wrapper.state("showWarningModal")).toBe(false);
      expect(wrapper.state("showModal")).toBe(true);
      wrapper.instance().handleAccept();
      expect(wrapper.state("showModal")).toBe(false);
      expect(wrapper.state("showWarningModal")).toBe(true);
  });
  it("handle callback for accept", () => {
    const wrapper = shallow(organiserComponent)
      .dive({ context: { store } })
      .dive();
      wrapper.setState({
          isChecked: true,
          showModal: true
      })
      wrapper.setProps({
          postUser: ({callback}) => callback("error")
      })
      expect(wrapper.state("isChecked")).toBe(true);
      expect(wrapper.state("showWarningModal")).toBe(false);
      expect(wrapper.state("showModal")).toBe(true);
      expect(wrapper.state("hasErrored")).toBe(false);
      wrapper.instance().handleAccept();
      expect(wrapper.state("showModal")).toBe(false);
      expect(wrapper.state("showWarningModal")).toBe(false);
      expect(wrapper.state("hasErrored")).toBe(true);
  });
  it("handle checkboxchange", () => {
    const wrapper = shallow(organiserComponent)
      .dive({ context: { store } })
      .dive();
      wrapper.setState({
          isChecked: false,
      })

      expect(wrapper.state("isChecked")).toBe(false);
      wrapper.instance().handleCheckBoxChange();
      expect(wrapper.state("isChecked")).toBe(true);
      wrapper.instance().handleCheckBoxChange();
      expect(wrapper.state("isChecked")).toBe(false);
  });
  it("handle password change", () => {
    const wrapper = shallow(organiserComponent)
      .dive({ context: { store } })
      .dive();
      wrapper.setState({
          password: "",
      })

      expect(wrapper.state("password")).toBe("");
      wrapper.instance().handlePassWordChange({target: {
          value: "hello"
      }});
      expect(wrapper.state("password")).toBe("hello");
  });
  it("handle handleBack on multi step form", () => {
    const wrapper = shallow(organiserComponent)
      .dive({ context: { store } })
      .dive();
      wrapper.setState({
          activeKey: 2
      })
      expect(wrapper.state("activeKey")).toBe(2);
      wrapper.instance().handleBack();
      expect(wrapper.state("activeKey")).toBe(1);
      wrapper.instance().handleBack();
      expect(wrapper.state("activeKey")).toBe(0);
  });
  it("handle submit", () => {
    const wrapper = shallow(organiserComponent)
      .dive({ context: { store } })
      .dive();
      wrapper.setState({
          activeKey: 0
      })
      expect(wrapper.state("activeKey")).toBe(0);
      wrapper.instance().handleSubmit({email: "test@abc.com"});
      expect(wrapper.state("activeKey")).toBe(1);
      expect(wrapper.state("formData")).toStrictEqual({email: "test@abc.com", address: undefined, contact: undefined, organization: undefined});
      expect(wrapper.state("showModal")).toBe(false);
      wrapper.instance().handleSubmit({password: "Test@123"});
      expect(wrapper.state("formData")).toStrictEqual({email: "test@abc.com", password: "Test@123",address: undefined, contact: undefined, organization: undefined, role:"organizer"});
      expect(wrapper.state("showModal")).toBe(true);
  });
  it("handle acceptwarning", () => {
    const wrapper = shallow(organiserComponent)
      .dive({ context: { store } })
      .dive();
      wrapper.instance().acceptWarning();
  });
});

const subscriberegistration = <UserRegistration store={store} history={{push:(text)=>{console.log(text+' called')}}}/>;

configure({ adapter: new Adapter() });
describe("login components", () => {

  it("number of Form Components", () => {
    const wrapper = shallow(subscriberegistration).dive({ context: { store } }).dive();
    expect(wrapper.find(".registration-main")).toHaveLength(1);
  });
  it("number of image components", () => {
    const wrapper = shallow(subscriberegistration).dive({ context: { store } }).dive();
    expect(wrapper.find(".image-style")).toHaveLength(1);
  });
  it("number of image components", () => {
    const wrapper = shallow(subscriberegistration).dive({ context: { store } }).dive();
    wrapper.setState({
        activeKey: 1,
        showModal: true,
        showWarningModal: true,
    })
    expect(wrapper.find(".image-style")).toHaveLength(1);
  });
  it("number of input field", () => {
    const wrapper = shallow(subscriberegistration).dive({ context: { store } }).dive();
    wrapper.setState({
        activeKey: 2,
        showModal: true,
        showWarningModal: true,
    })
    expect(wrapper.find(".form-container")).toHaveLength(1);
  });
  it("number of form", () => {
    const wrapper = shallow(subscriberegistration).dive({ context: { store } }).dive();
    expect(wrapper.find(".form-header")).toHaveLength(1);
  });
  it("handle modal close", () => {
    const wrapper = shallow(subscriberegistration)
      .dive({ context: { store } })
      .dive();
      wrapper.setState({
          isChecked: true,
          showModal: true
      })
      expect(wrapper.state("isChecked")).toBe(true);
      expect(wrapper.state("showModal")).toBe(true);
      wrapper.instance().handleModalClose();
      expect(wrapper.state("isChecked")).toBe(false);
      expect(wrapper.state("showModal")).toBe(false);
  });
  it("handle accept", () => {
    const wrapper = shallow(subscriberegistration)
      .dive({ context: { store } })
      .dive();
      wrapper.setState({
          isChecked: true,
          showModal: true
      })
      expect(wrapper.state("isChecked")).toBe(true);
      expect(wrapper.state("showModal")).toBe(true);
      wrapper.instance().handleAccept();
      expect(wrapper.state("showModal")).toBe(false);
  });
  it("handle accept", () => {
    const wrapper = shallow(subscriberegistration)
      .dive({ context: { store } })
      .dive();
      wrapper.setState({
          isChecked: false,
          showModal: true
      })

      expect(wrapper.state("isChecked")).toBe(false);
      expect(wrapper.state("showModal")).toBe(true);
      wrapper.instance().handleAccept();
      expect(wrapper.state("showModal")).toBe(true);
  });
  it("handle accept", () => {
    const wrapper = shallow(subscriberegistration)
      .dive({ context: { store } })
      .dive();
      wrapper.setState({
          isChecked: true,
          showModal: true
      })
      wrapper.setProps({
          postUser: ({callback}) => callback()
      })
      expect(wrapper.state("isChecked")).toBe(true);
      wrapper.instance().handleAccept();
      expect(wrapper.state("showModal")).toBe(false);
  });
  it("handle accept", () => {
    const wrapper = shallow(subscriberegistration)
      .dive({ context: { store } })
      .dive();
      wrapper.setState({
          isChecked: true,
          showModal: true
      })
      wrapper.setProps({
          postUser: ({callback}) => callback("error")
      })
      expect(wrapper.state("isChecked")).toBe(true);
      expect(wrapper.state("showModal")).toBe(true);
      expect(wrapper.state("hasErrored")).toBe(false);
      wrapper.instance().handleAccept();
      expect(wrapper.state("showModal")).toBe(false);
      expect(wrapper.state("hasErrored")).toBe(true);
  });
  it("handle checkboxcahnge", () => {
    const wrapper = shallow(subscriberegistration)
      .dive({ context: { store } })
      .dive();
      wrapper.setState({
          isChecked: false,
      })

      expect(wrapper.state("isChecked")).toBe(false);
      wrapper.instance().handleCheckBoxChange();
      expect(wrapper.state("isChecked")).toBe(true);
      wrapper.instance().handleCheckBoxChange();
      expect(wrapper.state("isChecked")).toBe(false);
  });
  it("handle password change", () => {
    const wrapper = shallow(subscriberegistration)
      .dive({ context: { store } })
      .dive();
      wrapper.setState({
          password: "",
      })

      expect(wrapper.state("password")).toBe("");
      wrapper.instance().handlePassWordChange({target: {
          value: "hello"
      }});
      expect(wrapper.state("password")).toBe("hello");
  });
  it("handle handle back", () => {
    const wrapper = shallow(subscriberegistration)
      .dive({ context: { store } })
      .dive();
      wrapper.setState({
          activeKey: 2
      })
      expect(wrapper.state("activeKey")).toBe(2);
      wrapper.instance().handleBack();
      expect(wrapper.state("activeKey")).toBe(1);
      wrapper.instance().handleBack();
      expect(wrapper.state("activeKey")).toBe(0);
  });
  it("handle submit", () => {
    const wrapper = shallow(subscriberegistration)
      .dive({ context: { store } })
      .dive();
      wrapper.setState({
          activeKey: 0
      })
      expect(wrapper.state("activeKey")).toBe(0);
      wrapper.instance().handleSubmit({email: "test@abc.com"});
      expect(wrapper.state("activeKey")).toBe(1);
      expect(wrapper.state("formData")).toStrictEqual({email: "test@abc.com", address: undefined, contact: undefined, name: undefined});
      expect(wrapper.state("showModal")).toBe(false);
      wrapper.instance().handleSubmit({password: "Test@123"});
      expect(wrapper.state("formData")).toStrictEqual({email: "test@abc.com", password: "Test@123",address: undefined, contact: undefined, role:"subscriber", name: undefined});
      expect(wrapper.state("showModal")).toBe(true);
  });
});
