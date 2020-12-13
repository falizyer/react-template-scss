import React from "react";
import Loading from "../../components/loading";

import "./rts-table.scss";

interface IRtsTableProps {
  className?: string;
  data: any[];
  keys: { key: string, label: string }[];
  row: React.FunctionComponent;
  isLoading?: boolean;
}

const HeadRow = (item) => (
  <th key={item.key}>{item.label}</th>
);

const RtsTable = (props: IRtsTableProps) => {

  return (
    <table className={`rts-table ${props.className}`}>
      <thead>
      <tr>
        {props.keys.map(HeadRow)}
      </tr>
      </thead>

      <tbody>

      {props.isLoading ? (<tr>
        <td className="text-center" colSpan={props.keys.length}><Loading/></td>
      </tr>) : null}

      {props.data.map(props.row)}
      </tbody>
    </table>
  );
}

export default RtsTable;