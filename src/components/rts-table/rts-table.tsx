import React, {useCallback, useState} from "react";
import Loading from "../../components/loading";

import "./rts-table.scss";

interface IRtsTableProps {
  readonly children?: JSX.Element | JSX.Element[];
  className?: string;
  data: any[];
  total: number;
  keys: { key: string, label: string }[];
  row: React.FunctionComponent;
  isLoading?: boolean;
  page: number;
  onPrevious: any;
  onNext: any;
}

const HeadRow = (item) => (
  <th key={item.key}>{item.label}</th>
);

const RtsTable = (props: IRtsTableProps) => {
  const pages = props.total % 10 === 0
    ? props.total / 10
    : props.total / 10 + 1;

  const [page, setPage] = useState(props.page);

  const onPrevious = useCallback(() => {
    if (page === 1) {
      return;
    }
    setPage(page - 1);
    props.onPrevious(page - 1)
  }, []);

  const onNext = useCallback(() => {
    if (page >= pages) {
      return;
    }
    setPage(page + 1);
    props.onNext(page + 1)
  }, []);

  return (
    <table className={`rts-table ${props.className}`}>
      <thead>
      {props.data.length
        ? (
          <tr>
            <th colSpan={props.keys.length}>
              <span onClick={onPrevious}>previous</span>
              <span> | </span>
              <span onClick={onNext}>next</span>
              <span> | </span>
              <span>page {props.page} of {props.total}</span>
            </th>
          </tr>
        )
        : null
      }
      <tr>
        {props.keys.map(HeadRow)}
      </tr>
      </thead>

      <tbody>
      {props.children}

      {props.isLoading ? (<tr>
        <td className="text-center" colSpan={props.keys.length}><Loading/></td>
      </tr>) : null}

      {props.data.map(props.row)}
      </tbody>
    </table>
  );
}

export default RtsTable;