import React, { useState, useEffect } from 'react'
import { Card, Form } from 'react-bootstrap'
import style from './Calculator.module.css'

function Calculator() {
    const { Group, Control, Label } = Form

    const [weight, setWeight] = useState(null)
    const [height, setHeight] = useState(null)
    const [metric, setMetric] = useState(true)
    const [bmi, setBmi] = useState('')
    const [message, setMessage] = useState('')
    const [healthyWeight, setHealthyWeight] = useState('')
    const [range, setRange] = useState('')
    
    const calBmi = (e) => {

        const container = document.getElementById('container')
        const messageEl = document.getElementById('message-el')
        
        if(weight === null || height === null) {
            return;
        }

        let heightInMeter = (height / 100).toFixed(2)
        let bmi = (weight /(heightInMeter * heightInMeter))
        //min normal bmi value
        let minBmi = 18.5
        //max normal bmi value
        let maxBmi = 25
        // min weight required for underweight category for normal weight 
        let minWeightCal = (minBmi * (heightInMeter * heightInMeter))
        let minWeight = Math.ceil(minWeightCal * 100) / 100
        // min weight required for overweight category for normal weight
        let maxWeightCal = (maxBmi * (heightInMeter * heightInMeter))
        let maxWeight = Math.floor(maxWeightCal * 100) / 100
        let reqWeightCal = 0
        let reqWeight = 0
        setBmi(bmi.toFixed(1))
        setRange(`${minWeight} - ${maxWeight}`)

        // bmi check for underweight
        if(bmi >= 9 && bmi < 18.5) {
            if( bmi >= 9 && bmi < 15) {
                setMessage('very severely underweight')
            }
            else if (bmi >= 15 && bmi < 16) {
                setMessage('severely underweight')
            }
            else{
                setMessage('underweight')
            }
            reqWeightCal = minWeight - weight
            reqWeight =  ((reqWeightCal * 100) / 100).toFixed(2)
            setHealthyWeight(`+${reqWeight} kgs for healthy weight`)
            setRange(`${minWeight} - ${maxWeight}`)
            container.className = ''
            container.classList.add('bg-warning')
            messageEl.className = ''
            messageEl.classList.add('text-warning')
        }
        // bmi check for normal
        else if(bmi >= 18.5 && bmi <= 25) {
            setMessage('normal')
            setHealthyWeight(`Healthy weight`)
            container.className = ''
            container.classList.add('bg-success')
            messageEl.className = ''
            messageEl.classList.add('text-success')
        }
        // bmi check for overweight
        else if(bmi > 25 && bmi < 50) {
            if (bmi > 25 && bmi < 30){
                setMessage('overweight')
            } 
            else if(bmi >= 30 && bmi < 35) {
                setMessage('obese Class I')
            }
            else if(bmi >= 35 && bmi < 40) {
                setMessage('obese Class II')
            }
            else {
                setMessage('obese Class III')
            }
            reqWeightCal = weight - maxWeight
            reqWeight =  ((reqWeightCal * 100) / 100).toFixed(2)
            setHealthyWeight(`-${reqWeight} kgs for healthy weight`)
            setRange(`${minWeight} - ${maxWeight}`)
            container.className = ''
            container.classList.add('bg-danger')
            messageEl.className = ''
            messageEl.classList.add('text-danger')
        }
        else {
            setBmi('')
            setMessage('')
            setHealthyWeight('')
            setRange('')
            container.className = ''
            container.classList.add('bg-primary')
            messageEl.className = ''
            messageEl.classList.add('text-primary')
        }
        
    }

    useEffect(() => {
        calBmi();
      }, [weight, height]);
    useEffect(() => {
      console.log(metric)
    }, [metric]);
      
    return (
        <>  
            <Card style={{ width: "26rem" }} border='light' className='p-4 shadow'>
                <h2 className='text-center mb-3'>BMI Calculator</h2>
                <Form className='mb-3 px-3' id='bmiForm'>
                    <select onChange={(e) => setMetric(e.target.value === "true")} value={metric}>
                        <option value={true}>metric</option>
                        <option value={false}>imperial</option>
                    </select>
                    <Group className='mb-3'>
                        {metric && <Label>Weight (kg)</Label>}
                        {!metric && <Label>Weight (lbs)</Label>}
                        <Control value={weight} onChange={(e) => setWeight(e.target.value)} />
                    </Group>
                    <Group className='mb-4'>
                        {metric && <Label>Height (cm)</Label>}
                        {!metric && <Label>Height (in)</Label>}
                        <Control value={height} onChange={(e) => setHeight(e.target.value)} />
                    </Group>
                </Form>
                <div className='text-center'>
                    <h3 className='mb-0'>BMI</h3>
                    <h3 className={style.font}>{bmi}</h3>
                    <div className="lead">
                        <div id='message-el'>
                            <h5>{message}</h5>
                        </div>
                            <h6>{ healthyWeight }</h6>
                            <h6>{ range }</h6>
                    </div>
                </div>
            </Card>
        </>
    )
}

export default Calculator

/**
 * Work with correct metrics
 * Research BMI range
 */