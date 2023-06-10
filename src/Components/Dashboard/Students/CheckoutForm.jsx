import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import useAxiosSecure from "../../../API/useAxiosSecure";
import { AuthContext } from "../../../Provider/AuthProvider";
import './checkoutForm.css'

// import {CardElement, Elements, useElements, useStripe} from '../../src';
const CheckoutForm = ({item, exactId}) => {
    let updateSeats = exactId.seats -1;
    console.log(updateSeats)
    let updateStudent = exactId.student +1  ;
    console.log(updateStudent)
    const stripe = useStripe();
    const elements = useElements();
    const {user} = useContext(AuthContext)
    const [cardError, setCardError] = useState('')
    const [clientSecret, setClientSectret] = useState('')
    const [axiosSecure] = useAxiosSecure();
    // let updateSeats = item.seats;
    useEffect(()=>{
      if(exactId.price > 0){
        axiosSecure.post('/create-payment-intent',{price: exactId?.price})
        .then(res=>{
           setClientSectret(res.data.clientSecret)
        })
      }
      
    },[exactId, axiosSecure])
  
    const handleSubmit = async (event) => {
      console.log(clientSecret)
      // Block native form submission.
      event.preventDefault();
  
      if (!stripe || !elements) {
        // Stripe.js has not loaded yet. Make sure to disable
        // form submission until Stripe.js has loaded.
        return;
      }
  
      // Get a reference to a mounted CardElement. Elements knows how
      // to find your CardElement because there can only ever be one of
      // each type of element.
      const card = elements.getElement(CardElement);
  
      if (card == null) {
        return;
      }
  
      // Use your card Element with other Stripe.js APIs
      const {error, paymentMethod} = await stripe.createPaymentMethod({
        type: 'card',
        card,
      });
  
      if (error) {
        console.log('[error]', error);
        setCardError(error.message)
      } else {
        console.log('[PaymentMethod]', paymentMethod);
      }
      const {paymentIntent, error: confirmError} = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: card,
            billing_details: {
              name: user?.displayName || 'unknown',
              email: user?.email || 'anonymous'
            },
          },
        },
      );
      if (confirmError) {
        console.log('[error]', confirmError);
        setCardError(confirmError.message)
      } else {
        console.log('[paymentIntent]', paymentIntent);
        if(paymentIntent.status === 'succeeded'){
          axiosSecure.post('/payment',{...exactId, transactionId: paymentIntent.id, date: new Date(),})
          .then(res =>{
            if(res.data.insertedId){
              axiosSecure.delete(`/delete/${exactId._id}`);
              axiosSecure.put(`/seatsUpdate/${exactId.menuItem}`,{seats: updateSeats, student: updateStudent})
            }
          });
        }
      }
    };
    
  
    return (
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
        {
          cardError && <p className="text-red-600">{cardError}</p>
        }
        <button type="submit" disabled={!stripe}>
          Pay
        </button>
      </form>
    );
  };

  export default CheckoutForm;