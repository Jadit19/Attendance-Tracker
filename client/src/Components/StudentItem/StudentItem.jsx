import React from 'react'

import './studentItem.css'

const StudentItem = ({ studentData }) => {
    return (
        <tr>
            <td className="table__name">{ studentData.name }</td>
            <td className="table__hour">{ studentData.hour }</td>
            <td className="table__date">{ studentData.date }</td>
        </tr>
    )
}

export default StudentItem