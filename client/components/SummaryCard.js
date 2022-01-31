import Image from 'next/image'
import React from 'react'
import { Card } from 'react-bootstrap'
import classes from "./SummaryCard.module.css"

function SummaryCard(props) {
    return (
        <Card className={classes.card}>
            <Image className={classes.img} width={64} height={89} src={props.item.image} />
            <h2 className={classes.text}>{props.item.name}</h2>
        </Card>
    )
}

export default SummaryCard
