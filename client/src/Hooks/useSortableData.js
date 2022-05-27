import { useState, useMemo } from "react"

const useSortableData = (items, config=null) => {
    const [sortConfig, setSortConfig] = useState(config)

    const sortedItems = useMemo(() => {
        let sortableItems = [...items]
        if (sortConfig !== null){
            sortableItems.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key])
                    return sortConfig.direction === 'ascending' ? -1 : 1
                else if (a[sortConfig.key] > b[sortConfig.key])
                    return sortConfig.direction === 'ascending' ? -1 : 1
                else
                    return 0
            })
        }
        return sortableItems
    }, [items, sortConfig])

    const requestSort = (key) => {
        let direction = 'ascending'
        if (sortConfig && sortConfig.key===key && sortConfig.direction==='ascending')
            direction = 'descending'
        setSortConfig({ key, direction })
    }

    return {
        items: sortedItems,
        requestSort
    }
}

export default useSortableData