const {
    CardElement,
    StripeProvider,
    Elements,
    injectStripe,
  } = ReactStripeElements
  
  class _CardForm extends React.Component {
    render() {
      return (
        <form onSubmit={() => this.props.stripe.createToken().then(payload => console.log(payload))}>
          <CardElement />

        </form>
      )
    }
  }
  const CardForm = injectStripe(_CardForm)
  