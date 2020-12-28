import React, { useContext } from "react";
import { observer } from "mobx-react";
import { Router, Link, RouteComponentProps } from "@reach/router";
import * as Features from "@lp/features";
import * as LibraryComponents from "@lp/library/components";
import RootStoreContext from "@lp/library/stores";
import * as Models from "@lp/models";
import * as Utils from "@lp/library/utils";
import LoginContext from "@lp/features/login/stores";
import { Alert } from "react-bootstrap";

interface LoginPageProps extends RouteComponentProps {
  definitions: Models.Definition[];
}

const LoginPage: React.FunctionComponent<LoginPageProps> = observer(() => {
  const rootStore = useContext(RootStoreContext);
  let loginStore = useContext(LoginContext);

  return (
    <>
      <div className="h-screen w-screen fixed left-0 top-0 bg-gray-600 flex flex-col justify-center">
        <div className="grid grid-cols-2">
          <div className="flex flex-col justify-center items-center">
            <h2 className="text-2xl text-white font-bold">Lims Plus</h2>
          </div>

          <div className="bg-white p-6 rounded-md max-w-md">
            <LibraryComponents.List
              direction="col"
              space={4}
              justify="stretch"
              fill
            >
              <LibraryComponents.Form.Input
                label="Lab"
                id="lab"
                placeholder="Lab"
                // value={loginStore.inputLogin.lab}
                onChange={(lab) => {
                  loginStore.updateInputUser({
                    ...loginStore.inputLogin,
                    lab,
                  });
                }}
              />
              <LibraryComponents.Form.Input
                label="User Id"
                id="userId"
                placeholder="User Id"
                //value={loginStore.inputLogin.userId}
                onChange={(userId) => {
                  loginStore.updateInputUser({
                    ...loginStore.inputLogin,
                    userId,
                  });
                }}
              />
              <LibraryComponents.Form.Input
                type="password"
                label="Password"
                id="password"
                placeholder="Password"
                // value={loginStore.inputLogin.password}
                onChange={(password) => {
                  loginStore.updateInputUser({
                    ...loginStore.inputLogin,
                    password,
                  });
                }}
              />
            </LibraryComponents.List>
            <br />
            <LibraryComponents.List direction="row" space={3} align="center">
              <LibraryComponents.Button
                size="medium"
                type="solid"
                icon={LibraryComponents.Icons.Check}
                onClick={() => {
                  rootStore.setProcessLoading(true);
                  Features.User.Pipes.User.onLogin(loginStore).then((res) => {
                    rootStore.setProcessLoading(false);
                    if (!res) {
                      alert("User not found");
                    }
                  });
                }}
              >
                Login
              </LibraryComponents.Button>
              <LibraryComponents.Button
                size="medium"
                type="outline"
                icon={LibraryComponents.Icons.Remove}
                onClick={() => {
                  loginStore.clear();
                }}
              >
                Clear
              </LibraryComponents.Button>
            </LibraryComponents.List>
          </div>
        </div>
      </div>
      ;
    </>
  );
});

const App = observer(() => {
  const moduleKeys = Object.keys(Features);
  const moduleFeatures = (Features as any) as Models.Modules;
  const modulesArray = moduleKeys.map((moduleKey) => moduleFeatures[moduleKey]);
  const sceneMap = new Map<string, React.FunctionComponent>();

  const loginStore = useContext(LoginContext);
  const rootStore = useContext(RootStoreContext);

  modulesArray.forEach((moduleObject) => {
    Object.keys(moduleObject.Scenes).forEach((sceneKey) => {
      sceneMap.set(sceneKey, moduleObject.Scenes[sceneKey]);
    });
  });

  const featuresArray = Utils.flatten(
    modulesArray.map((module) => module.Definition)
  );

  const featureGroups = Utils.unique(
    featuresArray.map((feature) => feature.category)
  );

  const groups = featureGroups.map((group) => ({
    label: group,
    items: featuresArray.filter((feature) => feature.category === group),
  }));

  return (
    <>
      <div className="fixed w-52 bg-gray-800 h-screen">
        <div className="px-4 py-3 flex flex-row justify-start items-center mb-3">
          <div className="flex-1 mt-1">
            <p className="m-0 flex-1 text-lg font-bold text-white leading-4">
              Lims Plus
            </p>
            <p className="m-0 mt-2 flex-1 text-xs text-indigo-300 leading-4">
              Administration
            </p>
          </div>
        </div>
      </div>
      <div className="ml-52 bg-gray-100 min-h-screen">
        {rootStore.processLoading && <LibraryComponents.Loader />}
        <Router>
          <LoginPage
            path="/"
            definitions={Utils.flatten(groups.map((g) => g.items))}
          />
          {featuresArray.map((feature) => {
            const Component = sceneMap.get(
              feature.component
            ) as React.FunctionComponent<RouteComponentProps>;
            return <Component path={feature.path} />;
          })}
        </Router>
      </div>
    </>
  );
});

export default App;
