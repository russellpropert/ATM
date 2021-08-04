const ATMSelect = ({setScreen, setIsDeposit}) => {
  return (
    <>
      <h3>Welcome</h3>
      <h4>Choose a Transaction</h4>
      <button onClick={() => {setScreen('transaction'); setIsDeposit(false);}}>Withdraw</button>
      <button onClick={() => {setScreen('transaction'); setIsDeposit(true);}}>Deposit</button>
      <button onClick={() => setScreen('balance')}>Balance</button>
    </>
  );
}

const ATMTransaction = ({choice, onChange, onTransaction, isDeposit, transactionState, onBack, overdraw, overdrawWarning}) => {
  return (
    <>
      <h3>{choice[Number(!isDeposit)]} Amount</h3>
      <input type="number" value={transactionState} onChange={onChange} min={0}></input>
      <button onClick={onTransaction}>Submit</button>
      <button onClick={onBack}>Back</button>
      <div className="withdraw-error">{overdrawWarning[Number(overdraw)]}</div>
    </>
  );
}

const ATMBalance = ({onBack, balance}) => {
  return (
    <>
      <h3>Your Account Balance Is</h3>
      <h3>${balance}</h3>
      <button onClick={onBack}>Back</button>
    </>
  );
}

const ATMSuccess = ({choice, isDeposit, setScreen}) => {
  setTimeout(
    () => {setScreen('select')}, 3500);
  return (
    <>
      <h3>Your {choice[Number(!isDeposit)]}</h3>
      <h3>Was Successful</h3><br />
      <h3>Thank You For</h3>
      <h3>Using Our ATM</h3>
    </>
  );
}

const Account = () => {
  const [screen, setScreen] = React.useState('select');
  const [transactionState, setTransactionState] = React.useState(0);
  const [totalState, setTotalState] = React.useState(0);
  const [isDeposit, setIsDeposit] = React.useState(true);
  const [overdraw, setOverdraw] = React.useState(false);

  const overdrawWarning = ['', 'You don\'t have that much to withdraw.']
  const choice = ['Deposit', 'Withdraw'];
  console.log('Account Rendered');
  
  const handleChange = event => {
    const amount = Number(event.target.value);
    setTransactionState(amount);
    console.log(`handleChange ${amount}`);
  };

  const handleBack = () => {
    setScreen('select');
    setOverdraw(false);
  }
  
  const handleTransaction = () => {
    if (!isDeposit && transactionState > totalState) {
      setOverdraw(true);
      return;
    } else {
      setOverdraw(false);
      setTotalState(
        isDeposit ? totalState + transactionState : totalState - transactionState
      );
    }
    setTransactionState(0);
    setScreen('success');
    event.preventDefault();

  };

  return (
    <>
      {screen === 'select' &&
        <ATMSelect
          setScreen={setScreen}
          setIsDeposit={setIsDeposit}
        ></ATMSelect>
      }

      {screen === 'transaction' &&
        <>
          <ATMTransaction 
            choice={choice}
            onChange={handleChange}
            onTransaction={handleTransaction}
            isDeposit={isDeposit} setTransactionState={transactionState}
            onBack={handleBack}
            overdraw={overdraw}
            overdrawWarning={overdrawWarning}
          ></ATMTransaction>
        </>
      }

      {screen === 'balance' && 
        <ATMBalance onBack={handleBack} balance={totalState}></ATMBalance>
      }

      {screen === 'success' && 
        <ATMSuccess choice={choice} isDeposit={isDeposit} setScreen={setScreen}></ATMSuccess>
      }
    </>
  );
};

// ========================================
ReactDOM.render(<Account />, document.getElementById("root"));
