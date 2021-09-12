// Define a default UI for filtering
// took from https://react-table.tanstack.com/docs/examples/filtering
import React from 'react'
import { useAsyncDebounce } from 'react-table';
export default function GlobalFilter({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter,
  }) {
    const count = preGlobalFilteredRows.length
    const [value, setValue] = React.useState(globalFilter)
    const onChange = useAsyncDebounce(value => {
      setGlobalFilter(value || undefined)
    }, 200)
  
    return (
        <input
            className="field mrgr-"
            type="text"
            value={value || ""}
            onChange={e => {
                setValue(e.target.value);
                onChange(e.target.value);
            }}
            placeholder={`Search table`}
        />
    )
  }
