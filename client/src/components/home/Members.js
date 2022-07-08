import React from "react"

function Members(props) {
  const {filteredMembers} = props
      return (
        <div> 
            {filteredMembers}
        </div>
    )
}

export default Members