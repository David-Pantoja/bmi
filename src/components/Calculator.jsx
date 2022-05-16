//imports react related webframework tools
import React, { useState, useEffect } from 'react'
//imports web componenets
import { Card, Form } from 'react-bootstrap'
//imports styles
import style from './Calculator.module.css'

//Creates a component thhat contains the calculator functionality
function Calculator() {
    //gets sub components from Form
    const { Group, Control, Label } = Form

    //stores weight as a number (without units)
    const [weight, setWeight] = useState(null)
    //stores height as a number (without units)
    const [height, setHeight] = useState(null)
    //determines the units with the value true meaning the metricc system
    const [metric, setMetric] = useState(true)
    //Contains bmi as a string
    const [bmi, setBmi] = useState('')
    //Contains bmi class as a string
    const [message, setMessage] = useState('')
    //Contains change of weight needed to normalize as string
    const [healthyWeight, setHealthyWeight] = useState('')
    //Contains range of cacluated healthy weight as a string
    const [range, setRange] = useState('')
    //Contains bmi description as a string
    const [description, setDescription] = useState('')
    
    //function for calculating string state variables from weight and height
    const calBmi = (e) => {

        //simplifies document tag location
        const container = document.getElementById('container')
        //simplifies document tag location
        const messageEl = document.getElementById('message-el')
        
        //Stops calculation if either height or weight field is missing
        if(weight === null || height === null) {
            return;
        }
        
        //lower bound of healthy bmi value
        let minBmi = 18.5
        //upper bound of healthy bmi value
        let maxBmi = 25
        //initializes calculated variables
        let bmi, minWeightCal, minWeight, maxWeightCal, maxWeight, reqWeightCal, reqWeight, units
        //sets variables based of units system
        if(metric){
            //turns centimeter measurment to meters for metric conversion
            let heightInMeter = (height / 100).toFixed(2)

            //calculates bmi and weight ranges with metric units
            bmi = (weight /(heightInMeter * heightInMeter))
            minWeightCal = (minBmi * (heightInMeter * heightInMeter))
            minWeight = Math.ceil(minWeightCal * 100) / 100
            maxWeightCal = (maxBmi * (heightInMeter * heightInMeter))
            maxWeight = Math.floor(maxWeightCal * 100) / 100
            units = "kgs"
        }else{
            //calculates bmi and weight ranges with imperial units
            bmi = ((weight * 703)/(height*height))
            minWeightCal = (minBmi * (height * height))/703
            minWeight = Math.ceil(minWeightCal * 100) / 100
            maxWeightCal = (maxBmi * (height * height))/703
            maxWeight = Math.floor(maxWeightCal * 100) / 100
            units = "lbs"
        }
        //sets bmi text to bmi with 1 decimal
        setBmi(bmi.toFixed(1))
        //sets bmi range with calculated values
        setRange(`${minWeight} - ${maxWeight}`)

        //Sets information for underweight bmi calculation
        if(bmi >= 9 && bmi < 18.5) {
            setMessage('underweight')
            reqWeightCal = minWeight - weight
            reqWeight =  ((reqWeightCal * 100) / 100).toFixed(2)
            setHealthyWeight(`+${reqWeight} ${units} for healthy weight.`)
            setDescription("You should aim for 0.25-0.5% of weight gain per week or consult professionals for a modified weight gain plan. \n"
            + "Doing more than this alone can be unsustainable and harmful. \n" + 
            "In addition, this calculation may not be accurately representative if you have a high muscle mass, are a child, or are elderly.")
            container.className = ''
            container.classList.add('bg-warning')
            messageEl.className = ''
            messageEl.classList.add('text-warning')
        }
        //Sets information for healthy bmi calculation
        else if(bmi >= 18.5 && bmi <= 25) {
            setMessage('normal')
            setHealthyWeight(`Healthy weight.`)
            setDescription("This calculation may not be accurately representative if you have a high muscle mass, are a child, or are elderly.")
            container.className = ''
            container.classList.add('bg-success')
            messageEl.className = ''
            messageEl.classList.add('text-success')
        }
        //Sets information for overweight bmi calculation
        else if(bmi > 25 && bmi < 50) {
            if (bmi < 30){
                setMessage('overweight')
            }
            else {
                setMessage('obese')
            }
            reqWeightCal = weight - maxWeight
            reqWeight =  ((reqWeightCal * 100) / 100).toFixed(2)
            setHealthyWeight(`-${reqWeight} ${units} for healthy weight`)
            setDescription("You should aim for 1-2 pounds or 1 kilogram of weight loss per week or consult professionals for a modified weight loss plan. \n"
            + "Doing more than this alone can be unsustainable and harmful. \n" + 
            "In addition, this calculation may not be accurately representative if you have a high muscle mass, are a child, or are elderly.")
            container.className = ''
            container.classList.add('bg-danger')
            messageEl.className = ''
            messageEl.classList.add('text-danger')
        }

        //resets values if bmi calculation is not a reasonable level
        else {
            setBmi('')
            setMessage('')
            setHealthyWeight('')
            setRange('')
            setDescription('')
            container.className = ''
            container.classList.add('bg-primary')
            messageEl.className = ''
            messageEl.classList.add('text-primary')
        }
        
    }

    //Rerenders bmi calculations whenever weight, height, or metric state variables are updated
    useEffect(() => {
        calBmi();
      }, [weight, height, metric]);
    
    //renders html with respected variables
    return (
        <>  
            <Card style={{ width: "26rem" }} border='light' className='p-4 shadow'>
                <h2 className='text-center mb-3'>BMI Calculator</h2>
                <Form className='mb-3 px-3' id='bmiForm'>
                    <select onChange={(e) => setMetric(e.target.value === "true")} value={metric}>
                        <option value={true}>Metric Units</option>
                        <option value={false}>Imperial Units</option>
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
                    {bmi && <h3 className='mb-0'>BMI</h3>}
                    <h3 className={style.font}>{bmi}</h3>
                    <div className="lead">
                        <div id='message-el'>
                            <h5>{message}</h5>
                        </div>
                            <h6>{ healthyWeight }</h6>
                            <h6>{ range }</h6>
                            <h6>{ description }</h6>
                            {bmi && <a href="https://www.cdc.gov/healthyweight/assessing/bmi/adult_bmi/index.html">Read More</a>}
                    </div>
                </div>
            </Card>
        </>
    )
}

//exports function for encapsulation in App
export default Calculator