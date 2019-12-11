import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import InnerTopBar from '../../components/InnerTopBar/InnerTopBar'
import MainContainer from '../../elements/MainContainer'
import profileImg from '../../assets/imgs/demo-profile-img.jpg'
import threedots from './threedots-icon.svg'

import { connect } from 'react-redux'
import { changePage } from '../../reducers/currentPage'

import PollsContainer from '../../elements/PollsContainer'
import PollTr from '../../elements/PollTr'

import { getMyPollList } from '../../services/polls'

const PollsContainerCustom = styled(PollsContainer)`

    @media screen and (max-width: 820px) {
        td:nth-of-type(2):before { content: "Дата: " ; }
        td:nth-of-type(3):before { content: ""; }
        td:nth-of-type(4):before { content: ": "; }


        td:nth-of-type(3) { 
            order: -1;
            width: 20%;

            .toggle_btn {
                margin-left: auto !important;
            }
        }

        td.poll_details {
            width: 79%;
            order: -2;
        }

        td.create_dates {
            width: 100%;
            display: inline-block;

            div {
                display: inline-block;

                &.create_date {
                    margin-right: 10px;
                }
            }
        }

        td:before { 
            display: inline-block;
            white-space: nowrap;
            font-weight: bold;
            margin-right: 15px;
            margin-bottom: 0;
        }
    }

`

const Poll = ({children }) => {

    const [ submenuActive, setSubmenuActive] = useState(false)
    let menuActive = submenuActive ? 'active' : ''

    const handleMouseLeave = () => {
        setSubmenuActive(false)
    }

    
    return (
        <PollTr className={menuActive}>

            {children}
            
            <td className="submenu" onMouseLeave={handleMouseLeave} >

                <div className="toggle_btn" onClick={() => setSubmenuActive(!submenuActive)}>
                    <img src={threedots}/>
                </div>

                <div className="menu_content">
                    <ul>
                        <li><Link>Редактировать</Link></li>
                        <li><Link>Деактивировать</Link></li>
                        <li><Link>Пригласить</Link></li>
                        <li><Link>Экспорт статистики</Link></li>
                    </ul>
                </div>
            </td>
        </PollTr>
    )
}

const MyPollsPage = (props) => {

    const [ pollList, setPollList ] = useState([])
    console.log(pollList)

    useEffect(() => {
        getMyPollList().then((data) => {
            setPollList(data)
        })
    }, [])


    useEffect(() => {
        props.changePage('Мои опросы')

        return () => {
            props.changePage('')
        }
    }, [])
    

    return (
        <MainContainer>
            <InnerTopBar/>

            <PollsContainerCustom >
                <thead>
                    <tr>
                        <th>Детали опроса</th>
                        {/* <th>Имя пользователя</th> */}
                        <th>Дата</th>
                        {/* <th>Рейтинг</th> */}
                    </tr>
                </thead>
 

                <tbody>
                    {pollList.map(poll => 

                    <Poll key={poll.id} id={poll.id}>

                        <td className="poll_details">
                            <img src={profileImg}/>
                            <p>{poll.title}</p>
                        </td>

                        {/* <td className="user">{poll.publishedBy}</td> */}

                        <td className="create_dates">
                            <div className="create_date">{poll.createdDate}</div>
                            <div className="create_time">{poll.createdTime}</div>
                        </td>

                        {/* <td>
                            <div className="rating">{poll.rating}</div>
                        </td> */}
                    </Poll>)}
                </tbody>

            </PollsContainerCustom>
            
        </MainContainer>
    )
}



export default connect(null, {changePage})(MyPollsPage)