import styled from 'styled-components'


const FormStyled = styled.form`
    input.poll_name {
        color: #353535;
        background: transparent;
        border: none;
        border-bottom: 1px solid #6A6A6A;
        display: block;
        width: 100%;
        font-size: 1.4em;
        padding-bottom: 5px;
        margin-bottom: 20px;
        outline: none;

        &::placeholder {
            color: #6A6A6A;
        }
    }

    textarea.poll_description {
        font-family: inherit;
        color: #6A6A6A;
        border: none;
        background-color: #DEDEDE;
        border-radius: 10px;
        padding: 10px;
        width: 100%;
        font-size: .9em;
        outline: none;
        max-width: 100%;
        resize: none;
    }

    .question_numbers {

        position: absolute;
        bottom: 30px;
        left: 60px;
        width: 100%;

        @media screen and (max-width: 1000px){
            bottom: 80px;
            left: 20px;
        }

        ul {
            max-width: 100%;
            overflow-x: scroll;
            margin-right: 115px;
            height: 45px;
            display: flex;
            margin-right: 480px;


            @media screen and (max-width: 1000px) { 
                margin-right: 40px;
            }

            div.number_container {

                position: relative;
                display: flex;
                align-items: flex-end;
                margin-right: 13px;

                
                button.delete_question {
                        position: absolute;
                        top: 0px;
                        right: -7px;
                        width: 20px;
                        height: 20px;
                        color: white;
                        z-index: 999;
                        background-color: white;
                        border-radius: 50%;
                        text-align: center;
                        display: none;

                        &.active {
                            display: flex;
                            flex-wrap: wrap;
                            justify-content: center;
                            align-items: center;

                            &:focus {
                                background-color: grey;

                                &::before, &::after {
                                    background-color: white;
                                }
                            }
                        }   

                        &::before, &::after {
                            content: '';
                            position: absolute;
                            left: 9.5px;
                            height: 14px;
                            width: 1px;
                            background-color: black;
                        }

                        &::before {
                            transform: rotate(45deg);
                        }

                        &::after {
                            transform: rotate(-45deg);
                        }

                    }
            }

            li {
                cursor: pointer;
                list-style: none;
                background-color: rgba(95, 118, 255, 0.66);
                font-weight: bold;
                border-radius: 10px;
                position: relative;
                max-width: 35px;
                max-height: 35px;


    

                &.active {
                    background-color: #5F76FF;
                }

                button {
                    background-color: transparent;
                    color: white;
                    font-weight: bold;
                    font-size: 1em;
                    width: 35px;
                    min-width: 35px;
                    max-width: 35px;
                    min-height: 35px;
                    max-height: 35px;
                    height: 35px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border-radius: 10px;
                    color: white;


                    &:focus {
                        background: #5F76FF;
                    }

                }
            }
        }
    }

    .save_buttons {
        position: absolute;
        bottom: 30px;
        right: 60px;

        @media screen and (max-width: 1000px){
            bottom: 12px;
            right: 20px;
        }


        @media screen and (max-width: 390px) {
            bottom: 0px;
            margin-left: 20px;
            height: 80px;
            display: flex;
            align-items: center;

            button {
                margin: 10px 0;
            }
        }   


        button {
            color: white;
            border: none;
            border-radius: 10px;
            padding: 7px 2px;
            font-weight: bold;
            font-size: .85em;

            &.save_local {
                background-color: #ffc107;
                margin-right: 10px;
            }

            &.save {
                background-color: #29CC97;

            &:disabled {
                background-color: grey;
                min-width: 100px;
                cursor: not-allowed;
            }

            }

            &.reset {
                background-color: #f44336;
                margin-right: 10px;

            }
        }

    }

`

export default FormStyled