import React from 'react'
import { Card } from 'react-bootstrap'
import classes from "./about.module.css"
import Image from 'next/image'

function AboutPage() {
    return (
        <div className={classes.div}>
            <h2>About us</h2>
            <Card className={classes.card}>
                <Card.Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer gravida porta volutpat. Ut ut finibus nunc. Morbi id venenatis sem, condimentum suscipit metus. Duis vulputate pellentesque nibh sit amet sollicitudin. Donec gravida vehicula augue tristique venenatis. Curabitur eget dui et ante porta accumsan maximus id quam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Proin imperdiet a est vitae finibus. Curabitur finibus augue diam, non tempor lectus pellentesque vitae. Cras eu arcu metus. Mauris eros orci, faucibus elementum sodales vel, pulvinar at nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Proin malesuada interdum lacus, sed dapibus mauris dictum id. Sed vel nulla metus. Integer ornare et ipsum at aliquet. Sed volutpat maximus neque vitae luctus. Curabitur quam nibh, aliquam in dui eu, dictum lacinia dui. Nunc elementum arcu vel magna tincidunt vehicula. Mauris maximus interdum fermentum. Pellentesque malesuada ligula sit amet leo fermentum, at dapibus dui tristique. Nunc euismod nibh posuere ante consequat, sed tempor neque dignissim. Duis efficitur sed purus et bibendum. Vestibulum ac congue tellus. Morbi libero nisl, auctor vulputate fringilla vel, gravida ut purus. Vestibulum tortor arcu, convallis vel commodo ut, laoreet finibus eros. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </Card.Text>
            </Card>
            <Image width={450} height={650} src="/images/all.png" />
        </div>
    )
}

export default AboutPage
