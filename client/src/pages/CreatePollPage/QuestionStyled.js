import styled from 'styled-components'


const QuestionStyled = styled.div`

    padding-bottom: 40px;

    .question_types {
        margin-top: 20px;
        display: flex;
        align-items: center;

        @media screen and (max-width: 540px) {
            flex-wrap: wrap;
        }

        p {
            margin-right: 15px;
            color: #5F76FF;
            font-weight: bold;
            white-space: nowrap;

            @media screen and (max-width: 540px) {
                margin-bottom: 15px;
            }

        }

        ul {
            display: flex;
            align-items: center;

            li {
                list-style: none;
                margin: 0 10px;

                button {
                    background-color: #8A9AF4;
                    color: white;
                    font-weight: bold;
                    padding: 5px 15px;
                    font-size: .85em;
                    border-radius: 10px;

                    &:focus {
                        background: #5F76FF;
                    }

                    &.active {
                        background-color: #5F76FF;
                    }
                }
            }

            @media screen and (max-width: 540px) {
                justify-content: center;
                width: 100%;

                li {
                    width: 40%;
                    margin: 0 5px;
                    margin-bottom: 20px;
                    text-align: center;



                    &:first-child {
                        margin-left: 0;
                    }

                    &:last-child {
                        margin-right: 0;
                    }
                }
            }   

            @media screen and (max-width: 370px) {
                flex-wrap: wrap;

                li {
                    text-align: center;
                    margin: 0;
                    margin-bottom: 20px;
                }
            }
        }
    }

    input.question_name {

        color: #6A6A6A;
        background: transparent;
        border: none;
        border-bottom: 1px solid #6A6A6A;
        display: block;
        width: 100%;
        font-size: 1.1em;
        padding-bottom: 10px;
        margin-bottom: 20px;
        margin-top: 20px;
        outline: none;
        &::placeholder {
            color: #6A6A6A;
        }
    }

    .options {
        
        ul {
            li {
                list-style: none;
                margin-bottom: 15px;

                input {
                    background-color: #8F9FF9;
                    border-radius: 10px;
                    color: white;
                    outline: none;
                    border: none;
                    font-weight: bold;
                    padding: 5px 20px;

                    &::placeholder {
                        color: white;
                        font-weight: bold;
                        text-align: center;
                    }
                }

                &.add {

                    button {
                        background-color: #5F76FF;
                        border-radius: 10px;
                        color: white;
                        outline: none;
                        border: none;
                        font-weight: bold;
                        padding: 5px 20px;
                    }
                }
            }
        }
    }
`

export default QuestionStyled