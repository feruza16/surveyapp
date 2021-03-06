import React from 'react'
import styled from 'styled-components'
import sortIcon from './sort-icon.svg'

const BarSection = styled.div`
    display: flex;
    align-items: center;
    margin-top: 20px;

    @media screen and (max-width: 1060px)    {
        flex-wrap: wrap;
    }

    h4 {
        margin-right: 20px;
        white-space: nowrap;
    }
`

const Filters = styled.div`

    display: flex;
    font-weight: bold;
    justify-content: flex-start;
    font-size: .75em;

    .item {
        cursor: pointer;
        display: flex;

        img {
            margin-right: 4px;
        }
    }

    .sort {
        margin-right: 10px;
    }
`


const InnerTopBar = () => {

    return (
        
        <BarSection>
            <Filters>
                <div className="item sort">
                    <img alt="Сортировка" src={sortIcon}/><span>Сортировка</span>
                </div>
            </Filters>
        </BarSection>
    )
}

export default InnerTopBar