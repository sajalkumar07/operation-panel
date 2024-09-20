import React from "react";
import moment from "moment-timezone";
import BaseDialog from "./BaseDialog";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { dispatchWithRequest } from "../../../src/actions/index.js";

export const CreditLedger = ({
  setCreditLedger,
  creditLedger,
  creditData,
  getCreditLedger
}) => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  useEffect(() => {
    setPage(0);
    setPageSize(10);
  }, []);
  return (
    <BaseDialog
      maxWidth="md"
      open={creditLedger.open}
      onClose={() => {
        setPage(0);
        setCreditLedger({ ...creditLedger, open: false });
      }}
      isDisableBackdropClick="true"
    >
      <div className="heading3_b mb-5">Credit Ledger</div>
      <div className="mb-5">
        {creditData?.data && creditData.data.length > 0 ? (
          <>
            <div className="table-responsive" style={{ height: "500px" }}>
              <table
                className="table-bordered text-left"
                style={{ tableLayout: "fixed", minWidth: "100%" }}
              >
                <thead>
                  <tr>
                    <th className={"text-nowrap pr-2 pl-2 audit-width-30"}>
                      Date
                    </th>
                    <th className="text-nowrap pr-2 pl-2 audit-width-40">
                      Quantity
                    </th>
                    <th className="text-nowrap pr-2 pl-2">Balance</th>
                    <th className="text-nowrap pr-2 pl-2">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {creditData.data.map(
                    ({ credit, balance, nc_reason_code, updated_at }, i) => (
                      <tr key={i}>
                        <td className="text-nowrap pr-2 pl-2">
                          {moment(updated_at).format("ll")}
                          <br />
                          {moment(updated_at).format("h:mm:ss a")}
                        </td>
                        <td className="text-nowrap pr-2 pl-2">
                          {credit ? credit : ""}
                        </td>
                        <td className="text-nowrap pr-2 pl-2">{balance}</td>
                        <td className="text-nowrap pr-2 pl-2">
                          {nc_reason_code}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
            <div className="d-flex justify-content-end align-items-baseline mt-3">
              <button
                className="btn btn-sm btn-dark mr-2"
                onClick={() => {
                  if (page !== 0) {
                    getCreditLedger({
                      studentId: creditLedger.studentId,
                      courseType: creditLedger.courseType,
                      pageNo: page - 1,
                      pageSize: pageSize
                    });
                    setPage(page - 1);
                  }
                }}
              >
                &laquo;
              </button>
              <span>
                {page * pageSize + 1} to{" "}
                {Math.min(creditData.count, (page + 1) * pageSize)} of{" "}
                {creditData.count}
              </span>
              <button
                className="btn btn-sm btn-dark ml-2"
                onClick={() => {
                  const totalPages =
                    1 + Math.floor(creditData.count / pageSize);
                  if (page + 1 !== totalPages) {
                    getCreditLedger({
                      studentId: creditLedger.studentId,
                      courseType: creditLedger.courseType,
                      pageNo: page + 1,
                      pageSize: pageSize
                    });
                    setPage(page + 1);
                  }
                }}
              >
                &raquo;
              </button>
            </div>
          </>
        ) : (
          <div className="text-center">No data available...</div>
        )}
      </div>
    </BaseDialog>
  );
};
