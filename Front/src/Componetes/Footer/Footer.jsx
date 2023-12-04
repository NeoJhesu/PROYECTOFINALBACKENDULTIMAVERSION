import React from 'react'
import "./footer.css"

const Footer = () => {
    return (
        <div>
            <footer>
                <div className='pieDePagina noSe' >
                    <h2>Constructor</h2>
                    <p>12 Water St. Vacouver, <br /> BC
                        V6B 132 United States</p>
                </div>
                <div className='divicion'>
                    <div className='pieDePagina separacion' >
                        <p>Corporate sales</p>
                        <p>Feedback</p>
                        <p>Jobs</p>
                        <p>News</p>
                        <p>Sales Rules</p>
                        <p>For partners</p>
                    </div>
                    <div className='pieDePagina separacion' >
                        <p>Bonus program</p>
                        <p>Gift Сards</p>
                        <p>Bill Payment Verification</p>
                        <p>Loans</p>
                        <p>Delivery</p>
                        <p>Service centers</p>
                    </div>
                    <div className='pieDePagina separacion ' >
                        <p>How to place an order</p>
                        <p>Ways of payment</p>
                        <p>Exchange and return of goods</p>
                        <p>Warranty service</p>
                        <p>Order status</p>
                        <p>Knowledge base</p>
                    </div>
                </div>
                <div className='pieDePagina noSe' >
                    <p>2030 Comapny. All Rights Reserved.</p>
                    <div>
                        <p>Terms & Conditions</p>
                        <p>Privacy Policy</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Footer