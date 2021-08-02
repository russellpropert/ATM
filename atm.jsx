const ATMTransaction = ({onChange, isDeposit, transactionState}) => {
  const choice = ['Deposit', 'Withdraw'];
  return (
    <label className="label huge">
      <h3> {choice[Number(!isDeposit)]}</h3>
      <input type="number" value={transactionState} onChange={onChange} min={0}></input>
      <input type="submit" value="Submit"></input>
    </label>
  );
};

const Account = () => {
  const [transactionState, setTransactionState] = React.useState(0);
  const [totalState, setTotalState] = React.useState(0);
  const [isDeposit, setIsDeposit] = React.useState(true);
  const [overdraw, setOverdraw] = React.useState(false);

  let status = `Account Balance $${totalState}`;
  let overdrawWarning = ['', 'You don\'t have that much to withdraw.']
  console.log('Account Rendered');
  
  const handleChange = event => {
    const amount = Number(event.target.value);
    setTransactionState(
      amount >= 0 ? amount : 0
    );
    console.log(`handleChange ${event.target.value}`);
  };
  
  const handleSubmit = () => {
    if (!isDeposit && transactionState > totalState) {
      setOverdraw(true);
    } else {
      setOverdraw(false);
      setTotalState(
        isDeposit ? totalState + transactionState : totalState - transactionState
      );
    }
    setTransactionState(0);
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 id="total">{status}</h2>
      <button onClick={() => setIsDeposit(false)}>Withdraw</button>
      <button onClick={() => setIsDeposit(true)}>Deposit</button>
      <ATMTransaction onChange={handleChange} isDeposit={isDeposit} setTransactionState={transactionState}></ATMTransaction>
      <div style={{color: 'red'}}>{overdrawWarning[Number(overdraw)]}</div>
    </form>
  );
};

// ========================================
ReactDOM.render(<Account />, document.getElementById("root"));
