import React from 'react'

import './studentItem.css'

const StudentItem = ({ studentData }) => {
    return (
        // creating a row in the table corresponding to each logged in student
        <tr> 
            <td className="table__roll">{ studentData.roll }</td>
            <td className="table__name">{ studentData.name }</td>
            <td className="table__hour">{ studentData.hour }</td>
            <td className="table__date">{ studentData.date }</td>
        </tr>
    )
}

export default StudentItem