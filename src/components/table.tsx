import { ReactNode } from "react";

type Cell = {
  value: ReactNode;
  onClick?: () => void;
  colSpan?: number;
};

type Props = {
  columns: Cell[];
  rows: Cell[][];
  className?: string;
  columnClassName?: string;
  rowClassName?: string;
  isLoading?: boolean;
};

export default function Table({
  columns,
  rows,
  className,
  columnClassName,
  rowClassName,
  isLoading = false,
}: Props) {
  return (
    <table className={className} cellSpacing="100">
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th
              key={index}
              colSpan={column.colSpan}
              onClick={column.onClick}
              className={columnClassName}
            >
              {column.value}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {isLoading ? (
          <tr>
            <td colSpan={columns.length} className="text-center">
              <div className="flex flex-col w-full h-full items-center gap-5 p-16">
                <div className="w-12 h-12 border-4 border-gray-200 border-t-black rounded-full animate-spin" />
                Loading...
              </div>
            </td>
          </tr>
        ) : rows.length > 0 ? (
          rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  colSpan={cell.colSpan}
                  onClick={cell.onClick}
                  className={rowClassName}
                >
                  {cell.value}
                </td>
              ))}
            </tr>
          ))
        ) : (
          <tr>
            <td
              colSpan={columns.length}
              className="text-center text-gray-500 p-10"
            >
              No data available
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
