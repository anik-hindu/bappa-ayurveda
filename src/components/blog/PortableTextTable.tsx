import { PortableText } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";

import type { SanityTable, SanityTableCell, SanityTableRow } from "@/types";

interface PortableTextTableProps {
  value: SanityTable;
}

const cellComponents = {
  block: {
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="leading-relaxed">{children}</p>
    ),
  },

  marks: {
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong className="font-semibold text-text-primary">{children}</strong>
    ),

    em: ({ children }: { children?: React.ReactNode }) => <em>{children}</em>,

    link: ({
      value,
      children,
    }: {
      value?: { href?: string };
      children?: React.ReactNode;
    }) => {
      if (!value?.href) {
        return <>{children}</>;
      }

      return (
        <a
          href={value.href}
          className="font-medium text-text-primary underline decoration-border-accent underline-offset-3 hover:text-text-accent"
        >
          {children}
        </a>
      );
    },
  },
};

function TableCellContent({ cell }: { cell: SanityTableCell }) {
  const value = cell.value ?? [];

  if (value.length === 0) {
    return null;
  }

  return (
    <PortableText
      value={value as PortableTextBlock[]}
      components={cellComponents}
    />
  );
}

function TableRow({ row, header }: { row: SanityTableRow; header: boolean }) {
  const Cell = header ? "th" : "td";

  return (
    <tr>
      {row.cells.map((cell) => (
        <Cell key={cell._key} scope={header ? "col" : undefined}>
          <TableCellContent cell={cell} />
        </Cell>
      ))}
    </tr>
  );
}

export default function PortableTextTable({ value }: PortableTextTableProps) {
  if (!value?.rows?.length) {
    return null;
  }

  const headerRowCount = Math.max(
    0,
    Math.min(value.headerRows ?? 0, value.rows.length),
  );

  const headerRows = value.rows.slice(0, headerRowCount);
  const bodyRows = value.rows.slice(headerRowCount);

  return (
    <div className="my-10 overflow-x-auto rounded-card border border-border-default">
      <table className="w-full min-w-max border-collapse text-left">
        {headerRows.length > 0 && (
          <thead className="bg-bg-surface">
            {headerRows.map((row) => (
              <TableRow key={row._key} row={row} header />
            ))}
          </thead>
        )}

        {bodyRows.length > 0 && (
          <tbody>
            {bodyRows.map((row) => (
              <TableRow key={row._key} row={row} header={false} />
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
}
