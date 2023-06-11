import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../API/useAxiosSecure";
import { AuthContext } from "../../../Provider/AuthProvider";
import './checkoutForm.css'

// import {CardElement, Elements, useElements, useStripe} from '../../src';
const CheckoutForm = ({item, exactId, refetch}) => {
    let updateSeats = exactId.seats -1;
    const [loading, setLoading] = useState(false)
    let updateStudent = exactId.student +1  ;
    const stripe = useStripe();
    const elements = useElements();
    const {user} = useContext(AuthContext)
    const [cardError, setCardError] = useState('')
    const [clientSecret, setClientSectret] = useState('')
    const [axiosSecure] = useAxiosSecure();
    useEffect(()=>{
      if(exactId.price > 0){
        axiosSecure.post('/create-payment-intent',{price: exactId?.price})
        .then(res=>{
           setClientSectret(res.data.clientSecret)
        })
      }
      
    },[exactId, axiosSecure])
    const {data: instructors =[]} = useQuery(['users',exactId], async ()=>{
      const res = await axiosSecure.get(`/instructorsData/${exactId?.instructorEmail}`)
        return res.data;
  });

 

    const handleSubmit = async (event) => {
      console.log(clientSecret)
      setLoading(true)
      event.preventDefault();
    console.log(instructors?.student)
    let updateStudents = instructors.student  +1 ;
    console.log(updateStudents)
  
      if (!stripe || !elements) {
        return;
      }
      const card = elements.getElement(CardElement);
  
      if (card == null) {
        return;
      }
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
          if(instructors.student){
            axiosSecure.put(`/instructors/${exactId?.instructorEmail}`,{student: updateStudents})
          }
          else{
            console.log('hello')
            axiosSecure.put(`/instructors/${exactId?.instructorEmail}`,{student: 1})
          }
          axiosSecure.post('/payment',{...exactId, transactionId: paymentIntent.id, date: new Date(),})
         
          .then(res =>{
            if(res.data.insertedId){
              axiosSecure.delete(`/delete/${exactId._id}`);
              axiosSecure.put(`/seatsUpdate/${exactId.menuItem}`,{seats: updateSeats, student: updateStudent})
              setLoading(false)
              refetch()
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Your work has been saved',
                showConfirmButton: false,
                timer: 1500
              })
            }
          });
        }
      }
    };
  
    return (
      <form onSubmit={handleSubmit} className="my-5">
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
        <div className="text-center">
          {
            loading? <span className="loading loading-bars loading-lg text-red-600"></span> : <button type="submit" className="bg-sky-500 px-10 py-2 text-white text-center" disabled={!stripe}>
            Pay
          </button>
          }

        
        </div>
      </form>
    );
  };

  export default CheckoutForm;