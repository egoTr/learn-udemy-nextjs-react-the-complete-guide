// dependences
import { useRef } from 'react';
import { useRouter } from 'next/router';

import Hr from './hr';

const monthNums = ['all', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const monthWords = ['All months', 'January', "February", 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// styles
import styled from 'styled-components';
const SearchDiv = styled.div`
    display: flex;
    align-items: center;
    
    & * {
        margin-right: 10px;
    }

    & button {
        padding: 5px 10px;
    }
`;

export default function Search({ years }) {
    const refYear = useRef();
    const refMonth = useRef();
    const history = useRouter();

    function search() {
        let year = refYear.current.value;

        let month = refMonth.current.value;
        if (month.toString() === '0')
            month = 'all';

        history.push(`/events/${year}/${month}`);
    }

    if (!years)
        return <>
            <p>Loading filter...</p>
            <Hr />
        </>;

    return <>
        <SearchDiv>
            <p>Choose year:</p>
            <select ref={refYear}>
                {years.map((year, i) => <option key={i} value={year}>{year}</option>)}
            </select>

            <p>Choose month:</p>
            <select ref={refMonth}>
                {monthWords.map((month, i) => <option key={i} value={monthNums[i]}>{month}</option>)}
            </select>

            <button className="btn-secondary" onClick={search}>Filter events</button>
        </SearchDiv>

        <Hr />
    </>
}