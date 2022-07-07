import 'bulma/css/bulma.css'
import contractLex  from '../blockchain/webLex1'
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
    const [contractLex1, setContractLex1] = useState(null)

    //storing error message when there is an error for calling getMyReceiverIds
    const [errorReceiverIds, setErrorReceiverIds] = useState('')
    //storing the number of agreements the caller has as the receiver
    const [myReceiverIds, setMyReceiverIds] = useState('')

    //storing the receiver's address 
    const [receiverAddress, setReceiverAddress] = useState('')
    //storing the committed amount 
    const [committedAmount, setCommittedAmount] = useState('')
    //storing the every time unit
    const [everyTimeUnit, setEveryTimeUnit] = useState('')
    //storing the deadline
    const [agreementsDuration, setAgreementsDuration] = useState('')
    //storing the start agreement
    const [startAgreement, setStartAgreement] = useState('')
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


    //when the copy of the smart contract is avalaibla call the functions bellow
    useEffect(() => {
      if (contractLex1) getMyReceiverIds()
    }, [contractLex1])

    //storing the number of agreements the caller as the receiver has
    const getMyReceiverIds = async () => {
      try {
        const _ids = await contractLex1.methods.getMyNumAgreementsReceiver().call({from: address})
        setMyReceiverIds(_ids)
      } catch(err){
        setErrorReceiverIds(err.message)
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

    //setting the input's variable of caller's every time unit from the createAgreement section
    const updateEveryTimeUnit = event => {
      setEveryTimeUnit(event.target.value)
    }

    //setting the input's variable of caller's agreement's duration from the createAgreement section 
    const updateHowLong = event => {
      setAgreementsDuration(event.target.value)
    }

    //setting the input's variable of the caller's start agreement from the createAgreement section
    const updateStartAgreement = event => {
      setStartAgreement(event.target.value)
    }

    //creating a new agreement
    const createNewAgreement = async () => {
      try {
        await contractLex1.methods.createAgreement(receiverAddress, committedAmount, everyTimeUnit, agreementsDuration, startAgreement).send({
          from: address,
          value: web3.utils.toWei('1', 'wei') * committedAmount
        })
      } catch(err) {
        setErrorNewContract(err.message)
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

    //sending the payment
    const sendNewPayment = async () => {
      try {
        await contractLex1.methods.sendPayment(idSent).send({
          from: address,
          value: web3.utils.toWei('1', 'wei') * amountSent
        })
      } catch(err) {
        setErrorSendingPayment(err.message)
      }
    } 

    //setting the input's variable of the caller's id sent from the was contract breached section
    const updateIdSent2 = event => {
      setIdSent2(event.targte.value)
    }

    //checking if the agreement has been breached
    const wasNewContractBreached = async () => {
      try {
        const functionReturn = await contractLex1.methods.wasContractBreached(idSent2).call()
        setContractBreached(functionReturn)
      } catch(err){
        setErrorContractBreached(err.message)
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
          setContractLex1(localContract)
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
                          <input type="number" onChange={updateCommittedAmount} placeholder="Enter the amount you committed" className='has-background-primary input is-normal'></input>
                          <p className=" has-background-black-bis py-4 is-size-6">
                            <br></br>
                          </p>
                          <input type="number" onChange={updateEveryTimeUnit} placeholder="Enter the payment's time duration" className='has-background-primary input is-normal'></input>
                          <p className=" has-background-black-bis py-4 is-size-6">
                            <br></br>
                          </p>
                          <input type="number" onChange={updateHowLong} placeholder="Enter how long the contracts needs to last" className='has-background-primary input is-normal'></input>
                          <p className=" has-background-black-bis py-4 is-size-6">
                            <br></br>
                          </p>
                          <input type="number" onChange={updateStartAgreement} placeholder="Enter when the contract starts" className='has-background-primary input is-normal'></input>
                          <p className=" has-background-black-bis py-4 is-size-6">
                            <br></br>
                          </p>
                          <p>
                            {errorNewContract}
                          </p>
                          <p className="box has-background-black-bis pt-3 pb-3 mt-3">
                            <div className='columns is-centered'>
                              <Link href="">
                                <button onClick={createNewAgreement} className="button is-outlined py-2 px-6 is-size-6">Create </button>
                              </Link>
                            </div>
                          </p>
                        </p>
                        <p className="subtitle has-background-black-bis pt-6 pb-3 mb-3 mt-6 has-text-primary">
                          SEND PAYMENT<br></br><br></br>
                          <p className=" has-background-black-bis py-4 is-size-6">
                            <br></br>
                          </p>
                          <input type="number" onChange={updateIdSent} placeholder="Enter the agreement's id" className='has-background-primary input is-normal'></input>
                          <p className=" has-background-black-bis py-4 is-size-6">
                            <br></br>
                          </p>
                          <input type="number" onChange={updateAmountSent} placeholder="Enter the amount" className='has-background-primary input is-normal'></input>
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
                        <p className="subtitle has-background-black-bis pt-6 pb-3 mb-3 mt-6 has-text-primary">
                          WAS CONTRACT BREACHED<br></br><br></br>
                          <p className=" has-background-black-bis py-4 is-size-6">
                            <br></br>
                          </p>
                          <input type="number" onChange={updateIdSent2} placeholder="Enter the agreement's id" className='has-background-primary input is-normal'></input>
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
                      <div id='first'className="column pt-4">
                        <p className="subtitle has-background-black-bis pt-6 pb-3 mb-3 has-text-primary">
                          MY RECEIVER'S AGREEMENTS<br></br><br></br>
                          <p className=" has-background-black-bis py-4 is-size-6">
                            <br></br>
                          </p>
                          <p>
                            Number of agreements as the receiver: {myReceiverIds}
                          </p>
                          <p>
                            {errorReceiverIds}
                          </p>
                          <p className="box has-background-black-bis pt-4 pb-3 mt-6">
                            <div className='columns is-centered'>
                              <Link href="">
                                <button className="button is-outlined py-2 px-6 is-size-6">Withdraw </button>
                              </Link>
                            </div>
                          </p>
                        </p>
                        <p className="subtitle has-background-black-bis pt-6 pb-3 mb-3 mt-6 has-text-primary">
                          WITHDRAW RECEIVER<br></br><br></br>
                          <p className=" has-background-black-bis py-4 is-size-6">
                            <br></br>
                          </p>
                          <input type="number" placeholder="Enter agreement's id" className='has-background-primary input is-normal'></input>
                          <p className=" has-background-black-bis py-4 is-size-6">
                            <br></br>
                          </p>
                          <p className="box has-background-black-bis pt-4 pb-3 mt-6">
                            <div className='columns is-centered'>
                              <Link href="">
                                <button className="button is-outlined py-2 px-6 is-size-6">Withdraw </button>
                              </Link>
                            </div>
                          </p>
                        </p>
                        <p className="subtitle has-background-black-bis pt-6 pb-3 mb-3 mt-6 has-text-primary">
                          SHOW RECEIVER'S WITHDRAWAL AMOUNT<br></br><br></br>
                          <p className=" has-background-black-bis py-4 is-size-6">
                            <br></br>
                          </p>
                          <p className="box has-background-black-bis pt-4 pb-3 mt-6">
                            <div className='columns is-centered'>
                              <Link href="">
                                <button className="button is-outlined py-2 px-6 is-size-6">Show </button>
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
                          <p className="box has-background-black-bis pt-4 pb-3 mt-6">
                            <div className='columns is-centered'>
                              <Link href="">
                                <button className="button is-outlined py-2 px-6 is-size-6">Withdraw </button>
                              </Link>
                            </div>
                          </p>
                        </p>
                        <p className="subtitle has-background-black-bis pt-6 pb-3 mb-3 mt-6 has-text-primary">
                          WITHDRAW SENDER<br></br><br></br>
                          <p className="has-background-black-bis py-4 is-size-6">
                            <br></br>
                          </p>
                          <input type="number" placeholder="Enter the agreement's id" className='has-background-primary input is-normal'></input>
                          <p className=" has-background-black-bis py-4 is-size-6">
                            <br></br><br></br><br></br>
                          </p>
                          <p className="box has-background-black-bis pt-3 pb-3 mt-3">
                            <div className='columns is-centered'>
                              <Link href="">
                                <button className="button is-outlined py-2 px-6 is-size-6">Withdraw </button>
                              </Link>
                            </div>
                          </p>
                        </p>
                        <p className="subtitle has-background-black-bis pt-6 pb-3 mb-3 mt-6 has-text-primary">
                          SHOW SENDER'S WITHDRAWAL AMOUNT<br></br><br></br>
                          <p className=" has-background-black-bis py-4 is-size-6">
                            <br></br>
                          </p>
                          <p className="box has-background-black-bis pt-4 pb-3 mt-6">
                            <div className='columns is-centered'>
                              <Link href="">
                                <button className="button is-outlined py-2 px-6 is-size-6">Show </button>
                              </Link>
                            </div>
                          </p>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>                         
            </section>
        </div>
        
    )
}

export default App