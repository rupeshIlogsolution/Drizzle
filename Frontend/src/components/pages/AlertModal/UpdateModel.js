import React from 'react'
import { MdDangerous } from 'react-icons/md';

export default function UpdateModel() {

    const cut = () => {
        document.getElementById("updateModal").style.display = "none"
    }

    return (
        <div id="updateModal" className="alert alert-danger alert-dismissible fade show my-0" role="alert">
            <MdDangerous style={{ fontSize: "26px", marginRight: "5px" }} />
            <strong>Hey User!</strong> Your plan has Expired. Upgrade your plan immediately to continue
            <button onClick={cut} style={{ margin: "-4px 0 0 0" }} type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    )
}
