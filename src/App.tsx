import React from "react";
import { observer } from "mobx-react";
import { Router, Link, RouteComponentProps } from "@reach/router";
import * as Features from "@lp/features";
import * as LibraryComponents from "@lp/library/components";
import * as Models from "@lp/models";
import * as Utils from "@lp/library/utils";

interface LoginPageProps extends RouteComponentProps {
  definitions: Models.Definition[];
}

const LoginPage: React.FunctionComponent<LoginPageProps> = (props) => (
  <div className="h-screen w-screen fixed left-0 top-0 bg-gray-600 flex flex-col justify-center">
    <div className="grid grid-cols-2">
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-2xl text-white font-bold">Lims Plus</h2>
        <p className="text-base text-white">Login</p>
      </div>
      <div className="">
        <div className="w-96 mr-auto">
          {props.definitions.map((definition) => (
            <Link
              to={definition.path.replace("/*", "")}
              className="block bg-white shadow-sm border border-gray-200 px-4 pr-5 py-3 first:rounded-t-lg last:rounded-b-lg transform transition-transform hover:scale-105 hover:rounded-lg hover:shadow-lg hover:z-50 cursor-pointer"
            >
              <LibraryComponents.List space={4}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={definition.icon}
                />

                <div>
                  <h1 className="text-base font-bold text-left leading-4">
                    {definition.label}
                  </h1>
                  <p className="text-sm text-left text-gray-600">
                    {definition.description}
                  </p>
                </div>
              </LibraryComponents.List>
            </Link>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const App = observer(() => {
  const moduleKeys = Object.keys(Features);
  const moduleFeatures = (Features as any) as Models.Modules;
  const modulesArray = moduleKeys.map((moduleKey) => moduleFeatures[moduleKey]);
  const sceneMap = new Map<string, React.FunctionComponent>();

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
