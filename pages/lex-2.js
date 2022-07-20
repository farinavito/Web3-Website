import 'bulma/css/bulma.css'
import contractLex from '../blockchain/webLex2'
import { useState, useEffect } from 'react'
import styles from '../styles/application.module.css'
import Head from 'next/head'
import Web3 from 'web3'
import Link from 'next/link'

const App = () => {
  //storing error message when there is an error for connecting to the metamask
  const [error, setError] = useState('')
  //storing the web3 instance
  const [web3, setWeb3] = useState(null)
  //storing the address of the person who connected their wallet
  const [address, setAddress] = useState(null)
  //storing the copy of the smart contract
  const [contractLex2, setcontractLex2] = useState(null)

  //storing the number of agreements the caller has as the receiver
  const [myNumReceiverAgreements, setMyNumReceiverAgreements] = useState('')
  //storing the ids of caller as the receiver
  const [myReceiverIds, setMyReceiverIds] = useState([])
  //storing error message when there is an error for calling getMyReceiverIds
  const [errorReceiverAgreements, setErrorReceiverAgreements] = useState('')
  //storing error message when there is an error for calling myReceiverAgreements
  const [errorReceiverIds, setErrorReceiverIds] = useState('')

  //storing the number of agreements the caller has as the sender
  const [myNumSenderAgreements, setMyNumSenderAgreements] = useState('')
  //storing error message when there is an error for calling getMySenderIds
  const [errorSenderAgreements, setErrorSenderAgreements] = useState('')
   //storing the ids of caller as the sender
   const [mySenderIds, setMySenderIds] = useState([]) 
   //storing error message when there is an error for calling mySenderAgreements
  const [errorSenderIds, setErrorSenderIds] = useState('')

  //storing the receiver's address 
  const [receiverAddress, setReceiverAddress] = useState('')
  //storing the committed amount 
  const [committedAmount, setCommittedAmount] = useState('')
  //storing the deadline
  const [agreementsDuration, setAgreementsDuration] = useState('')
  //storing error message when there is an error for calling createNewAgreement
  const [errorNewContract, setErrorNewContract] = useState('')

  //storing the agreement's id
  const [idSent, setIdSent] = useState('')
  //storing the amount sent
  const [amountSent, setAmountSent] = useState('')
  //storing error message when there is an error for calling sendPayment
  const [errorSendingPayment, setErrorSendingPayment] = useState('')

  //storing the id sent from the wasContractBreached
  const [idSent2, setIdSent2] = useState('')
  //storing the wasContractBreached return
  const [contractBreached, setContractBreached] = useState('')
  //storing error message when there is an error for calling wasContractBreached
  const [errorContractBreached, setErrorContractBreached] = useState('')

  //storing the caller's withdrawal amount as the receiver
  const [withdrawalAmountAsReceiver, setWithdrawalAmountAsReceiver] = useState('')
  //storing error message when there is an error for calling receiversWithdrawalAmount
  const [errorReceiversWithdrawalAmount, setErrorReceiversWithdrawalAmount] = useState('')
  //storing the caller's withdrawal amount as the sender
  const [withdrawalAmountAsSender, setWithdrawalAmountAsSender] = useState('')
  //storing error message when there is an error for calling receiversWithdrawalAmount
  const [errorSendersWithdrawalAmount, setErrorSendersWithdrawalAmount] = useState('')

  //storing error message when there is an error for calling withdrawReceiversAmount
  const [errorWithdrawReceiversAmount, setErrorWithdrawReceiversAmount] = useState('')
  //storing error message when there is an error for calling withdrawSendersAmount
  const [errorWithdrawSendersAmount, setErrorWithdrawSendersAmount] = useState('')


  //when the copy of the smart contract is avalaibla call the functions bellow
  useEffect(() => {
    if (contractLex2){
      getMyNumReceiverAgreements()
      getMyReceiverIds()
      getMyNumSenderAgreements()
      getMySenderIds()
      receiversWithdrawalAmount()
      sendersWithdrawalAmount()
    }
  }, [contractLex2])

  //storing the number of agreements the caller as the receiver has
  const getMyNumReceiverAgreements = async () => {
    try {
      //storing the number of contracts that the caller has as the receiver
      const _ids = await contractLex2.methods.getMyNumAgreementsReceiver().call({from: address})
      //setting the useState with the number of contracts that the caller has
      setMyNumReceiverAgreements(_ids)
    } catch(err){
      //retrieving the error that the requirements return
      setErrorReceiverAgreements(err.message.slice(20, 63))
      //setting the number of contracts that the caller has to zero
      setMyNumReceiverAgreements(0)
    }
  }

  //storing the caller's ids as the receiver
  const getMyReceiverIds = async () => {
    try {
      //settign the useState to an empty string
      setMyReceiverIds('')
      //looping over the number of the contracts that the caller has as the receiver
      for (let i = 0; i < myNumReceiverAgreements; i++) {
        //retrieving the contract's ids
        const newId = await contractVault.methods.myReceiverAgreements(address, i).call()
        //storing the ids in an array
        setMyReceiverIds(arr => [...arr, newId])
      }
    }
    catch(err) {
      setErrorReceiverIds(err.message)
    }
  }

  //storing the number of agreements the caller as the sender has
  const getMyNumSenderAgreements = async () => {
    try {
      //storing the number of contracts that the caller has as the sender
      const _ids = await contractLex2.methods.getMyNumAgreementsSender().call({from: address})
      //setting the useState with the number of contracts that the caller has
      setMyNumSenderAgreements(_ids)
    } catch(err){
      //retrieving the error that the requirements return
      setErrorSenderAgreements(err.message.slice(20, 62))
      //setting the number of contracts that the caller has to zero
      setMyNumSenderAgreements(0)
    }
  }

  //storing the caller's ids as the sender
  const getMySenderIds = async () => {
    try {
      //settign the useState to an empty string
      setMySenderIds('')
      //looping over the number of the contracts that the caller has as the sender
      for (let i = 0; i < myNumSenderAgreements; i++) {
        //retrieving the contract's ids
        const newId = await contractVault.methods.mySenderAgreements(address, i).call()
        //storing the ids in an array
        setMySenderIds(arr => [...arr, newId])
      }
    }
    catch(err) {
      setErrorSenderIds(err.message)
    }
  }

  //setting the input's variable of caller's receiver address from the createAgreement section 
  const updateReceiverAddress = event => {
    setReceiverAddress(event.target.value)
  }

  //setting the input's variable of caller's committed amount from the createAgreement section 
  const updateCommittedAmount = event => {
    setCommittedAmount(event.target.value)
  }

  //setting the input's variable of caller's agreement's duration from the createAgreement section 
  const updateHowLong = event => {
    setAgreementsDuration(event.target.value)
  }

  //check if the createNewAgreement's requirements aren't breached
  const checkRequirementsCreate = () => {
    try {
      //check if the user has inserted all inputs
      if(receiverAddress != '' && committedAmount != '' && agreementsDuration != ''){
        //check if the input address is valid (returns true)
        const addrs = web3.utils.isAddress(receiverAddress)
        if(addrs){
          //check if the agreement's deadline is not created in the past
          if(agreementsDuration > Math.floor(Date.now() / 1000)){
            return true
          } else {
            setErrorNewContract("Agreement's deadline is in the past")
            return false
          }
        } else {
          setErrorNewContract("The address inserted isn't correct")
          return false
        }
      } else {
        setErrorNewContract("Please enter all the info required")
        return false
      }
    } catch(err){
      //Error
      if (err.message == 'invalid BigNumber string (argument="value", value="", code=INVALID_ARGUMENT, version=bignumber/5.6.2)'){
        setErrorWithdraw("Please enter all the info required")
      } else {
        setErrorNewContract("Unable to connect to the smart contract")
      }
    }
  } 

  //creating a new agreement
  const createNewAgreement = async() => {
    try {
      //setting error handler to an empty string
      setErrorNewContract('')
      //storing the amount sent
      const qty = web3.utils.toWei('1', 'wei') * committedAmount
      //check that the requirements don't fail
      if(checkRequirementsCreate() == true){
        //calling createAgreement function
        await contractLex2.methods.createAgreement(receiverAddress, qty, agreementsDuration).send({
          from: address,
          value: qty
        //return success message to the user
        }).then(
          e => {
            if(e['status'] == true){
              setErrorNewContract("Transaction succeeded")
            }
          }
        )
      }
    } catch(err) {
      //TypeError
      if(err.message == "Cannot read properties of null (reading 'utils')"){
        setErrorNewContract("Please connect your wallet")
      //Error
      } else if (err.message == 'invalid BigNumber string (argument="value", value="", code=INVALID_ARGUMENT, version=bignumber/5.6.2)'){
        setErrorNewContract("Please enter all the info required")
      //undefined
      } else if (err.message == "MetaMask Tx Signature: User denied transaction signature."){
        setErrorNewContract("You have rejected the transaction")
      //Error
      } else {
        setErrorNewContract("Transaction failed")
      }
    }
  }

  //setting the input's variable of the caller's amount sent from the send payment section
  const updateAmountSent = event => {
    setAmountSent(event.target.value)
  }

  //setting the input's variable of the caller's id sent from the send payment section
  const updateIdSent = event => {
    setIdSent(event.target.value)
  }

  //check if the sendNewPayment's requirements aren't breached
  const checkRequirementsSend = async(_id) => {
    try {
      //storing the struct Agreement
      const ag_signee = await contractLex2.methods.exactAgreement(_id).call()
      //check if the signee is the same as the connected address
      if(ag_signee.signee == address){
        //check if the status is equal to Created
        if(ag_signee.status == "Created"){
          return true
        } else {
          setErrorSendingPayment("This agreement is already terminated")
        }
      } else {
        setErrorSendingPayment("You are not the signee of this contract")
      }
    } catch(err){
      //Error
      if (err.message == 'invalid BigNumber string (argument="value", value="", code=INVALID_ARGUMENT, version=bignumber/5.6.2)'){
        setErrorSendingPayment("Please enter all the info required")
      } else {
        setErrorSendingPayment("Unable to connect to the smart contract")
      }
    }
  } 

  //sending the payment
  const sendNewPayment = async() => {
    try {
      //setting error handler to an empty string
      setErrorSendingPayment('')
      //storing the amount sent
      const qty = web3.utils.toWei('1', 'wei') * amountSent
      //checking if the requirements don't fail
      if(checkRequirementsSend(idSent) == true){
        //calling sendPayment function
        await contractLex2.methods.sendPayment(idSent, qty).send({
          from: address,
          value: qty
        //returning success message to the user
        }).then(
          e => {
            if(e['status'] == true){
              setErrorSendingPayment("Transaction succeeded")
            }
          }
        )
      }
    } catch(err) {
      //TypeError
      if(err.message == "Cannot read properties of null (reading 'utils')"){
        setErrorSendingPayment("Please connect your wallet")
      //Error
      } else if (err.message == 'invalid BigNumber string (argument="value", value="", code=INVALID_ARGUMENT, version=bignumber/5.6.2)'){
        setErrorSendingPayment("Please enter all the info required")
      //undefined
      } else if (err.message == "MetaMask Tx Signature: User denied transaction signature."){
        setErrorSendingPayment("You have rejected the transaction")
      //Error
      } else {
        setErrorSendingPayment("Transaction failed")
      }
    }
  } 

  //setting the input's variable of the caller's id sent from the was contract breached section
  const updateIdSent2 = event => {
    setIdSent2(event.target.value)
  }

  //check if wasContractBreached's requirements aren't breached
  const checkRequirementsContractBreached = async(_id) => {
    try{
      //storing the struct Agreement
      const ag_signee = await contractLex2.methods.exactAgreement(_id).call()
      //check if the contract's status is Created
      if(ag_signee.status == "Created"){
        //check if the receiver is the same as the connected address
        if(ag_signee.receiver == address){
          return true
        } else {
          setErrorContractBreached("You aren't the contract's receiver")
        }
      } else {
        setErrorContractBreached("The agreement is already terminated")
      }
    } catch(err){
      //TypeError
      if(err.message == "Cannot read properties of null (reading 'methods')"){
        setErrorContractBreached("Please connect your wallet")
      //Error
      } else if (err.message == 'invalid BigNumber string (argument="value", value="", code=INVALID_ARGUMENT, version=bignumber/5.6.2)'){
        setErrorContractBreached("Please enter all the info required")
      //undefined
      } else if (err.message == "MetaMask Tx Signature: User denied transaction signature."){
        setErrorContractBreached("You have rejected the transaction")
      //Error
      } else {
        setErrorContractBreached("Unable to connect to the smart contract")
      }
    }
  }

  //checking if the agreement has been breached
  const wasNewContractBreached = async () => {
    try {
      //setting error handlers to an empty string
      setContractBreached('')
      setErrorContractBreached('')
      //check if the requirements don't fail
      if(checkRequirementsContractBreached(idSent2) == true){
        //calling wasContractBreached function
        const functionReturn = await contractLex2.methods.wasContractBreached(idSent2).call()
        //storing the function's return
        setContractBreached(functionReturn)
      } 
    } catch(err){
      //TypeError
      if(err.message == "Cannot read properties of null (reading 'methods')"){
        setErrorContractBreached("Please connect your wallet")
      //Error
      } else if (err.message == 'invalid BigNumber string (argument="value", value="", code=INVALID_ARGUMENT, version=bignumber/5.6.2)'){
        setErrorContractBreached("Please enter all the info required")
      //undefined
      } else if (err.message == "MetaMask Tx Signature: User denied transaction signature."){
        setErrorContractBreached("You have rejected the transaction")
      //Error
      } else {
        setErrorContractBreached("Transaction failed")
      }
    }
  }

  //retrieving the caller's withdrawal amount as the receiver
  const receiversWithdrawalAmount = async () => {
    try {
      //setting error handlers to an empty string
      setWithdrawalAmountAsReceiver('')
      setErrorReceiversWithdrawalAmount('')
      //calling getWithdrawalReceiver function
      const qty = await contractLex2.methods.getWithdrawalReceiver().call()
      //storing the function's return
      setWithdrawalAmountAsReceiver(qty)
    } catch(err){
      setErrorReceiversWithdrawalAmount(err.message)
    }
  }

  //withdrawing the caller's amount as the receiver
  const withdrawReceiversAmount = async () => {
    try {
      //calling withdrawAsTheReceiver function
      await contractLex2.methods.withdrawAsTheReceiver().send({
        from: address
      })
    } catch(err){
      if(err.message == "Cannot read properties of null (reading 'methods')" ){
        setErrorWithdrawReceiversAmount("Please connect your wallet")
      } else if (err.message == "MetaMask Tx Signature: User denied transaction signature."){

        setErrorWithdrawReceiversAmount("You have rejected the transaction")
      } else{
        setErrorWithdrawReceiversAmount(err.message)
      }
    }
  }

  //withdrawing the caller's amount as the sender
  const withdrawSendersAmount = async () => {
    try {
      //calling withdrawAsTheSignee function
      await contractLex2.methods.withdrawAsTheSignee().send({
        from: address
      })
    } catch(err){
      if(err.message == "Cannot read properties of null (reading 'methods')" ){
        setErrorWithdrawSendersAmount("Please connect your wallet")
      } else if (err.message == "MetaMask Tx Signature: User denied transaction signature."){
        setErrorWithdrawSendersAmount("You have rejected the transaction")
      } else{
        setErrorWithdrawSendersAmount(err.message)
      }
    }
  }

  //retrieving the caller's withdrawal amount as the sender
  const sendersWithdrawalAmount = async () => {
    try {
      //calling getWithdrawalSignee function
      const qty = await contractLex2.methods.getWithdrawalSignee().call()
      //storing the function's return
      setWithdrawalAmountAsSender(qty)
    } catch(err){
      setErrorSendersWithdrawalAmount(err.message)
    }
  }

  const connectWalletHandler = async () => {
    //checking if metamask is available
    if (typeof window !== "undefined" && typeof window.ethereum !== "undefined"){
      //metamask installed
      try {
        //request wallet connect - metamask pop up window
        await window.ethereum.request({ method: "eth_requestAccounts"})
        //set web3 instance
        web3 = new Web3(window.ethereum)
        setWeb3(web3)
        //list of all accounts
        const accounts = await web3.eth.getAccounts()
        //set the variable to the first account
        setAddress(accounts[0])
        //local copy of the smart contract
        const localContract = contractLex(web3)
        setcontractLex2(localContract)
        //set the error handler to empty
        setErrorWithdrawReceiversAmount('')
        //set the error handler to empty
        setErrorWithdrawSendersAmount('')
        //set the error handler for creating new agreeemnt to empty
        setErrorNewContract('')
        //set the error handler for sending new payment to empty
        setErrorSendingPayment('')
        //set the error handler for sending breaching new contract to empty
        setErrorContractBreached('')
      } catch(err) {
        setError(err.message)
      }    
    } else {
      //metamask not installed
      alert("Please install MetaMask")
    }
  }

  return (
      <div className={styles.main}>
          <Head>
              <title>Create Next App</title>
              <meta name="description" content="Generated by create next app" />
              <link rel="icon" href="/favicon.ico" />
          </Head>

          <nav className="navbar is-primary is-fixed-top has-background-black-bis">
              <div className="navbar-menu">
                  <div className="container">
                      <div className="navbar-brand">
                      <div className='navbar-item'></div>
                      <div className='navbar-item'></div>
                      <div className='navbar-item'></div>
                      <div className='navbar-item'></div>
                      <div className='navbar-item'>
                          <Link href='/'>
                              <a><h1>A web app</h1></a>
                          </Link>
                      </div> 
                      </div>
                  </div> 
              </div>
              
              <div className="navbar-end">
                  <div className='navbar-item'>
                      <Link href='/why'>
                          <a>Why</a>
                      </Link>
                  </div>
              </div>
              <div className="navbar-end">
                  <div className='navbar-item'>
                      <Link href='/how-it-works'>
                          <a>How it works</a>
                      </Link>
                  </div>
              </div>
              <div className="navbar-end">
                  <div className='navbar-item'>
                      <Link href='/use-cases'>
                          <a>Use cases</a>
                      </Link>
                  </div>
              </div>
              <div className="navbar-end">
                  <div className='navbar-item'>
                      <Link href='/statistic'>
                          <a>Statistic</a>
                      </Link>
                  </div>
              </div>
              <div className='navbar-end'>
                  <div className='navbar-item'>
                      <button onClick={connectWalletHandler} className="button ">Connect wallet</button>
                  </div>
              </div>
                   <div className='navbar-item'>
              </div>
          </nav>

          
          <section>
              <div className="container">
                  <p>Text</p>
              </div>
          </section>
          <section>
              <div className="container has-text-danger">
                  <p>{error}</p>
              </div>
          </section>

          <section className="hero has-background-black-bis is-fullheight pr-6">
              <div className="hero-body py-0 pr-6 mr-6">
                <div className="container has-text-centered mt-6 pr-6">
                  <div className="columns mt-6 pr-6">
                    <div id='sidebar' className="column py-0">
                      <p className=" has-background-black-bis pt-5 pb-3 mb-5 pr-6 has-text-primary">
                        <h2>Smart contracts</h2><br></br><br></br>
                        <p className="box has-background-black-bis pt-4 pb-3">
                          <div className='columns is-centered'>
                            <Link href="/lex-1">
                              <button className="button is-outlined py-2 px-6 is-size-6">Lex-1 </button>
                            </Link>
                          </div>
                        </p>
                        <p className="box has-background-black-bis pt-4 pb-3">
                          <div className='columns is-centered'>
                            <Link href="/lex-2">
                              <button className="button is-outlined py-2 px-6 is-size-6">Lex-2 </button>
                            </Link>
                          </div>
                        </p>
                        <p className="box has-background-black-bis pt-4 pb-3">
                          <div className='columns is-centered'>
                            <Link href="/vault">
                              <button className="button is-outlined py-2 px-6 is-size-6">Vault </button>
                            </Link>
                          </div>
                        </p>
                        <p className=" has-background-black-bis py-4 pr-6 is-size-6">
                          <br></br><br></br><br></br><br></br><br></br>
                        </p>
                        <p className=" has-background-black-bis py-4 pr-6 is-size-6">
                          <br></br><br></br><br></br><br></br><br></br>
                        </p>
                      </p>
                    </div>
                    <div className="column"></div>
                    <div className="column pt-4">
                      <p className="subtitle has-background-black-bis pt-6 pb-3 mb-3 has-text-primary">
                        CREATE AGREEMENT<br></br><br></br>
                        <p className="has-background-black-bis  py-4 is-size-6">
                          <br></br>
                        </p>
                        <input type="text" onChange={updateReceiverAddress} placeholder="Enter the receiver's address" className='has-background-primary input is-normal'></input>
                        <p className=" has-background-black-bis py-4 is-size-6">
                          <br></br>
                        </p>
                        <input type="number" min="1" onChange={updateCommittedAmount} placeholder="Enter the amount you committed" className='has-background-primary input is-normal'></input>
                        <p className=" has-background-black-bis py-4 is-size-6">
                          <br></br>
                        </p>
                        <input type="number" min="1" onChange={updateHowLong} placeholder="Enter the contract's deadline" className='has-background-primary input is-normal'></input>
                        <p className=" has-background-black-bis py-4 is-size-6">
                          <br></br>
                        </p>
                        <p>
                          {errorNewContract}
                        </p>
                        <br></br>
                        <p className="box has-background-black-bis pt-3 pb-3 mt-3">
                          <div className='columns is-centered'>
                            <Link href="">
                              <button onClick={createNewAgreement} className="button is-outlined py-2 px-6 is-size-6">Create </button>
                            </Link>
                          </div>
                        </p>
                      </p>
                    </div>
                    <div id='first'className="column pt-4">
                      <p className="subtitle has-background-black-bis pt-6 pb-3 mb-3 has-text-primary">
                        MY RECEIVER'S AGREEMENTS<br></br><br></br>
                        <p className=" has-background-black-bis py-4 is-size-6">
                          <br></br>
                        </p>
                        <p>
                          Number of agreements as the receiver: <br></br>{myNumReceiverAgreements}
                        </p>
                        <p>
                          Receiver's ids: {myReceiverIds}
                        </p>
                        <p>
                          {errorReceiverAgreements}
                          {errorReceiverIds}
                        </p>
                      </p>
                      <p className="subtitle has-background-black-bis pt-6 pb-3 mb-3 mt-6 has-text-primary">
                        WITHDRAW RECEIVER<br></br><br></br>
                        <p className=" has-background-black-bis py-4 is-size-6">
                          <br></br>
                        </p>
                        <p>
                          Current withdrawal amount: <br></br>{withdrawalAmountAsReceiver} weis
                        </p>
                        <p>
                          {errorReceiversWithdrawalAmount}
                          {errorWithdrawReceiversAmount}
                        </p>
                        <p className="box has-background-black-bis pt-4 pb-3 mt-6">
                          <div className='columns is-centered'>
                            <Link href="">
                              <button onClick={withdrawReceiversAmount} className="button is-outlined py-2 px-6 is-size-6">Withdraw </button>
                            </Link>
                          </div>
                        </p>
                      </p>
                      <p className="subtitle has-background-black-bis pt-6 pb-3 mb-3 mt-6 has-text-primary">
                        WAS CONTRACT BREACHED<br></br><br></br>
                        <p className=" has-background-black-bis py-4 is-size-6">
                          <br></br>
                        </p>
                        <input type="number" min="1" onChange={updateIdSent2} placeholder="Enter the agreement's id" className='has-background-primary input is-normal'></input>
                        <p className=" has-background-black-bis py-4 is-size-6">
                          <br></br>
                        </p>
                        <p>
                          {contractBreached}
                        </p>
                        <p>
                          {errorContractBreached}
                        </p>
                        <p className="box has-background-black-bis pt-4 pb-3 mt-6">
                          <div className='columns is-centered'>
                            <Link href="">
                              <button onClick={wasNewContractBreached} className="button is-outlined py-2 px-6 is-size-6">Check </button>
                            </Link>
                          </div>
                        </p>
                      </p>
                    </div>
                    <div className="column pt-4" >
                      <p className="subtitle has-background-black-bis pt-6 pb-3 mb-3 has-text-primary">
                        MY SENDER'S AGREEMENTS<br></br><br></br>
                        <p className=" has-background-black-bis py-4 is-size-6">
                          <br></br>
                        </p>
                        <p>
                          Number of agreements as the sender: <br></br>{myNumSenderAgreements}
                        </p>
                        <p>
                          Senders's ids: {mySenderIds}
                        </p>
                        <p>
                          {errorSenderAgreements}
                          {errorSenderIds}
                        </p>
                      </p>
                      <p className="subtitle has-background-black-bis pt-6 pb-3 mb-3 mt-6 has-text-primary">
                        WITHDRAW SENDER<br></br><br></br>
                        <p className="has-background-black-bis py-4 is-size-6">
                          <br></br>
                        </p>
                        <p>
                          Current withdrawal amount: <br></br>{withdrawalAmountAsSender} weis
                        </p>
                        <p>
                          {errorSendersWithdrawalAmount}
                          {errorWithdrawSendersAmount}
                        </p>
                        <p className="box has-background-black-bis pt-4 pb-3 mt-6">
                          <div className='columns is-centered'>
                            <Link href="">
                              <button onClick={withdrawSendersAmount} className="button is-outlined py-2 px-6 is-size-6">Withdraw </button>
                            </Link>
                          </div>
                        </p>
                      </p>
                      <p className="subtitle has-background-black-bis pt-6 pb-3 mb-3 mt-6 has-text-primary">
                        SEND PAYMENT<br></br><br></br>
                        <p className=" has-background-black-bis py-4 is-size-6">
                          <br></br>
                        </p>
                        <input type="number" min="1" onChange={updateIdSent} placeholder="Enter the agreement's id" className='has-background-primary input is-normal'></input>
                        <p className=" has-background-black-bis py-4 is-size-6">
                          <br></br>
                        </p>
                        <input type="number" min="1" onChange={updateAmountSent} placeholder="Enter the amount" className='has-background-primary input is-normal'></input>
                        <p className=" has-background-black-bis py-4 is-size-6">
                          <br></br>
                        </p>
                        <p>
                          {errorSendingPayment}
                        </p>
                        <p className="box has-background-black-bis pt-4 pb-3 mt-6">
                          <div className='columns is-centered'>
                            <Link href="">
                              <button onClick={sendNewPayment} className="button is-outlined py-2 px-6 is-size-6">Pay </button>
                            </Link>
                          </div>
                        </p>
                      </p>
                    </div>
                  </div>
                </div>
              </div>                         
          </section>

          <footer>
            <section className="hero is-small has-background-black-bis">
              <div className="hero-body">
              </div>
            </section>
          </footer>

      </div>
      
  )
}

export default App