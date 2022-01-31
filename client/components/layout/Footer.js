import Link from 'next/link'
import React from 'react'
import classes from "./Footer.module.css"

function Footer() {
    return (
      <>
    <hr className={classes.hrFooter} />
    <footer className={classes.siteFooter}>
      <div>
        <div className={classes.footerDiv}>

          <div className={classes.footerDiv1}>
            <h6>Customer service</h6>
            <ul className={classes.footerLinks}>
            <li>
                <Link href="/help/contact">Contact us</Link>
              </li>
              <li>
                <Link href="/help/shipping-policy">Shipping</Link>
              </li>
            </ul>
            <ul className={classes.footerLinks}>
              <li>
                <Link href="/help/faq">FAQ</Link>
              </li>
            </ul>
          </div>

          <div className={classes.footerDiv1}>
            <h6>Our story</h6>
            <ul className={classes.footerLinks}>
              <li>
                <Link href="/help/about">About Us</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <hr />
      <div>
        <div>
          <div className={classes.copyrightText}>
            <p>
              Copyright &copy; 2021 All Rights Reserved by
              <a href="/help/about"> PokeBallz </a>.
            </p>
          </div>
        </div>
      </div>
    </footer>
    </>
  )
}


export default Footer
