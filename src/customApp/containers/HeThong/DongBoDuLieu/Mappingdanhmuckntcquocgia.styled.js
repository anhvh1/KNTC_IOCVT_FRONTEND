import styled from "styled-components";

const Wrapper = styled.div`
    .filter-item {
        display: flex;
        align-items: center;
        .label {
            margin-right : 10px;
            /* flex-basis: 30%; */
        }
        .input {
            flex-basis: content;
        }
    }

`


export default Wrapper