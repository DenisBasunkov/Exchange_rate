'use client'

import { Button, Divider, Heading, HeadingGroup, Input, InputGroup, Message, Panel, SelectPicker, Text, useToaster } from "rsuite"
import data from "@/data/Valute.json";
import { useState } from "react";
import { useRef } from "react";

const MessageInfo = (type, text) => {
    return <Message showIcon type={type}>
        {text}
    </Message>
}

const ConverterForm = () => {

    const API_key = "842317b1ec4376ff1b0de562"
    const [Result, setResult] = useState("")
    const inputRef = useRef()
    const dataSelect = data.map(item => ({ label: `${item.code} - ${item.currency}`, value: item.code }))
    const [textConvert, setTextConvert] = useState("")
    const [ArrTextConvert, setArrTextConvert] = useState({
        Denomination: "",
        Current_currency: "",
        Cover_currency: ""
    })
    const toaster = useToaster()
    const [isLoading, setIsLoading] = useState(false)

    const ConvertValute = async () => {
        if (textConvert != (null || '')) {
            try {
                setIsLoading(true)
                const arr = textConvert.split("in")
                const coverValute = arr[1].trim();
                const add = arr[0].trim().split(" ")
                const denomination = add[0]
                const currentValute = add[add.length - 1];

                await fetch(`https://v6.exchangerate-api.com/v6/${API_key}/pair/${currentValute}/${coverValute}`,
                    { cache: 'no-store' })
                    .then(response => response.json())
                    .then(data => {
                        if (data.result === "success") {
                            const da = denomination * data.conversion_rate
                            setResult(`${denomination} ${currentValute} = ${da} ${coverValute}`)
                        } else {
                            toaster.push(MessageInfo("error", data["error-type"]), { placement: "bottomStart", duration: 2500 })
                        }
                    })
            } catch (err) {
                toaster.push(MessageInfo("error", err.message), { placement: "bottomStart", duration: 2500 })
            } finally {
                setIsLoading(false)
            }

        } else {
            toaster.push(MessageInfo("error", "Поле не должно быть пустым"), { placement: "bottomStart", duration: 2500 })
            inputRef.current.style.border = "1px solid red"
            inputRef.current.style.boxShadow = "0 0 3px 1px red"
        }
    }



    const onClier = async () => {
        setArrTextConvert({
            Denomination: "",
            Current_currency: "",
            Cover_currency: ""
        })
        setTextConvert(``)
    }

    const InText = () => {
        if (Object.values(ArrTextConvert).every(value => value === "")) {
            setTextConvert(``)
        } else {
            setTextConvert(`${ArrTextConvert.Denomination} ${ArrTextConvert.Current_currency} in ${ArrTextConvert.Cover_currency}`)
        }
    }

    const reversValute = () => {
        if (Object.values(ArrTextConvert).every(value => value === "")) {
            setTextConvert(``)
        } else {
            setArrTextConvert(item => ({ ...item, Current_currency: item.Cover_currency, Cover_currency: item.Current_currency }))
            setTextConvert(`${ArrTextConvert.Denomination} ${ArrTextConvert.Cover_currency} in ${ArrTextConvert.Current_currency}`)
        }
    }

    return <div style={{ width: "90%", gap: "10px", display: "flex", flexDirection: 'column' }}>
        <div className="Card">
            <HeadingGroup>
                <Heading level={1}>Конвертатор валют</Heading>
                <Text muted>Введите сумму и выберите валюты для конвертации в соответствующие поля.<br />
                    Или введите готовую команду как показано в примере "15 USD in RUB"
                </Text>
            </HeadingGroup>
            <Divider />
            <div className="formConverter">
                <Input
                    className="CustomInput"
                    value={ArrTextConvert.Denomination}
                    type="number"
                    onChange={(v) => { setArrTextConvert(item => ({ ...item, Denomination: v })) }}
                    onBlur={InText}
                    placeholder="Сумма" />
                <SelectPicker
                    className="CustomInput"
                    value={ArrTextConvert.Current_currency}
                    onBlur={InText}
                    onExit={InText}
                    onClean={() => setArrTextConvert(item => ({ ...item, Current_currency: "" }))}
                    onSelect={(v) => setArrTextConvert(item => ({ ...item, Current_currency: v }))}
                    placeholder="Текущая валюта" data={dataSelect} />
                <Button className="Button Reverse" style={{ fontWeight: "700", }}
                    onClick={reversValute}
                >⇆</Button>
                <SelectPicker
                    className="CustomInput"
                    value={ArrTextConvert.Cover_currency}
                    onBlur={InText}
                    onExit={InText}
                    onClean={() => setArrTextConvert(item => ({ ...item, Cover_currency: "" }))}
                    onSelect={(v) => setArrTextConvert(item => ({ ...item, Cover_currency: v }))}
                    placeholder="Валюта для конвертации" data={dataSelect} />
            </div>
            <Divider>или</Divider>
            <div className="formConverter" >
                <InputGroup className="CustomInput" ref={inputRef} onFocus={() => {
                    inputRef.current.style.border = "1px solid black"
                    inputRef.current.style.boxShadow = "none"
                }}>
                    <InputGroup.Button onClick={onClier} appearance="subtle" style={{ width: "35px" }}>❌</InputGroup.Button>
                    <Input
                        placeholder={`Пример ввода: "1 USD in RUB"`}
                        value={textConvert} onChange={setTextConvert} />
                </InputGroup>
                <Button loading={isLoading} className="Button" onClick={ConvertValute}>Конвертировать</Button>
            </div>
        </div>
        <div className="Card" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>

            <h3>Результат конвертации: </h3>
            <h3>{Result}</h3>

        </div>
    </div >
}

export default ConverterForm