import React, { useState, useContext } from "react";
import { observer } from "mobx-react";
import * as LibraryComponents from "@lp/library/components";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, {
  Search,
  CSVExport,
} from "react-bootstrap-table2-toolkit";
import moment from "moment";

import * as Models from "../models";
import * as Util from "../util";
import RootStoreContext from "@lp/library/stores";
import * as Services from "../services";

const { SearchBar, ClearSearchButton } = Search;
const { ExportCSVButton } = CSVExport;

const Deginisation = observer(() => {
  const rootStore = useContext(RootStoreContext.rootStore);
  const [errors, setErrors] = useState<Models.IDeginisation>();
  const [deleteItem, setDeleteItem] = useState<any>({});

  return (
    <>
      <LibraryComponents.Header>
        <LibraryComponents.PageHeading
          title="Deginisation"
          subTitle="Add, Edit & Delete Deginisation"
        />
      </LibraryComponents.Header>
      <div className=" mx-auto  p-4  flex-wrap">
        <div className="m-1 p-2 rounded-lg shadow-xl">
          <LibraryComponents.Grid cols={2}>
            <LibraryComponents.List
              direction="col"
              space={4}
              justify="stretch"
              fill
            >
              <LibraryComponents.Form.Input
                label="Code"
                id="code"
                placeholder="Code"
                value={rootStore.deginisationStore.deginisation?.code}
                onChange={(code) => {
                  setErrors({
                    ...errors,
                    code: Util.validate.single(
                      code,
                      Util.constraintsDeginisation.code
                    ),
                  });
                  rootStore.deginisationStore.updateDescription({
                    ...rootStore.deginisationStore.deginisation,
                    code,
                  });
                }}
              />
              {errors?.code && (
                <span className="text-red-600 font-medium relative">
                  {errors.code}
                </span>
              )}
              <LibraryComponents.Form.Input
                label="Description"
                name="description"
                placeholder="description"
                value={rootStore.deginisationStore.deginisation?.description}
                onChange={(description) => {
                  setErrors({
                    ...errors,
                    description: Util.validate.single(
                      description,
                      Util.constraintsDeginisation.description
                    ),
                  });
                  rootStore.deginisationStore.updateDescription({
                    ...rootStore.deginisationStore.deginisation,
                    description,
                  });
                }}
              />
              {errors?.description && (
                <span className="text-red-600 font-medium relative">
                  {errors.description}
                </span>
              )}
            </LibraryComponents.List>
          </LibraryComponents.Grid>
          <br />

          <LibraryComponents.List direction="row" space={3} align="center">
            <LibraryComponents.Button
              size="medium"
              type="solid"
              icon={LibraryComponents.Icons.Save}
              onClick={() => {
                if (
                  Util.validate(
                    rootStore.deginisationStore.deginisation,
                    Util.constraintsDeginisation
                  ) === undefined
                ) {
                  rootStore.setProcessLoading(true);
                  Services.addDeginisation(
                    rootStore.deginisationStore.deginisation
                  ).then(() => {
                    rootStore.setProcessLoading(false);
                    LibraryComponents.ToastsStore.success(
                      `Deginisation created.`
                    );
                    rootStore.deginisationStore.fetchListDeginisation();
                    rootStore.deginisationStore.clear();
                  });
                } else {
                  LibraryComponents.ToastsStore.warning(
                    "Please enter all information!"
                  );
                }
              }}
            >
              Save
            </LibraryComponents.Button>
            <LibraryComponents.Button
              size="medium"
              type="outline"
              icon={LibraryComponents.Icons.Remove}
              onClick={() => {
                rootStore.deginisationStore.clear();
              }}
            >
              Clear
            </LibraryComponents.Button>
          </LibraryComponents.List>
        </div>
        <br />
        <div className="m-1 p-2 rounded-lg shadow-xl">
          <ToolkitProvider
            keyField="id"
            data={rootStore.deginisationStore.listDeginisation || []}
            columns={[
              {
                dataField: "code",
                text: "Code",
                sort: true,
              },
              {
                dataField: "description",
                text: "Description",
              },
              {
                dataField: "opration",
                text: "Delete",
                editable: false,
                csvExport: false,
                formatter: (cellContent, row) => (
                  <>
                    <LibraryComponents.Button
                      size="small"
                      type="outline"
                      icon={LibraryComponents.Icons.Remove}
                      onClick={() => {
                        setDeleteItem({
                          show: true,
                          id: row._id,
                          title: "Are you sure?",
                          body: `Delete ${row.description} deginisation!`,
                        });
                      }}
                    >
                      Delete
                    </LibraryComponents.Button>
                  </>
                ),
              },
            ]}
            search
            exportCSV={{
              fileName: `deginisation_${moment(new Date()).format(
                "YYYY-MM-DD HH:mm"
              )}.csv`,
              noAutoBOM: false,
              blobType: "text/csv;charset=ansi",
            }}
          >
            {(props) => (
              <div>
                <SearchBar {...props.searchProps} />
                <ClearSearchButton
                  className={`inline-flex ml-4 bg-gray-500 items-center  small outline shadow-sm  font-medium  disabled:opacity-50 disabled:cursor-not-allowed text-center`}
                  {...props.searchProps}
                />
                <ExportCSVButton
                  className={`inline-flex ml-2 bg-gray-500 items-center  small outline shadow-sm  font-medium  disabled:opacity-50 disabled:cursor-not-allowed text-center`}
                  {...props.csvProps}
                >
                  Export CSV!!
                </ExportCSVButton>
                <hr />
                <BootstrapTable
                  {...props.baseProps}
                  noDataIndication="Table is Empty"
                  hover
                  // cellEdit={cellEditFactory({
                  //   mode: "dbclick",
                  //   blurToSave: true,
                  //   // afterSaveCell,
                  // })}
                />
              </div>
            )}
          </ToolkitProvider>
        </div>
        <LibraryComponents.Modal.ModalConfirm
          {...deleteItem}
          click={() => {
            Services.deleteDeginisation(deleteItem.id).then((res: any) => {
              if (res.status) {
                LibraryComponents.ToastsStore.success(`Deginisation deleted.`);
                setDeleteItem({ show: false });
                rootStore.deginisationStore.fetchListDeginisation();
              }
            });
          }}
        />
      </div>
    </>
  );
});

export default Deginisation;
