// import React from "react";
import React from "react";
const WrapperStatiscial = originStatiscial => {
    class newStatiscial extends React.Component{
        render(){
            return <originStatiscial/>
        }
    }

    return newStatiscial
}

export {WrapperStatiscial}