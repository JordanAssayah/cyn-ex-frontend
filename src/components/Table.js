import React, { useMemo, useState } from 'react';
import { useTable, useGlobalFilter } from 'react-table';
import GlobalFilter from '../components/GlobalFilter'

export default function Table({ data }) {

  const columns = useMemo(() => [
    { Header: 'Date', accessor: 'date' },
    { Header: 'Name', accessor: 'name' },
    { Header: 'Address', accessor: 'address' }
  ], [])

  const memoizedData = useMemo(() => data, [data])
    
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    allColumns,
    preGlobalFilteredRows,
    setGlobalFilter,
    state,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data: memoizedData,
    useGlobalFilter
  })

  return (
    <>
        <ul className="list-inline">
            {allColumns.map(column => (
            <li key={column.id}>
                <label className="text-capitalize">
                    <input type="checkbox" {...column.getToggleHiddenProps()} />{' '}
                    {column.id}
                </label>
            </li>
            ))}
        </ul>
        <div className="mrgb">
            
        </div>
        <table {...getTableProps()} className="full-width">
            <thead>
                {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                    <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                    ))}
                </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row, i) => {
                prepareRow(row)
                return (
                    <tr {...row.getRowProps()}>
                    {row.cells.map(cell => {
                        return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    })}
                    </tr>
                )
                })}
            </tbody>
        </table>
    </>
    )
};