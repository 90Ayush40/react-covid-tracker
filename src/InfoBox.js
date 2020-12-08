import React from 'react';
import './InfoBox.css';
import { Card, Typography, CardContent} from '@material-ui/core';

function InfoBox({ title, casses, active, isRed, total, ...props}) {
    return (

            <Card
            onClick={props.onClick}
            className={`infoBox ${active && "infoBox--selected"} ${
                isRed && "infoBox--red"
              }`}>
                <CardContent>
                    {/* title */}

                    <Typography className='infoBox__title' color='textSecondary'>
                        {title}
                    </Typography>

                    {/* number of casses */}
                    <h2 className={`infoBox__cases ${!isRed && "infoBox__cases--green"}`}>
                        {casses}
                    </h2>

                    {/* total */}

                    <Typography className='infoBox__total' color='textSecondary'>
                        {total} Total
                    </Typography>


                </CardContent>
            </Card>
    )
}

export default InfoBox
