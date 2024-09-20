import React from "react";
import moment from "moment-timezone";
import BaseDialog from "./BaseDialog";
import { isI18n } from "../../helpers/audit";

export const AuditDialog = ({
  auditData,
  auditDialog,
  setAuditDialog,
  globalTz = moment.tz.guess(),
  maxWidth = "md"
}) => {
  return (
    <BaseDialog
      maxWidth={maxWidth}
      open={auditDialog.open}
      onClose={() => {
        setAuditDialog({ open: false });
      }}
      isDisableBackdropClick="true"
    >
      <div className="heading3_b mb-5">Audit History</div>
      <div className="mb-5">
        {auditData && auditData.length ? (
          <div className="table-responsive" style={{ height: "500px" }}>
            <table
              className="table-bordered text-left"
              style={{ tableLayout: "fixed", minWidth: "100%" }}
            >
              <thead>
                <tr>
                  <th className={"text-nowrap pr-2 pl-2 audit-width-30"}>
                    Action Date & Time
                  </th>
                  <th className="text-nowrap pr-2 pl-2 audit-width-40">
                    Action By
                  </th>
                  <th className="text-nowrap pr-2 pl-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {auditData.map(
                  (
                    {
                      data,
                      actionName,
                      tableName,
                      actionBy,
                      actionByRoles,
                      actionByEmail,
                      actionByMobile,
                      actionTime,
                      languageName,
                      additionalAttribute
                    },
                    i
                  ) => (
                    <tr key={i}>
                      <td className="text-nowrap pr-2 pl-2">
                        {actionTime
                          ? moment(actionTime)
                              .tz(globalTz)
                              .format("ll")
                          : ""}
                        <br />
                        {actionTime
                          ? moment(actionTime)
                              .tz(globalTz)
                              .format("h:mm:ss a")
                          : ""}
                      </td>
                      <td className="text-nowrap pr-2 pl-2">
                        {actionByEmail
                          ? actionByEmail
                          : actionByEmail === null || actionByEmail === ""
                          ? "system"
                          : ""}
                        <br />
                        {actionByMobile}
                        <br />
                        {actionByRoles &&
                          actionByRoles.length !== 0 &&
                          actionByRoles.toString()}
                        {additionalAttribute && (
                          <pre>
                            {Object.keys(additionalAttribute).map(key => {
                              if (key === "auditInfo") {
                                return Object.keys(
                                  additionalAttribute[key]
                                ).map(key => {
                                  if (
                                    typeof additionalAttribute["auditInfo"][
                                      key
                                    ] === "object"
                                  ) {
                                    return (
                                      <>
                                        <b>{key}:</b>&nbsp;
                                        {JSON.stringify(
                                          additionalAttribute["auditInfo"][key],
                                          undefined,
                                          2
                                        )}
                                        <br />
                                      </>
                                    );
                                  }
                                  return (
                                    <>
                                      {key}:{" "}
                                      {additionalAttribute["auditInfo"][key]}
                                    </>
                                  );
                                });
                              }
                              return (
                                <>
                                  <b>{key}:</b>&nbsp;
                                  {JSON.stringify(
                                    additionalAttribute[key],
                                    undefined,
                                    2
                                  )}
                                  <br />
                                </>
                              );
                            })}
                          </pre>
                        )}
                      </td>
                      <td className="text-nowrap pr-2 pl-2">
                        {actionName}
                        <br />
                        {languageName && (
                          <>
                            {languageName}
                            <br />
                          </>
                        )}
                        {Object.keys(data).map((key, i) => {
                          if (key === "meta") {
                            return Object.keys(data[key]).map((metaKey, i) => (
                              <div key={i}>
                                {`${metaKey} - ${data[key][metaKey]}`}
                              </div>
                            ));
                          } else if (isI18n(key)) {
                            return (
                              <div
                                className="heading_bold"
                                key={i}
                              >{`${key} - ${data[key][languageName] &&
                                data[key][languageName].value}`}</div>
                            );
                          } else {
                            return (
                              <div
                                className="heading_bold"
                                key={i}
                              >{`${key} - ${data[key].value}`}</div>
                            );
                          }
                        })}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center">No data available...</div>
        )}
      </div>
    </BaseDialog>
  );
};
