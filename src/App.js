import React, { Component, Suspense } from "react";
import { connect } from "react-redux";
import { Route, withRouter, Switch, Redirect } from "react-router-dom";

import Layout from "../src/components/Layout/Layout";
import BurgerBuilder from "./container/BurgerBuilder/BurgerBuilder";
import Logout from "./container/Auth/Logout/Logout";
import * as actions from "../src/store/actions/index";

const Orders = React.lazy(() => import("./container/Orders/Orders"));
const Auth = React.lazy(() => import("../src/container/Auth/Auth"));
const Checkout = React.lazy(() => import("../src/container/Checkout/Checkout"));

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuth) {
      routes = (
        <Switch>
          <Route path="/" exact component={BurgerBuilder} />
          <Route
            path="/orders"
            render={() => (
              <Suspense fallback={<div>loading...</div>}>
                <Orders />
              </Suspense>
            )}
          />
          <Route
            path="/checkout"
            render={() => (
              <Suspense fallback={<div>loading...</div>}>
                <Checkout />
              </Suspense>
            )}
          />
          <Route
            path="/auth"
            render={() => (
              <Suspense fallback={<div>loading...</div>}>
                <Auth />
              </Suspense>
            )}
          />
          <Route path="/logout" component={Logout} />
          <Redirect to="/" />
        </Switch>
      );
    }

    return <Layout>{routes}</Layout>;
  }
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
