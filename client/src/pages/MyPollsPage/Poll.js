import React, { useState } from 'react'
import styled from 'styled-components'
import PollTr from '../../elements/PollTr'
import noAvatarImg from '../../assets/imgs/no-avatar.png'
import threedots from './threedots-icon.svg'
import { editPollName } from '../../services/polls'
import Loader from 'react-loader-spinner'
import {  getPollStatsById } from '../../services/polls'



const PollTrCustom = styled(PollTr)`
    .edit {

        display: flex;
        align-content: center;
        width: 100%;

        input {
            border: none;
            padding: 5px;
            outline: none;
            background: transparent;
            border-bottom: 1px solid black;
            padding-bottom: 2px;
        }

        button {
            padding: 4px;
            margin-left: 10px;
            margin-top: 20px;
            background-color: #29CC97;
            color: white;
            font-weight: bold;
            border-radius: 10px;
        }
    }
`

const Poll = ({poll, notify, pollList, setPollList}) => {

    const [ submenuActive, setSubmenuActive] = useState(false)
    const [ editMode, setEditMode ] = useState(false)
    const [ newPollName, setNewPollName ] = useState('')
    const [ statsLoading, setStatsLoading ] = useState(false)

    const handleMouseLeave = () => {
        setSubmenuActive(false)
    }

    const getPollById = (id) => {
        let poll = pollList.find((poll) => poll.id === id)
        return poll
    }


    const handleEditPoll = () => {
        setEditMode(true)
    }

    const handleInvite = (id) => {

        let textField = document.createElement('textarea')
        textField.innerText = `${document.location.origin}/main/all-polls/${id}`
        document.body.appendChild(textField)
        textField.select()
        document.execCommand('copy')
        textField.remove()

        notify({
            heading: 'Ссылка скопированна',
            text: `${document.location.origin}/main/all-polls/${id}`,
            type: 'success'
        })
    }

    const handleGetStats = (id) => {
        setStatsLoading(true)
        notify('')

        getPollStatsById(id)
        .then((res) => {
            setStatsLoading(false)
            console.log(res)
        })
        .catch((err) => {
            console.log(err)
            setStatsLoading(false)

            notify({
                heading: 'Мало данных',
                type: 'error',
                text: 'Недостаточно данных для отображения статистики'
            })
        })
    }

    const handleDeactivate = (id) => {

        notify('')

        let data = {
            ...poll,
            active: !poll.active
        }

        editPollName(id, data)
        .then((res) => {
            setPollList(pollList.map(poll => poll.id !== id ? poll : data))
            console.log(res)
            setEditMode(false)
            let poll = pollList.find((poll) => poll.id === id)
            if(poll.active) {
                notify({
                    heading: 'Опрос деактивирован',
                    type: 'success',
                    text: 'Статус опроса сменен на не активный'
                })
            } else {
                notify({
                    heading: 'Опрос активирован',
                    type: 'success',
                    text: 'Статус опроса сменен на активный'
                })
            }

            
        })
        .catch((err) => {
            console.log(err)
            setEditMode(false)
            notify({
                heading: 'Что-то пошло нетак',
                type: 'error',
                text: 'Попробуйте еще раз'
            })

        })

    }

    const handleSubmit = (e, id) => {
        e.preventDefault()

        let poll = getPollById(id)
        
        if(newPollName !== '') {

            let data = {
                ...poll,
                title: newPollName
            }

            editPollName(id, data)
            .then((res) => {
                setPollList(pollList.map(poll => poll.id !== id ? poll : data))
                console.log(res)
                setEditMode(false)
                notify({
                    heading: 'Название обновлено',
                    type: 'success',
                    text: 'Название опроса сменено'
                })
                
            })
            .catch((err) => {
                console.log(err)
                setEditMode(false)
                notify({
                    heading: 'Что-то пошло нетак',
                    type: 'error',
                    text: 'Попробуйте еще раз'
                })

            })

        } else {
            notify({
                heading: 'Не оставляйте название опроса пустым!',
                type: 'error',
                text: ''
            })
        }
    }

    const parseDate = (stringDate) => {

        let date = new Date(stringDate)

        let month = date.getMonth()
        let day = date.getDate()
        let year = date.getFullYear()

        return day + '.' + month + '.' + year+','
    }   


    const parseTime = (time) => {
        let string = new Date(time).toLocaleTimeString("ru", {  
            hour: "numeric",  
            minute: "numeric",   
        });

        return string
    } 

    return (
        <PollTrCustom className={submenuActive ? 'active' : ''}>
            <td className="poll_details">
                <img src={noAvatarImg}/>
               
                {editMode ? (
                    <form onSubmit={(e) => handleSubmit(e, poll.id)} className="edit">
                        <input onChange={(e) => setNewPollName(e.target.value)} value={newPollName}/>
                        <button>Изменить</button>
                    </form>
                ) :  <p>{poll.title}</p>}
                
            
            </td>

            {/* <td className="user">{poll.publishedBy}</td> */}

            <td className="create_dates">
                <div className="create_date">{parseDate(poll.created)}</div>
                <div className="create_time">{parseTime(poll.created)}</div>
            </td>

            {/* <td>
                <div className="rating">{poll.rating}</div>
            </td> */}

            <td className="submenu" onMouseLeave={handleMouseLeave} >

                <div className="toggle_btn" onClick={() => setSubmenuActive(!submenuActive)}>
                    <img src={threedots}/>
                </div>

                <div className="menu_content">
                    <ul>
                        <li>
                            {editMode ? (<button onClick={() => setEditMode(false)}>Отмена</button>) 
                            : (<button onClick={(e) => {setNewPollName(poll.title); handleEditPoll(e)}}>Редактировать</button>)}
                        </li>
                        <li><button onClick={() => handleDeactivate(poll.id)}>{poll.active ? 'Деактивировать' : 'Активировать'}</button></li>
                        <li><button onClick={() => handleInvite(poll.id)}>Поделиться</button></li>
                        {/* <li><button onClick={() => handleGetStats(poll.id)}>
                            {statsLoading ? (<><Loader color="#fff" type="Audio" height={13} width={128}/></>) : <p style={{whiteSpace: 'nowrap'}}>Экспорт статистики</p>}    
                        </button></li> */}
                    </ul>
                </div>
            </td>


        </PollTrCustom>
    )
}

export default Poll